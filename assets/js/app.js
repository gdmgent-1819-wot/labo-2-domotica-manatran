const pixels = document.querySelectorAll('.pixel');

for (let i = 0; i < pixels.length; i++) {
  const pixel = pixels[i];
  pixel.title = i;
  if (i === 2 || i === 5 || i === 34 || i === 37) {
    pixel.classList.add('lamp')
  }
  if (i === 24 || i === 31 || i === 59 || i === 60) {
    pixel.classList.add("plug")
  }
  if (i === 40 || i === 48 || i === 56) {
    pixel.classList.add("door")
    pixel.classList.add("door")
    pixel.classList.add("door")
  }
  if (i === 47 || i === 55 || i === 63) {
    pixel.classList.add('closed')
    pixel.classList.add('closed')
    pixel.classList.add('closed')
  }
}