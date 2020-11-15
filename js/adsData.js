// adsData.js
'use strict';

(() => {
  let ads = [];

  const set = (newAds) => {
    ads = newAds;
  };

  const get = () => {
    return ads;
  };


  window.adsData = {
    get,
    set
  };

})();
