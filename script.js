// script.js
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('colorWheel');
  const ctx = canvas.getContext('2d');
  let selectedColor = '#ffffff';

  // Draw color wheel
  function drawColorWheel() {
    const radius = canvas.width / 2;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const dx = x - radius;
        const dy = y - radius;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= radius) {
          const angle = (Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2);
          const [r, g, b] = hslToRgb(angle, distance / radius, 0.5);
          
          const index = (y * canvas.width + x) * 4;
          imageData.data[index] = r;
          imageData.data[index + 1] = g;
          imageData.data[index + 2] = b;
          imageData.data[index + 3] = 255;
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  // Color conversion functions
  function hslToRgb(h, s, l) {
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    ];
  }

  function rgbToHex(r, g, b) {
    return `#${[r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('')}`;
  }

  // Event handlers
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    
    if (pixel[3] === 255) {
      selectedColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
      document.getElementById('colorInput').value = selectedColor;
      document.getElementById('hexValue').textContent = selectedColor;
      document.getElementById('colorBox').style.backgroundColor = selectedColor;
    }
  });

  document.getElementById('applyColorBtn').addEventListener('click', () => {
    const colorInput = document.getElementById('colorInput').value.trim();
    const colorBox = document.getElementById('colorBox');
    
    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(colorInput) || CSS.supports('color', colorInput)) {
      colorBox.style.backgroundColor = colorInput;
      document.getElementById('hexValue').textContent = colorInput;
    } else {
      alert('Invalid color value!');
    }
  });

  // Initial setup
  drawColorWheel();
  document.getElementById('hexValue').textContent = '#FFFFFF';
});