const addTextBlock = (
  doc,
  text,
  x,
  y,
  {
    fontSize = 8,
    paddingX = 0,
    paddingY = 0,
    color = '#FFF',
    bgColor = '#000',
    characterSpacing = 0,
  } = {},
) => {
  doc.fontSize(fontSize);

  const textWidth = doc.widthOfString(text, { characterSpacing });
  const textHeight = doc.heightOfString(text, { characterSpacing });

  const blockWidth = textWidth + paddingX * 2;
  const blockHeight = textHeight + paddingY * 2;

  doc.rect(x, y, blockWidth, blockHeight).fill(bgColor);

  doc.fill(color).text(text, x + paddingX, y + paddingY + 0.5, {
    characterSpacing,
  });
};

const addTicketType = (doc, type, x, y, { paddingX, paddingY } = {}) => {
  doc.fontSize(8);

  const typeString = type.toUpperCase();
  const stringWidth = doc.widthOfString(typeString);

  //   Width of tear off section
  const tearOffWidth = 80;

  //   Total width of text plus block
  const totalWidth = stringWidth + paddingX * 2;

  //   Calculate remaining space with tearOff section
  const spaceRemaining = tearOffWidth - totalWidth;

  //   Calculate center then divide by 2 to get half of center left
  const center = x + spaceRemaining / 2;

  addTextBlock(doc, typeString, center, y, {
    paddingX,
    paddingY,
    color: '#000',
    bgColor: '#FFF',
  });
};

const addTemplate = (doc, template, x, y) => {
  doc.image(template, x, y, {
    width: 405,
    height: 135,
  });
};

const addQRCode = (doc, QRCode, x, y) => {
  doc.image(QRCode, x, y, {
    fit: [42, 42],
    align: 'center',
  });
};

module.exports = {
  addTextBlock,
  addTicketType,
  addQRCode,
  addTemplate,
};
