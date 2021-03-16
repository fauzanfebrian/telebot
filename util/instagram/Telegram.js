const { Telegraf } = require("telegraf");
const { Download } = require("./Downloader");
const fs = require("fs");
const axios = require("axios");
const igBot = new Telegraf("1626474474:AAEU4AG7PbOBXMT2jSoiQbBpXC4QerIv1S4");
const isPrivate = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        resolve(
          result.request._redirectable._isRedirect == undefined ? false : true
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};
igBot.start((ctx) => {
  ctx.reply(
    `Welcome ${
      ctx.update.message.from.first_name
        ? ctx.update.message.from.first_name
        : ctx.update.message.from.username
        ? ctx.update.message.from.username
        : "Dear"
    }\n\nType /help to know how to use this bot`
  );
});
igBot.help((ctx) =>
  ctx.reply(
    `Want to ask other feature bot or report bug? to @fauzanFebriansyah\n\ntype /download to download instagram content and make sure the account is not private`
  )
);
igBot.command("download", (ctx) => {
  return (
    igBot.hears(/(https:\/\/www.instagram.com)/gi, async (downloadctx) => {
      downloadctx.reply("wait a few seconds...");
      let url = downloadctx.update.message.text;
      let userId = downloadctx.update.message.from.id;
      const private = await isPrivate(url);
      if (private)
        return downloadctx.reply(
          "there's some problem\nmake sure the account is not private"
        );
      const values = await Download(url, userId);
      setTimeout(() => {
        if (values.length == 0 || values.err) {
          return downloadctx.reply(`there's problem while downloading file`);
        }
        values.forEach((value) => {
          if (value.type === "Image")
            downloadctx.replyWithPhoto({ source: value.path });
          else downloadctx.replyWithVideo({ source: value.path });
          setTimeout(() => {
            fs.unlinkSync(value.path);
          }, 10000);
        });
      }, 30000);
    }),
    ctx.reply("Paste instagram's content url here")
  );
});

// Enable graceful stop
process.once("SIGINT", () => igBot.stop("SIGINT"));
process.once("SIGTERM", () => igBot.stop("SIGTERM"));
module.exports = { igBot };
