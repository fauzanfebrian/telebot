const { ytBot } = require("./util/youtube/Telegram");
const { igBot } = require("./util/instagram/Telegram");
ytBot.launch();
igBot.launch();
