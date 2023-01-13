const WebSocket = require("ws")
const http = require("http")
const server = http.createServer()
const PORT = 3456
const wss = new WebSocket.Server({ server: server })

wss.on("connection", (ws, req) => {
    ws.on("message", msg => {
        console.log(`Server received message ${msg.toString()}`)
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                console.log("Send message to client")
                client.send(msg.toString())
            }
        })
    })
    // ws.send("You have established connection with chatroom server")
    ws.on("close", msg => {
        console.log(`Closed websocket. msg = ${msg}`)
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})