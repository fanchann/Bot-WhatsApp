const simi = require('simsimi')({
    key: 'zfZp4XDplP0_lCILDOSaBMnqsM-h81J_cWIpsD-q',
});
const validator = function(email) {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
};
const shorten = require('ouo.io')('yKMJDizP');
const pasHash = require('base-64');
const utf8 = require('utf8');
const msgResponse = (async (msg) => {
    if (msg.body.startsWith("!simi ")) {
        (async () => {
            let pesan = msg.body.split("!simi ")[1];
            try {
                const response = await simi(pesan);
                msg.reply(response)
                console.log(`${msg.from} => ${response}`)
                return;
            } catch (err) {
                if (err.response.statusMessage == "Do not understand") {
                    msg.reply("ngomong paan njing!")
                }
            }
        })();
    } else if (msg.body.startsWith("!help")) {
        msg.reply(`
        [+] !simi (insert text) => Start chat with simi
        [+] !valid (email) => Check valid email
        [+] !short (url) => Short url use ouo.io
        [+] !encrypt (password) => Generate your secure password
        [+] !decrypt (encrypted) => Decrypt your secure password`)
    } else if (msg.body.startsWith("!valid ")) {
        const check = msg.body.split("!valid ")[1];
        if (validator(check)) {
            msg.reply(`[+] ${check} Valid bang`)
            console.log(`${msg.from} => ${check}`)
        } else {
            msg.reply(`[-] ${check} Yah gak valid`)
        }
    } else if (msg.body.startsWith("!short")) {
        const short = msg.body.split("!short ")[1];
        try {
            let url = shorten.short(short, (url) => {
                console.log(`shorten => ${url}`)
                msg.reply(`Url shorten => ${url}`)
            });
        } catch (err) {
            if (err) {
                msg.reply('Url mu salah bang')
            }
        }
    } else if (msg.body.startsWith("!encrypt ")) {
        const text = msg.body.split("!encrypt ")[1];
        try {
            let tent = utf8.encode(text);
            let ecpt = pasHash.encode(text);
            msg.reply(`
        Password Encrypted !
        From : ${text}
        To : ${ecpt}`)
        } catch (err) {
            if (err) {
                msg.reply('Yang bener lo')
            }
        }
    } else if (msg.body.startsWith("!decrypt ")) {
        const text = msg.body.split("!decrypt ")[1]
        try {
            let tent = pasHash.decode(text);
            let ecpt = utf8.decode(text);
            msg.reply(`
        Password decrypted !
        From : ${text}
        To : ${tent}`)

        } catch (err) {
            if (err) {
                msg.reply('Cek lagi bang hasnya')
            }
        }

    }
})();

module.exports = {
    msgResponse
}