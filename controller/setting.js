const mdl = require('./config/modules')

const simiI = (msg) => {
    (async () => {
        let pesan = msg.body.split("!simi ")[1];
        try {
            const response = await mdl.simi(pesan);
            msg.reply(response)
            return;
        } catch (err) {
            if (err.response.statusMessage == "Do not understand") {
                msg.reply("ngomong paan njing!")
            }
        }
    })();
}

const help = (msg) => {
    msg.reply(`
        [+] !simi (insert text) => Start chat with simi
        [+] !valid (email) => Check valid email
        [+] !short (url) => Short url use ouo.io
        [+] !encrypt (password) => Generate your secure password
        [+] !decrypt (encrypted) => Decrypt your secure password`)
}

const validEmail = (msg) => {
    const check = msg.body.split("!valid ")[1];
    if (mdl.validator(check)) {
        msg.reply(`[+] ${check} Valid bang`)
    } else {
        msg.reply(`[-] ${check} Yah gak valid`)
    }
}

const short = (msg) => {
    const short = msg.body.split("!short ")[1];
    try {
        if ($.isUrl(short)) {
            let url = mdl.shorten.short(short, (url) => {
                msg.reply(`Url shorten => ${url}`)
            });
        } else {
            msg.reply(`Check your url again!`)
        }
    } catch (err) {
        if (err) {
            msg.reply('[!] error')
        }
    }
}

const encrypt = (msg) => {
    const text = msg.body.split("!encrypt ")[1];
    try {
        let tent = mdl.utf8.encode(text);
        let ecpt = mdl.pasHash.encode(text);
        msg.reply(`
        Password Encrypted !
        From : ${text}
        To : ${ecpt}`)
    } catch (err) {
        if (err) {
            msg.reply('Yang bener lo')
        }
    }
}

const decrypt = (msg) => {
    const text = msg.body.split("!decrypt ")[1]
    try {
        let tent = mdl.pasHash.decode(text);
        let ecpt = mdl.utf8.decode(text);
        msg.reply(`
        Password decrypted !
        From : ${text}
        To : ${tent}`)

    } catch (err) {
        if (err) {
            msg.reply('Cek lagi bang hashnya')
        }
    }
}


module.exports = {
    simiI,
    help,
    validEmail,
    short,
    encrypt,
    decrypt
}