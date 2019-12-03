const cronJob = require('cron').CronJob;
const fs = require('fs')
const fileName = './reminds.json'

let remindList = new Map() //[リマインド詳細(content) => 送信予定日(date)]

try {
  const data = fs.readFileSync(fileName, 'utf8')
  remindList = new Map(JSON.parse(data))
} catch (ignore) {
  console.log('エラーが発生'); 
}

// ファイルにリマインダー保存
const saveRemind = () => fs.writeFileSync(fileName, JSON.stringify(Array.from(remindList)),'utf8')

// メッセージが来たらここで追加、保存
const addRemind = (content, date) => {
  remindList.set(content, date)
  saveRemind()
}

// リマインド設定したらjsonファイルをリセット(空欄に)
const resetRemind = () => fs.writeFileSync(fileName, '', 'utf8')

// サーバーが起きたときに呼び出してリマインド設定する
const setRemind = robot => {
  remindList.forEach((date, content) => {
    const newCronJob = new cronJob(date, () => {
      const envelope = {room: "#remind"}
      return robot.send(envelope, `<!channel>\n${content}`) //res.message.textで送られたメッセージ取得
    })

    // 設定
    newCronJob.start()
  })
  // ファイルをリセット
  resetRemind()
}

// リマインド一覧取得
const getRemindList = () =>  Array.from(remindList).map(remind => remind[0])

module.exports = { 
  addRemind,
  setRemind,
  getRemindList
}