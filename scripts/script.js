const cronJob = require('cron').CronJob;

module.exports = robot => {
  // ２桁に直す関数
  const formatTwoDigits = num => num < 10 ? `0${num}` : num

  const setCronJob = (date, res) => {
    // dateの処理
    // const minute = formatTwoDigits(date.getMinutes() + 10)
    // const hour = formatTwoDigits(date.getHours())
    const today = formatTwoDigits(date.getDate())
    const month = date.getMonth() // monthは２桁でなくてもいい

    // const newCronJob = new cronJob(`00 ${minute} ${hour} ${tomorrowDate} ${month} *`, function() {
    const newCronJob = new cronJob(`00 50 23 ${today} ${month} *`, function() {
      const envelope = {room: "#general"}
      return robot.send(envelope, `<!channel>\n${res.message.text}`) //res.message.textで送られたメッセージ取得
    })

    return newCronJob
  }

  const yearEndJumboMini= () => {
    const num = Math.random()
    if (num <= 5e-7) {
      return "１等の3,000万円!!!!!!!"
    } else if (num <= 0.000001) {
      return "2等の1000万!!!!"
    } else if (num <= 0.00001) {
      return "3等の100万!!!!"
    } else if (num <= 0.0003) {
      return "4等の10万!!!"
    } else if (num <= 0.001) {
      return "5等の1万!!"
    } else if (num <= 0.01) {
      return "６等の3000円!"
    } else if (num <= 0.1) {
      return "７等の300円"
    } else {
      return "外れ...( ˘ω˘ )"
    }
  }

  robot.hear(/./i, res => {
    // 「///」が含まれている時は除外
    if (res.message.text.indexOf('///') === -1) {
      res.send(yearEndJumboMini())
      
      const date = new Date()
      const newCronJob = setCronJob(date, res)
  
      newCronJob.start()
    }
  })
}

