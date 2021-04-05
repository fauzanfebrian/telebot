const instagramGetUrl = require("instagram-url-direct");
const igGetUrl = require("../../middleware/getUrlInstagram");
const https = require("https"); // or 'https' for https:// URLs
const fs = require("fs");

module.exports.Download = async (url, userId) => {
  let result = await instagramGetUrl(url)
      .then((value) => {
        return value.url_list;
      })
      .catch(async (error) => {
        return { err: true };
      }),
    filePath = [];
  if (result.err) {
    const urls = await igGetUrl(url)
      .then((result) => result)
      .catch(() => {
        err: true;
      });
    if (urls.err || urls.code == "error") return { err: true };
    else {
      let i = 0;
      result = [];
      urls = urls.images_url[0];
      for (let key in urls) {
        result[i] = urls[key];
        i++;
      }
    }
  }
  result.forEach((url, index) => {
    const jpgPattern = new RegExp(/.jpg/gi);
    const isJpg = jpgPattern.test(url);
    const path = isJpg
      ? `./results/insta/${userId}${index}.jpg`
      : `./results/insta/${userId}${index}.mp4`;
    https.get(url, (response) => {
      response.pipe(fs.createWriteStream(path));
    });
    filePath.push({ path, type: isJpg ? "Image" : "Vidio" });
  });
  return filePath;
};
