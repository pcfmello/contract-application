const express = require("express");

const router = express.Router();

const Person = require("../models/person");

router.get("/", async (req, res) => {
  try {
    // const people = await Person.find().populate(["contract"]);
    const people = await Person.find({}, { _id: 1, firstName: 1, lastName: 1 });

    return res.send(people);
  } catch (err) {
    return res.status(400).send({ error: "Error finding people" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const people = await Person.find(
      { _id: req.params.id },
      {
        _id: 0,
        firstName: 1,
        lastName: 1,
        email: 1,
        cpf: 1,
        phone: 1,
      }
    );

    return res.send(people[0]);
  } catch (err) {
    return res.status(400).send({ error: "Error finding person" });
  }
});

router.post("/", async (req, res) => {
  try {
    await Person.create(req.body);

    return res.status(201).send();
  } catch (err) {
    return res.status(400).send({ error: "Error creating new person" });
  }
});

module.exports = (app) => app.use("/part", router);
