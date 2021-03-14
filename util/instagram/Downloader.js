const instagram_download = require("@juliendu11/instagram-downloader");
(async () => {})();
module.exports.Downloader = async (url) => {
  const value = await instagram_download.downloadMedia(url, "./results/insta");
  return value;
};
