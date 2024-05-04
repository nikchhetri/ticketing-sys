const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

async function generateQrCode(data, filePath) {
    try {
        dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        await QRCode.toFile(filePath, data);
        console.log('QR Code generated at:', filePath);
    } catch (err) {
        console.error('Error generating QR Code:', err);
    }
}

module.exports= {generateQrCode}