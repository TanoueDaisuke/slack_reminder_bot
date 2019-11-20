module.exports = robot => {
  // 大文字小文字を区別せずhelloがマッチすれば、"Hello!"を返す
  // https://00m.in/k3GXk //その他の設定
  robot.hear(/hello/i, res => {    
    // console.log(robot);
    console.log(res.message.text);
    
    res.send(res.message.text)
  })
}