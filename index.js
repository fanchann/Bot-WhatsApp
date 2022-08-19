const {
    Client,
    MessageAck
} = require('whatsapp-web.js');
const simi = require('simsimi')({
    key: 'zfZp4XDplP0_lCILDOSaBMnqsM-h81J_cWIpsD-q',
});
const ready = require('./controller/ready')
const validator = function(email) {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
};
const client = new Client();
const setting = require('./controller/setting')

client.on('qr', ready.qr)
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