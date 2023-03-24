const express = require('express');
const app = express();

const http = require('http').createServer(app); // Isso fara que rode com o servidor nativo do node.
const io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
})

io.on("connection", (socket) => {
    socket.on("disconnect", () => {
        console.log("X desconectou: " + socket.id);
    })
    socket.on("msg", (data) => {
        // socket.emit("showmsg", data); O mesmo socket é quem está emitindo a mensagem, ou seja somente vc vai poder ver
        io.emit("showmsg", data); // Ja aqui é o servidor, que vai emitir os dados para todos
    })
})

http.listen(3000, () => {
    console.log("app rodando!")
})