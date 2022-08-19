const {
    Client,
} = require('whatsapp-web.js');
const client = new Client();
const setting = require('./controller/setting')
const ready = require('./controller/ready')

client.on('qr', ready.qr)
client.on('ready', ready.ready);
client.on('message', setting.msgResponse)

client.initialize()