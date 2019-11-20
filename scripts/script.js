const cronJob = require('cron').CronJob;

module.exports = robot => {
  // ２桁に直す関数
  const formatTwoDigits = num => num < 10 ? `0${num}` : num

  const setCronJob = (date, res) => {
    // dateの処理
    const minute = formatTwoDigits(date.getMinutes())
    const hour = formatTwoDigits(date.getHours())
    const tomorrowDate = formatTwoDigits(date.getDate() + 1)
    const month = date.getMonth() // monthは２桁でなくてもいい

    const newCronJob = new cronJob(`00 ${minute} ${hour} ${tomorrowDate} ${month} *`, function() {
      const envelope = {room: "#general"}
      return robot.send(envelope, `<!channel>\n${res.message.text}`) //res.message.textで送られたメッセージ取得
    })

    return newCronJob
  }

  robot.hear(/./i, res => {   
    res.send("了解！リマインド設定します( ˘ω˘ )")

    const date = new Date()
    const newCronJob = setCronJob(date, res)

    newCronJob.start()
  })
}

