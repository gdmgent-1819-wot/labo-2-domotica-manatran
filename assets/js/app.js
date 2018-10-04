const pixels = document.querySelectorAll('.pixel');
const pixelArray = [];

// constants
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
  myHouse = myHouse.house;
  //If house in db - fetch - else - create
  if (myHouse) {
    // seed pixels on screen
    for (let i = 0; i < myHouse.length; i++) {
      const currentPixel = pixels[i];
      currentPixel.title=i;
      const color = JSON.stringify(myHouse[i]);

      switch (color) {
        case JSON.stringify(GREEN):
          currentPixel.classList.add('open');
          currentPixel.addEventListener('click', e => {
            if (currentPixel.classList.contains('closed')) {
              if(i === 40 || i === 48 || i === 56) {
                myHouse[40] = GREEN;myHouse[48] = GREEN;myHouse[56] = GREEN;
                pixels[40].classList.remove('closed');pixels[40].classList.add('open');
                pixels[48].classList.remove('closed');pixels[48].classList.add('open');
                pixels[56].classList.remove('closed');pixels[56].classList.add('open');
                firebase.database().ref('domotica').update({
                  house: myHouse
                });
              } else {
                myHouse[47] = GREEN;myHouse[55] = GREEN;myHouse[63] = GREEN;
                pixels[47].classList.remove('closed');pixels[47].classList.add('open');
                pixels[55].classList.remove('closed');pixels[55].classList.add('open');
                pixels[63].classList.remove('closed');pixels[63].classList.add('open');
                firebase.database().ref('domotica').update({
                  house: myHouse
                });
              }
            } else {
              if(i === 40 || i === 48 || i === 56){
                myHouse[40] = RED;myHouse[48] = RED;myHouse[56] = RED;
                pixels[40].classList.remove('open');pixels[40].classList.add('closed');
                pixels[48].classList.remove('open');pixels[48].classList.add('closed');
                pixels[56].classList.remove('open');pixels[56].classList.add('closed');
                firebase.database().ref('domotica').update({
                  house: myHouse
                });
              } else {
                myHouse[47] = RED;myHouse[55] = RED;myHouse[63] = RED;
                pixels[47].classList.remove('open');pixels[47].classList.add('closed');
                pixels[55].classList.remove('open');pixels[55].classList.add('closed');
                pixels[63].classList.remove('open');pixels[63].classList.add('closed');
                firebase.database().ref('domotica').update({
                  house: myHouse
                });
              }
            }
          })
          break;
        case JSON.stringify(RED):
          currentPixel.classList.add('closed');
          currentPixel.addEventListener('click', e => {
            if (currentPixel.classList.contains('open')) {
              if(i === 40 || i === 48 || i === 56) {
                myHouse[40] = RED;myHouse[48] = RED;myHouse[56] = RED;
                pixels[40].classList.remove('open');pixels[40].classList.add('closed');
                pixels[48].classList.remove('open');pixels[48].classList.add('closed');
                pixels[56].classList.remove('open');pixels[56].classList.add('closed');
                firebase.database().ref('domotica').update({
                  house: myHouse
                });
              } else {
                myHouse[47] = RED;myHouse[55] = RED;myHouse[63] = RED;
                pixels[47].classList.remove('open');pixels[47].classList.add('closed');
                pixels[55].classList.remove('open');pixels[55].classList.add('closed');
                pixels[63].classList.remove('open');pixels[63].classList.add('closed');
                firebase.database().ref('domotica').update({
                  house: myHouse
                });
              }
            } else {
              if(i === 40 || i === 48 || i === 56){
                myHouse[40] = GREEN;myHouse[48] = GREEN;myHouse[56] = GREEN;
                pixels[40].classList.remove('closed');pixels[40].classList.add('open');
                pixels[48].classList.remove('closed');pixels[48].classList.add('open');
                pixels[56].classList.remove('closed');pixels[56].classList.add('open');
                firebase.database().ref('domotica').update({
                  house: myHouse
                });
              } else {
                myHouse[47] = GREEN;myHouse[55] = GREEN;myHouse[63] = GREEN;
                pixels[47].classList.remove('closed');pixels[47].classList.add('open');
                pixels[55].classList.remove('closed');pixels[55].classList.add('open');
                pixels[63].classList.remove('closed');pixels[63].classList.add('open');
                firebase.database().ref('domotica').update({
                  house: myHouse
                });
              }
            }
          })
          break;
        case JSON.stringify(YELLOW):
          currentPixel.classList.add('lit');
          currentPixel.addEventListener('click', e => {
            if (currentPixel.classList.contains('yeet')) {
              myHouse[i] = YELLOW;
              currentPixel.classList.add('lit');
              currentPixel.classList.remove('yeet');
              firebase.database().ref('domotica').update({
                house: myHouse
              });
            } else {
              myHouse[i] = DARKYELLOW;
              currentPixel.classList.add('yeet');
              currentPixel.classList.remove('lit');
              firebase.database().ref('domotica').update({
                house: myHouse
              });
            }
          })
          break;
        case JSON.stringify(DARKYELLOW):
          currentPixel.classList.add('yeet');
          currentPixel.addEventListener('click', e => {
            if (currentPixel.classList.contains('lit')) {
              myHouse[i] = DARKYELLOW;
              currentPixel.classList.add('yeet');
              currentPixel.classList.remove('lit');
              firebase.database().ref('domotica').update({
                house: myHouse
              });
            } else {
              myHouse[i] = YELLOW;
              currentPixel.classList.add('lit');
              currentPixel.classList.remove('yeet');
              firebase.database().ref('domotica').update({
                house: myHouse
              });
            }
          })
          break;
        case JSON.stringify(BLUE):
          currentPixel.classList.add('plugged');
          currentPixel.addEventListener('click', e => {
            if (currentPixel.classList.contains('unplugged')) {
              myHouse[i] = BLUE;
              currentPixel.classList.add('plugged');
              currentPixel.classList.remove('unplugged');
              firebase.database().ref('domotica').update({
                house: myHouse
              });
            } else {
              myHouse[i] = DARKBLUE;
              currentPixel.classList.add('unplugged');
              currentPixel.classList.remove('plugged');
              firebase.database().ref('domotica').update({
                house: myHouse
              });
            }
          })
          break;
        case JSON.stringify(DARKBLUE):
          currentPixel.classList.add('unplugged');
          currentPixel.addEventListener('click', e => {
            if (currentPixel.classList.contains('plugged')) {
              myHouse[i] = DARKBLUE;
              currentPixel.classList.add('unplugged');
              currentPixel.classList.remove('plugged');
              firebase.database().ref('domotica').update({
                house: myHouse
              });
            } else {
              myHouse[i] = BLUE;
              currentPixel.classList.add('plugged');
              currentPixel.classList.remove('unplugged');
              firebase.database().ref('domotica').update({
                house: myHouse
              });
            }
          })
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
        // Open opens
        pixel.classList.add("open");
        pixel.classList.add("open");
        pixel.classList.add("open");
        pixelArray.push(GREEN);
      } else if (i === 47 || i === 55 || i === 63) {
        // Closed opens
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