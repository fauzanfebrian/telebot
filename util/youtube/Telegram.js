const { Telegraf } = require("telegraf");
const fs = require("fs");
const botToken = "1587261428:AAHlkVYtak92D4VpdRlyn8IqtgJ-BiGpD3s";
const bot = new Telegraf(botToken);
const { Download, isValidUrl } = require("./Downloader");

bot.start((ctx) =>
  ctx.reply(
    `Welcome ${
      ctx.update.message.from.first_name
        ? ctx.update.message.from.first_name
        : ctx.update.message.from.username
    }\n\nType /help to know how to use this bot`
  )
);
bot.help((ctx) =>
  ctx.reply(`Want to ask other feature bot or report bug? to @fauzanFebriansyah\n\ntype /download to download youtube video or just audio
`)
);
let url, type;
bot.command("download", (ctx) => {
  return (
    bot.hears(/(youtu)/gi, (urlSession) => {
      url = urlSession.update.message.text;
      const isValid = isValidUrl(url);
      if (isValid) {
        return (
          bot.hears(["mp3", "mp4"], (fileUpload) => {
            fileUpload.reply("Wait a few seconds...");
            type = fileUpload.update.message.text;
            const { filePath, info } = Download(url, type);
            setTimeout(() => {
              if (fs.existsSync(filePath) && info == "success") {
                setTimeout(() => {
                  if (type === "mp3") {
                    return (
                      fileUpload.replyWithAudio({
                        source: filePath,
                      }),
                      setTimeout(() => {
                        fs.unlinkSync(filePath);
                      }, 60000)
                    );
                  } else {
                    return (
                      fileUpload.replyWithVideo({
                        source: fs.createReadStream(filePath),
                      }),
                      setTimeout(() => {
                        fs.unlinkSync(filePath);
                      }, 60000)
                    );
                  }
                }, 35000);
              } else {
                return fileUpload.reply(
                  `Sorry there's problem when uploading file and ${info}`
                );
              }
            }, 20000);
          }),
          urlSession.reply("Please write the type 'mp3 / mp4'")
        );
      } else {
        return urlSession.reply(`The url is wrong\n\nPaste Again!`);
      }
    }),
    ctx.reply("Paste youtube's url here")
  );
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = { ytBot: bot };
