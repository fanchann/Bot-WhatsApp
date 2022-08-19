const {
    Client,
    LegacySessionAuth
} = require('whatsapp-web.js');
const fs = require('fs')
const ready = require('./controller/ready')
let client = new Client();
const setting = require('./controller/setting')

client.on('qr', ready.qr)
// const SESSION_FILE_PATH = './session.json';

// // Load the session data if it has been previously saved
// let sessionData;
// if (fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }

// // Use the saved values
// client = new Client({
//     authStrategy: new LegacySessionAuth({
//         session: sessionData
//     })
// });

// // Save session values to the file upon successful auth
// client.on('authenticated', (session) => {
//     sessionData = session;
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// });
client.on('ready', ready.ready);


client.on('message', async (msg) => {
    if (msg.body.startsWith("!simi ")) {
        setting.simiI(msg)
    } else if (msg.body.startsWith("!help")) {
        setting.help(msg)
    } else if (msg.body.startsWith("!valid ")) {
        setting.validEmail(msg)
    } else if (msg.body.startsWith("!short")) {
        setting.short(msg)
    } else if (msg.body.startsWith("!encrypt ")) {
        setting.encrypt(msg)
    } else if (msg.body.startsWith("!decrypt ")) {
        setting.decrypt(msg)
    }
});
client.initialize()