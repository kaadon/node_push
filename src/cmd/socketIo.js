let dotenv = require('dotenv');
dotenv.config('.env');
const express      = require('express')
const bodyparser   = require('body-parser')
const app          = express()
const http         = require('http')
// const socketPush   = require('../socket.io/socketIo')
const ioServer     = require('../socket.io/server')
const CompressMsg  = require('../utils/CompressMsg')
const socketServer = () => {
    const server = http.createServer(app)
    const io     = ioServer(server)
    /*轮训推送*/
    // const timer  = () => {
    //     setTimeout(() => {
    //         timer()
    //         socketPush.tickerSend(io)
    //         socketPush.klineSend(io)
    //     }, 995)
    // }
    // timer()

    app.use(bodyparser.json())

    app.post('/', async (req, res) => {
        console.log(req.body)
        res.json({
                     "code": 200,
                     "data": {},
                     "msg" : ""
                 })
    })
    app.post('/push', async ({body}, res) => {
        try{
            var {
                    event,
                    data
                }   = body
            var sio = io
            if (!event) {
                return res.send({
                                    code   : 201,
                                    message: "没有event值"
                                })
            }
        }catch (e) {
            return res.send({
                                code   : 202,
                                message: e.message
                            })
        }
        if (data) {
            sio.emit(event, CompressMsg(data))
        }
        return res.json({
                            code   : 200,
                            message: "succes"
                        })
    })
    server.listen(12345, () => {
        console.log('listening on *:12345')
    })
}
module.exports     = socketServer