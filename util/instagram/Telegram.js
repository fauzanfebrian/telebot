const { Telegraf } = require("telegraf");
const { Download } = require("./Downloader");
const fs = require("fs");
const igBot = new Telegraf("1626474474:AAEU4AG7PbOBXMT2jSoiQbBpXC4QerIv1S4");
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
      const values = await Download(url, userId);
      if (values.err)
        return downloadctx.reply(
          `there was a problem with the url entered\n\nmake sure the account is not private`
        );
      setTimeout(() => {
        if (values.length == 0) {
          return downloadctx.reply(`there was a problem downloading file`);
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
