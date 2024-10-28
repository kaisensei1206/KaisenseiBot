module.exports = {
  name: "2",
  description: "set playing stauts",
  async execute(client) {
    const activitys = [

      "壞了",
      "女孩",
      "男孩",
      "人生遊戲",
      "結束了",
    ];
    const activitysID = Math.floor(Math.random() * activitys.length);
    const activitysContent = activitys[activitysID] + " | *h";
    try {
      client.user.setActivity(activitysContent);
      console.log(activitysID, activitysContent);
    } catch (error) {
      console.log(error);
    }
  },
};
