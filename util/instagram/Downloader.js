const instagramGetUrl = require("instagram-url-direct");
const https = require("https"); // or 'https' for https:// URLs
const fs = require("fs");

module.exports.Download = async (url, userId) => {
  let result = await instagramGetUrl(url),
    filePath = await [];
  console.log(result);
  if (result.err) return { err: true };
  result.url_list.forEach((url, index) => {
    const jpgPattern = new RegExp(/.jpg/gi);
    const isJpg = jpgPattern.test(url);
    let path;
    if (isJpg) {
      path = `./results/insta/${userId}${index}.jpg`;
      https.get(url, (response) => {
        response.pipe(fs.createWriteStream(path));
      });
    } else if (isJpg === false) {
      path = `./results/insta/${userId}${index}.mp4`;
      https.get(url, (response) => {
        response.pipe(fs.createWriteStream(path));
      });
    }
    filePath.push({ path, type: isJpg ? "Image" : "Vidio" });
  });
  return filePath;
};
