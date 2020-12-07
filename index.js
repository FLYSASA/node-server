const express = require('express')
// 使用multer接收文件
const multer = require('multer')
// 将接收的文件放到yyy目录下，没有的话会自动新建一个yyy文件夹
const upload = multer({ dest: 'yyy/' })

// 使用express构建app
const app = express()

app.get('/', (req, res)=>{
  res.send('hello thks')
})

app.get('/preview/:key', (req, res)=>{
  console.log(req.params.key)
  // 获取到前端给的参数后，去发送文件
  res.sendFile(`yyy/${req.params.key}`, {
    root: __dirname,
    headers:{
      'Content-Type': 'image/jpeg',
    },
  }, (error)=>{
    if(error){
      res.status(404).send('Not found')
    }
  })
})

app.post('/upload', upload.single('xxx'), (req, res)=>{
  // cors 跨域
  res.set('Access-Control-Allow-Origin', '*')
  res.send(req.file.filename)
})

app.listen(3000)