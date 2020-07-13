const express = require("express");
var multer = require("multer");

var upload = multer({ dest: "public/documents/" });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/documents");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.substr(
      file.originalname.lastIndexOf(".") + 1
    );
    documentName = file.fieldname + "-" + uniqueSuffix + "." + ext;
    cb(null, documentName);
  },
});
var upload = multer({ storage: storage });

const router = express.Router();

const Contract = require("../models/contract");

router.get("/", async (req, res) => {
  try {
    // const contracts = await Contract.find().populate(["people"]);
    const contracts = await Contract.find({}, { _id: 1, title: 1 });

    return res.send(contracts);
  } catch (err) {
    return res.status(400).send({ error: "Error finding contracts" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const contracts = await Contract.find(
      { _id: req.params.id },
      { _id: 0, title: 1, startDate: 1, endDate: 1, filename: 1 }
    );

    contracts[0]._doc = {
      ...contracts[0]._doc,
      ext: contracts[0]._doc.filename.substr(
        contracts[0]._doc.filename.lastIndexOf(".") + 1
      ),
    };

    return res.send(contracts[0]);
  } catch (err) {
    return res.status(400).send({ error: "Error finding contract" });
  }
});

router.post("/", upload.single("document"), async (req, res) => {
  try {
    const { title, startDate, endDate } = JSON.parse(req.body.data);
    const { filename } = req.file;

    const contract = await Contract.create({
      title,
      startDate,
      endDate,
      filename,
    });

    await contract.save();

    return res.status(201).send();
  } catch (err) {
    return res.status(400).send({ error: "Error creating new contract" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const contract = await Contract.findByIdAndRemove(req.params.id);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: "Error deleting contract" });
  }
});

module.exports = (app) => app.use("/contract", router);
