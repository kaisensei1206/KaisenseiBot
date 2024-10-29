const Discord = require("discord.js");
module.exports = {
  name: "del",
  description: "delete the number song!",
  async execute(message) {
    try {
      const serverQueue = message.client.queue.get(message.guild.id);
      const args = message.content.split(" ");
      const numberExpression = /^\d+$/;
      if (!message.member.voice.channel) {
        console.log(
          message.author.username + " need at voice to check playlist"
        );
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請先進入一個語音頻道!`)
          .setTitle("你只能在語音頻道執行這個指令!")
          .setFooter(
            "KaisenseiBot"
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
            "KaisenseiBot"
            
          );
        message.channel.send(errorEmbed);
      } else if (!numberExpression.test(args[1])) {
        console.log(message.author.username + " delete song but not number");
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`打「*list」查下播放清單入面有乜歌`)
          .setTitle("輸入錯誤! 幫不了你，你需要輸入數字!")
          .setFooter(
            "KaisenseiBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        return message.reply(errorEmbed);
      } else {
        console.log(serverQueue.songs.length);
        if (serverQueue.songs.length > parseInt(args[1])) {
          serverQueue.songs = serverQueue.songs
            .slice(0, parseInt(args[1]))
            .concat(
              serverQueue.songs.slice(
                parseInt(args[1]),
                serverQueue.songs.length
              )
            );
          const errorEmbed = new Discord.MessageEmbed()
            .setColor("#FFF148")
            .setDescription(`恭喜你先!`)
            .setTitle("已經幫你刪除第" + args[1] + "首歌")
            .setFooter(
              "KaisenseiBot"
              //"https://i.imgur.com/wSTFkRM.png"
            );
          serverQueue.textChannel.send(errorEmbed);
        } else {
          const errorEmbed = new Discord.MessageEmbed()
            .setColor("#FFF148")
            .setDescription(
              `輸入「*del (數字)」刪除指定歌曲，輸入「*list」查看播放清單中的歌曲`
            )
            .setTitle("幫不了你，找不到你要刪除的歌曲! 不要再打錯了!")
            .setFooter(
              "KaisenseiBot"
              //"https://i.imgur.com/wSTFkRM.png"
            );
          return message.reply(errorEmbed);
        }
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
};
