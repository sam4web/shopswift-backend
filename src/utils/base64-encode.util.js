const base64Encode = (image) => {
  return Buffer.from(image, "binary").toString("base64");
};

module.exports = base64Encode;
