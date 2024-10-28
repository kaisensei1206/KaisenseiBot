const ytdl = require("ytdl-core");
const Discord = require("discord.js");
module.exports = {
  name: "skip",
  description: "skip the song!",
  async execute(message) {
    try {
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!message.member.voice.channel) {
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請先進入一個語音頻道`)
          .setTitle("你必須在語音頻道中才能停止播放歌曲!")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        console.log(
          message.author.username + " skip need get in voice channel"
        );
        return message.channel.send(errorEmbed);
      }
      if (!serverQueue) {
        const errorEmbed = new Discord.MessageEmbed()
          .setColor("#FFF148")
          .setDescription(`請先打「*p (url)」加歌曲到播放清單`)
          .setTitle("沒有歌曲可以跳過!")
          .setFooter(
            "SawaBot"
            //"https://i.imgur.com/wSTFkRM.png"
          );
        console.log(message.author.username + " skip no songs");
        return message.channel.send(errorEmbed);
      } else {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      }
      //serverQueue.connection.dispatcher.end();
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },
  play(message, song) {
    const queue = message.client.queue;
    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);
    console.log(guild, guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#FFF148")
        .setDescription(`使用「*p (url)」再次呼叫我來播放歌曲`)
        .setTitle("全部歌曲已播放完畢!")
        .setFooter(
          "SawaBot"
          //"https://i.imgur.com/wSTFkRM.png"
        );
      serverQueue.textChannel.send(errorEmbed);
      message.react("👌");
      console.log(message.author.username + " skip song");
      queue.delete(guild.id);
      //serverQueue.connection.dispatcher.end();
      console.log("all songs in queue end");
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", (error) => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    message.react("👌");
    console.log(message.author.username + " skip song");
    const playSongEmbed = new Discord.MessageEmbed()
      .setColor("#FFF148")
      .setDescription(`**[${song.title}](${song.url})**`)
      .setTitle("現在播放的歌曲")
      //.setURL("https://discord.js.org/")
      // .setAuthor(
      //   "SawaBot"
      //   //"https://i.imgur.com/wSTFkRM.png",
      //   //"https://discord.js.org"
      // )
      .setFooter(
        "SawaBot"
        //"https://i.imgur.com/wSTFkRM.png"
      );
    serverQueue.textChannel.send(playSongEmbed);
    console.log("playing: " + song.title);
  },
};
