const { Telegraf } = require("telegraf");
const { Downloader } = require("./Downloader");
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
    igBot.hears(/(instagram)/gi, async (downloadctx) => {
      downloadctx.reply("wait a few seconds...");
      let url = downloadctx.update.message.text;
      const igContent = await Downloader(url);

      if (fs.existsSync(igContent.file)) {
        if (igContent.type == "Image") {
          return (
            downloadctx.replyWithPhoto({ source: igContent.file }),
            setTimeout(() => {
              fs.unlinkSync(igContent.file);
            }, 15000)
          );
        } else if (igContent.type == "Video") {
          return (
            downloadctx.replyWithVideo({ source: igContent.file }),
            setTimeout(() => {
              fs.unlinkSync(igContent.file);
            }, 15000)
          );
        }
      } else {
        return downloadctx.reply(
          "sorry there's some problem when uploading file"
        );
      }
    }),
    ctx.reply("Paste instagram content's url here")
  );
});

// Enable graceful stop
process.once("SIGINT", () => igBot.stop("SIGINT"));
process.once("SIGTERM", () => igBot.stop("SIGTERM"));
module.exports = { igBot };
