const qrcode = require('qrcode-terminal');
const qr = (qr) => {
    // Generate and scan this code with your phone
    const show = qrcode.generate(qr, {
        small: true
    }, function(qr) {
        console.log(qr)
    });
};

const ready = () => {
    console.log('Bot Siap!');
}

module.exports = {
    qr,
    ready
}