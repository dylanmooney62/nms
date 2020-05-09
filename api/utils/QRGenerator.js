const QRCode = require('qrcode');

const QRGenerator = async (string) => {
  try {
    return await QRCode.toDataURL(string, {
      margin: 0,
      color: {
        dark: '#FFF', // White
        light: '#0000', // Transparent background
      },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = QRGenerator;
