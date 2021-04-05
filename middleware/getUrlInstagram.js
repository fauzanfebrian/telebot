const axios = require("axios");
const getUrl = async (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://telefz-bot.herokuapp.com/instagram-downloader-api-master/?url=${url}`
      )
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
