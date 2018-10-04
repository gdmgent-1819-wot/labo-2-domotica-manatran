from sense_hat import SenseHat
from time import time, sleep
import sys
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# get API key from json
serviceAccountKey = "./../../keys/domoticakey.json"
databaseURL = "https://domotica-python.firebaseio.com/"

try:
    # fetch the service account key JSON file contents
    firebase_cred = credentials.Certificate(serviceAccountKey)
    firebase_admin.initialize_app(firebase_cred, {
        "databaseURL": databaseURL
    })

    firebase_ref_domotica = db.reference("domotica")
except:
    print('Unable to initialize Firebase: {}'.format(sys.exc_info()[0]))
    sys.exit(1)


def fetch_house():
    print("Fetching from Firebase")
    house = firebase_ref_domotica.get()
    pixel_array = []

    if house is not None:
        print("Found some stuff!")
        for key,val in house.items():
            pixel = val
            pixel_array.append(pixel)

        # looping through characters
        i = 0
        print("Showing on Sense Hat")
        while i < len(pixel_array):
            pixel = pixel_array[i]
            sense_hat.set_pixels(pixel)
            sleep(3)
            i += 1

    else:
        print("Found nothing...")
        return false



try:
    # SenseHat
    sense_hat = SenseHat()
    sense_hat.set_imu_config(False, False, False)
except:
    print('Unable to initialize the Sense Hat library: {}'.format(sys.exc_info()[0]))
    sys.exit(1)

def main():
    while True:
        fetch_house()


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        print('Interrupt received! Stopping the application...')
    finally:
        print('Stopping program')
        sense_hat.clear()
        sys.exit(0)