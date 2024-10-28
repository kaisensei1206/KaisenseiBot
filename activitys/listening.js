module.exports = {
  name: "1",
  description: "set listening stauts",
  async execute(client) {
    const activitys = [

      "好聽的歌",
      "在這裡打電動",
    ];
    const activitysID = Math.floor(Math.random() * activitys.length);
    const activitysContent = activitys[activitysID] + " | *h";
    try {
      client.user.setActivity(activitysContent, { type: "LISTENING" });
      console.log(activitysID, activitysContent);
    } catch (error) {
      console.log(error);
    }
  },
};
