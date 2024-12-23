const Discord = require("discord.js");
module.exports = {
  name: "ping",
  description: "check the ping!",
  async execute(message) {
    try {
      function getDateTime() {
        var currentdate = new Date();
        var datetime =
          currentdate.getFullYear() +
          "/" +
          (currentdate.getMonth() + 1 < 10 ? "0" : "") +
          (currentdate.getMonth() + 1) +
          "/" +
          (currentdate.getDate() < 10 ? "0" : "") +
          currentdate.getDate() +
          " " +
          (currentdate.getHours() < 10 ? "0" : "") +
          currentdate.getHours() +
          ":" +
          (currentdate.getMinutes() < 10 ? "0" : "") +
          currentdate.getMinutes() +
          ":" +
          (currentdate.getSeconds() < 10 ? "0" : "") +
          currentdate.getSeconds();
        return datetime;
      }
      const pingEmbed = new Discord.MessageEmbed()
        .setColor("#FFF148")
        .setDescription(
          `** 延遲：${
            message.client.ws.ping
          }ms\n 伺服器時間：${getDateTime()}**`
        )
        .setTitle("伺服器延遲：")
        .setFooter(
          "KaisenseiBotBot"
          //"https://i.imgur.com/wSTFkRM.png"
        );
      console.log(message.author.username + " check ping");
      message.channel.send(pingEmbed);
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
