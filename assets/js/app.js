const pixels = document.querySelectorAll('.pixel');
const pixelArray = [];

const BLACK = [0, 0, 0];
const YELLOW = [255, 255, 0];
const DARKYELLOW = [128, 128, 0];
const BLUE = [0, 0, 255];
const DARKBLUE = [0, 0, 128];
const GREEN = [0, 255, 0];
const RED = [255, 0, 0];

let user = JSON.parse(localStorage.getItem('user'));
var collection = firebase.database().ref('domotica');
collection.on('value', function (snapshot) {
  let myHouse = snapshot.val()
  for (key in myHouse) {
    myHouse = myHouse[key].house;
  }
  if (myHouse) {
    for (let i = 0; i < myHouse.length; i++) {
      const currentPixel = pixels[i];
      const color = JSON.stringify(myHouse[i]);
      // seed pixels on screen
      switch (color) {
        case '[255,0,0]':
          currentPixel.classList.add('closed');
          break;
        case '[255,255,0]':
          currentPixel.classList.add('lit');
          break;
        case '[0,255,0]':
          currentPixel.classList.add('door');
          break;
        case '[0,0,255]':
          currentPixel.classList.add('plug');
          break;
        default:
          break;
      }


    }
  } else {
    // Set template
    for (let i = 0; i < pixels.length; i++) {
      const pixel = pixels[i];
      pixel.title = i;

      if (i === 2 || i === 5 || i === 34 || i === 37) {
        // Lamps
        pixel.classList.add('lamp');
        pixelArray.push(YELLOW);
      } else if (i === 24 || i === 31 || i === 59 || i === 60) {
        // Plugs
        pixel.classList.add("plug");
        pixelArray.push(BLUE);
      } else if (i === 40 || i === 48 || i === 56) {
        // Open doors
        pixel.classList.add("door");
        pixel.classList.add("door");
        pixel.classList.add("door");
        pixelArray.push(GREEN);
      } else if (i === 47 || i === 55 || i === 63) {
        // Closed doors
        pixel.classList.add('closed');
        pixel.classList.add('closed');
        pixel.classList.add('closed');
        pixelArray.push(RED);
      } else {
        pixelArray.push(BLACK);
      }
    }
    // push template to db
    firebase.database().ref('domotica').push({
      house: pixelArray
    });
  }
});