A simple react-native interface for a ble pizza baker described in [this bleno example](https://github.com/noble/bleno/tree/master/examples/pizza "this bleno example") mainly to test out the react-native-ble-plx library as well as the bleno peripheral mocking library.

# Running the app
You'll need to have node.js installed on your system.
## For the peripheral
Follow the installation instructions described in the [bleno](https://github.com/noble/bleno "bleno") repository.
Then run `$ node peripheral.js` inside the peripheral folder. (Note on my system I had to donwgrade to version 8.9.0 of node.js).
## For the app
Since a bluetooth connection is required you will have to run the app on a physical device as described in the [react native docs](https://reactnative.dev/docs/running-on-device "react native docs")

# Notes
The app may be buggy as it was built for testing purposes. Some (most?) error handling was ignored and there were no tests. Nevertheless if you see an obvious mistake/error feel free to report it.
Also the UI is not the shiniest in the world but it works.