const axios = require("axios");
const getUrl = async (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://instagram-downloader-api.epizy.com/?url=${url}`)
      .then(function (response) {
        // handle success
        resolve(response.data);
      })
      .catch(function (error) {
        // handle error
        reject(error);
      });
  });
  return result;
};
module.exports = getUrl;
