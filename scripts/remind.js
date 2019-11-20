const cronJob = require('cron').CronJob;

module.exports = robot => {
  // 設定方法: https://00m.in/RhXkB
  newCronJob = new cronJob('00 56 13 20 11 *', function() {
    const envelope = {room: "#general"}
    return robot.send(envelope, "Hungry...!!!");
  });
  newCronJob.start()
};

