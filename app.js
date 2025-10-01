const express = require('express')
const app = express()
const port = 3000
const http = require("http")
const socketio = require("socket.io")
const path = require("path")
const server = http.createServer(app)

const io = socketio(server)

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))
io.on("connection",(socket)=>{
    socket.on("send-location", (data)=>{
        io.emit("receive-location", {id:socket.id, ...data})
    })
    socket.on("disconnect", ()=>{
        io.emit("user-disconnected", socket.id)
    })
console.log("Connected")
})
app.get('/', (req, res) => {
  res.render('index')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
