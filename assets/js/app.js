const pixels = document.querySelectorAll('.pixel');
const pixelArray = [];

const BLACK = [0, 0, 0];
const YELLOW = [255, 255, 0];
const DARKYELLOW = [50, 50, 0];
const BLUE = [0, 0, 255];
const DARKBLUE = [0, 0, 50];
const GREEN = [0, 255, 0];
const RED = [255, 0, 0];

//Fetch from firebase
var collection = firebase.database().ref('domotica');
collection.on('value', function (snapshot) {
  let myHouse = snapshot.val()
  for (key in myHouse) {
    myHouse = myHouse[key].house;
  }
  //If house in db - fetch - else - create
  if (myHouse) {
    // seed pixels on screen
    for (let i = 0; i < myHouse.length; i++) {
      const currentPixel = pixels[i];
      const color = JSON.stringify(myHouse[i]);

      switch (color) {
        case JSON.stringify(GREEN):
          currentPixel.classList.add('door');
          break;
        case JSON.stringify(RED):
          currentPixel.classList.add('closed');
          break;
        case JSON.stringify(YELLOW):
          currentPixel.classList.add('lit');
          break;
        case JSON.stringify(DARKYELLOW):
          currentPixel.classList.add('yeet');
          break;
        case JSON.stringify(BLUE):
          currentPixel.classList.add('plug');
          break;
        case JSON.stringify(DARKBLUE):
          currentPixel.classList.add('unplugged');
          break;
        default:
          break;
      }

    }
  } else {
    // Set template for firebase
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