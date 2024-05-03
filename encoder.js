const crypto = require('crypto');
require('dotenv').config();
const secret = process.env.ENCSTR

function encodeData(data) {
    const hash = crypto.createHmac('sha256', secret)
                       .update(data.toString())
                       .digest('hex');
    return hash;
}

module.exports = {encodeData}