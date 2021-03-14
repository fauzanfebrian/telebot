const instagram_download = require("@juliendu11/instagram-downloader");
const axios = require("axios");
(async () => {})();
module.exports.Downloader = async (url) => {
  const value = await instagram_download.downloadMedia(url);
 
  return value;
};
