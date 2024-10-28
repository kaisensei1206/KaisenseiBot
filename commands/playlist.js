const Discord = require("discord.js");
module.exports = {
  name: "list",
  description: "stop the song!",
  async execute(message) {
    try {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!message.member.voice.channel) {
        console.log(
          message.author.username + " need at voice to check playlist"
        );
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請先進入一個語音頻道`)
          .setTitle("你只能在語音頻道執行這個指令!")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        return message.channel.send(errorEmbed);
      }
      if (!serverQueue || !serverQueue.songs) {
        console.log(message.author.username + " playlist no sound");
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請先使用「*p (url)」將歌曲添加到播放清單`)
          .setTitle("播放清單中沒有歌曲!")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        channel.send(errorEmbed);
      } else {
        console.log(serverQueue.songs);
        let listString = "";
        serverQueue.songs.forEach((songs, index) => {
          if (index == 0) {
            listString +=
              "正在播放： **[" +
              songs.title +
              "]" +
              "(" +
              songs.url +
              ")" +
              "** \n";
          } else
            listString +=
              index +
              "：**[" +
              songs.title +
              "]" +
              "(" +
              songs.url +
              ")" +
              "** \n";
        });
        listString += "** 可以輸入「*del (數字)」，刪除指定的歌曲  **";
        const songListEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(listString)
          .setTitle("播放清單")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        serverQueue.textChannel.send(songListEmbed);
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
