module.exports = robot => {
  // 大文字小文字を区別せずhelloがマッチすれば、"Hello!"を返す
  robot.hear(/hello/i, res => {    
    // console.log(robot);
    
    res.send("/remind #個人開発 `hoge` 10:00 today")
  })
}