document.getElementById('applyColorBtn').addEventListener('click', function () {
  const color = document.getElementById('colorInput').value.trim();
  const colorBox = document.getElementById('colorBox');
  const hexPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

  const testColor = document.createElement('div');
  testColor.style.color = color;

  if (hexPattern.test(color) || testColor.style.color !== '') {
    colorBox.style.backgroundColor = color;
    
  } else {
    alert('Invalid color. Please enter a valid color name or hex code.');
  }
});
