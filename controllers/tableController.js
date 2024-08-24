const QRCode = require("qrcode");
const Table = require("../models/table");

const generateQRCode = async (tableId) => {
  try {
    const qrCodeImage = await QRCode.toDataURL(tableId);
    return qrCodeImage;
  } catch (error) {
    console.error("Error generating the QR code", error);
  }
};

const generateTableId = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const addTable = async (req, res) => {
  const { name } = req.body;

  try {
    let tableId;
    let existingTable;
    do {
      tableId = generateTableId();
      existingTable = await Table.findOne({ tableId });
    } while (existingTable);

    const qrCodeImage = await generateQRCode(tableId);

    const newTable = new Table({ tableId, name });
    await newTable.save();

    res.status(201).json({ table: newTable, qrCode: qrCodeImage });
  } catch (error) {
    console.error("Error adding the table", error);
    res.status(500).json({ message: "Error adding table", error });
  }
};

module.exports = { addTable };
