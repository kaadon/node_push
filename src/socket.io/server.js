const {Server}    = require("socket.io");
const CompressMsg = require('../utils/CompressMsg')

const socketIo = (server) => {
    const io = new Server(server, {
        pingInterval   : 5000,
        withCredentials: true,
        cors           : {
            origin: "*"
        }
    })
    io.on('connection', socket => {
        socket.on('getPush',async (data) => {
            console.log(data)
        })
        socket.on('disconnect', () => {
            console.log('用户已断开连接')
        })
    })
    return io
}
module.exports = socketIo