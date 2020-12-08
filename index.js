const express = require('express')
// 使用multer接收文件
const multer = require('multer')
const cors = require('cors')
// 将接收的文件放到attachment目录下，没有的话会自动新建一个attachment文件夹
const upload = multer({ dest: 'attachment/' })

// 使用express构建app
const app = express()


app.options('upload', cors())

app.get('/',  cors(), (req, res)=>{
  res.send('my node-server')
})

app.get('/preview/:key', cors(), (req, res)=>{
  // 获取到前端给的参数后，去发送文件
  res.sendFile(`attachment/${req.params.key}`, {
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

app.post('/upload', cors(), upload.single('file'), (req, res)=>{
  // cors 跨域 引入cors()后就不需要手动设置这个了
  // res.set('Access-Control-Allow-Origin', '*')
  res.send(req.file.filename)
})

var port = process.env.PORT || 3000;
app.listen(port)