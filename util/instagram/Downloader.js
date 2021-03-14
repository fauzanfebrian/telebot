const instagram_download = require("@juliendu11/instagram-downloader");
(async () => {})();
module.exports.Downloader = async (url) => {
  const value = await instagram_download.downloadMetaData(url, "./results/insta");
  return value;
};
