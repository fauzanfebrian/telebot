const instagram_download = require("@juliendu11/instagram-downloader");
const axios = require("axios");
(async () => {})();
module.exports.Downloader = async (url) => {
  const value = await instagram_download.downloadMetaData(url);
  axios.get('url)
  .then((response) => {
    console.log("GET Response")
    console.log(response.data.graphql);
  })
  .catch(function (error) {
    console.log("Error in fetching market updates");
  });  
  return value;
};
