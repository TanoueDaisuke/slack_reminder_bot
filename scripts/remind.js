const cronJob = require('cron').CronJob;

module.exports = robot　=> {
  // 設定方法: https://00m.in/RhXkB
  return newCronJob = new cronJob('00 45 12 20 11 *', function() {
    const envelope = {room: "#general"}
    return robot.send(envelope, "Hungry...!!!");
  });
};