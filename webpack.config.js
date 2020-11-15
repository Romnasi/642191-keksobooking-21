const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/remove.js",
    "./js/pin.js",
    "./js/popup.js",
    "./js/sync.js",
    "./js/data.js",
    "./js/map.js",
    "./js/move.js",
    "./js/card.js",
    "./js/disable.js",
    "./js/debounce.js",
    "./js/adsData.js",
    "./js/filter.js",
    "./js/activate.js",
    "./js/reset.js",
    "./js/form.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
