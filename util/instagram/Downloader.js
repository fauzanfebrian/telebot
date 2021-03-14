const instagram_download = require("@juliendu11/instagram-downloader");
const axios = require("axios");
(async () => {})();
module.exports.Downloader = async (url) => {
  let indexDestroy = [];
  url = ("" + url).split("/");
  url.forEach((str, index) => {
    let condition = false;
    const splitStr = [...str];
    splitStr.forEach((splitStr) => {
      if (splitStr === "?") condition = true;
    });
    if (condition) indexDestroy.push(index);
  });
  indexDestroy.forEach((index) => {
    url.splice(index);
  });
  url = url.join("/");
  const value = await instagram_download.downloadMedia(url, "./results/insta");
  return value;
};
