const fs = require("fs");
const ytdl = require("ytdl-core");
const Download = (url, type) => {
  const isValidUrl = ytdl.validateURL(url),
    isValidType = ["mp3", "mp4"].some((item) => item === type);

  if (isValidUrl && isValidType) {
    const ytId = ytdl.getURLVideoID(url);
    this.filePath = `results/${type}/${ytId}.${type}`;
    ytdl(url).pipe(fs.createWriteStream(this.filePath));
    return { filePath: this.filePath, info: "success" };
  } else {
    return {
      info: `${isValidUrl ? "" : "Url invalid"}${
        isValidType ? "" : ", Type invalid"
      }`,
    };
  }
};
const isValidUrl = (url) => ytdl.validateURL(url);
module.exports = { Download, isValidUrl };
