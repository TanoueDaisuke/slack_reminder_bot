const remind = require('../lib/remind')
const { CronJob } = require('cron')


module.exports = robot => {

  //秒: 0-59 分: 0-59 時: 0-23 日: 1-31 月: 0-11 週: 0-6
  //以下は毎日 23:40
  new CronJob('00 40 23 * * *', () => { // TODO: 本当はサーバーが起きた時(10時くらいを目安にしたい)
    remind.setRemind(robot)
  }, null, true); 

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

  robot.hear(/remind list/i, res => {
    res.send(remind.getRemindList().join('\n'))
  })

  robot.hear(/./i, res => {
    // 「///」が含まれている時は除外
    if (res.message.text.indexOf('///') === -1) {
      res.send(yearEndJumboMini())
      // ２桁に直す関数
      const formatTwoDigits = num => num < 10 ? `0${num}` : num

      // dateの処理
      const date = new Date()  // 送信時の時刻取得

      const minute = formatTwoDigits(date.getMinutes())
      const hour = formatTwoDigits(date.getHours())
      const tomorrowDate = formatTwoDigits(date.getDate() + 1)
      const month = date.getMonth() // monthは２桁でなくてもいい

      // const setDate = `00 ${minute} ${hour} ${tomorrowDate} ${month} *` // TODO: 本来の設定はこっち
      const setDate = `00 45 23 ${date.getDate()} ${month} *`

      remind.addRemind(res.message.text, setDate)
    }
  })
}

