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
// 单个上传
// upload.single('file') 为单个
app.post('/upload', cors(), upload.single('file'), (req, res)=>{
  // cors 跨域 引入cors()后就不需要手动设置这个了
  // res.set('Access-Control-Allow-Origin', '*')
  let filename = req.file.filename
  let resData = {
    id: filename
  }
  res.send(JSON.stringify(resData)) // 序列化，现在发送的是字符串
})

// 多个同时上传（其实前端上传改为一个一个单独上传后这个用不到了）
// upload.array('file', 12)  // 多个，最多12个, file是formData的name
app.post('/uploads', cors(), upload.array('file', 12), (req, res)=>{
  let responseData = req.files.map(file => file.filename)
  res.send(JSON.stringify(responseData))
})

var port = process.env.PORT || 3000;
app.listen(port)