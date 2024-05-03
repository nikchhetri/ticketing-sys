const QRCode = require('qrcode');

async function generateQrCode(data, filePath) {
    try {
        await QRCode.toFile(filePath, data);
        console.log('QR Code generated at:', filePath);
    } catch (err) {
        console.error('Error generating QR Code:', err);
    }
}

module.exports= {generateQrCode}