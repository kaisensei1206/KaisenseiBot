module.exports = {
  name: "0",
  description: "set watching stauts",
  async execute(client) {
    const activitys = [
      "女孩",


    ];
    const activitysID = Math.floor(Math.random() * activitys.length);
    const activitysContent = activitys[activitysID];
    try {
      client.user.setActivity(activitysContent + " | *h", {
        type: "WATCHING",
      });
      console.log(activitysID, activitysContent);
    } catch (error) {
      console.log(error);
    }
  },
};
