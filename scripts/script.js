const cronJob = require('cron').CronJob;

module.exports = robot => {
  const formatTwoDigits = num => num < 10 ? `0${num}` : num

  const setCronJob = (date, res) => {
    // todo: dateの処理
    const minute = formatTwoDigits(date.getMinutes() + 2)
    const hour = formatTwoDigits(date.getHours())
    const tomorrowDate = formatTwoDigits(date.getDate())
    const month = date.getMonth() // monthは２桁でなくてもいい

    const newCronJob = new cronJob(`00 ${minute} ${hour} ${tomorrowDate} ${month} *`, function() {
      const envelope = {room: "#general"}
      return robot.send(envelope, `${res.message.text}`);
    });
    return newCronJob
  }

  robot.hear(/./i, res => {   
    res.send("了解！リマインド設定します( ˘ω˘ )")
    // res.send(res.message.text)
    const date = new Date()
    const newCronJob = setCronJob(date, res)

    newCronJob.start()
  })
}

