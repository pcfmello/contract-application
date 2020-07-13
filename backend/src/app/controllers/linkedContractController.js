const express = require("express");
const router = express.Router();
const Contract = require("../models/contract");
const Person = require("../models/person");

/**
 *LINKED CONTRACTS
 Returns a linked contract list
 */
router.get("/", async (req, res) => {
  try {
    const linkedContracts = await Contract.find(
      {
        people: { $exists: true },
        $where: "this.people.length > 0",
      },
      { _id: 1, title: 1 }
    );

    return res.send(linkedContracts);
  } catch (err) {
    return res.status(400).send({ error: "Error finding contracts" });
  }
});

/**
 * UNLINKED CONTRACTS LIST
 * Returns unlinked contract list. Contracts not contain  people linked
 */
router.get("/unlinked-contracts-only", async (req, res) => {
  try {
    const unlinkedContracts = await Contract.find(
      {
        people: { $exists: true },
        $where: "this.people.length == 0",
      },
      { _id: 1, title: 1 }
    );

    return res.send(unlinkedContracts);
  } catch (err) {
    return res.status(400).send({ error: "Error finding contract" });
  }
});

/**
 * LINKED CONTRACT
 * Returns a linked contract. A contract have not contain people
 */
router.get("/:id", async (req, res) => {
  try {
    const linkedContract = await Contract.find(
      { _id: req.params.id },
      { _id: 1, title: 1, people: 1 }
    ).populate(["people"]);

    return res.send(linkedContract[0]);
  } catch (err) {
    return res.status(400).send({ error: "Error finding contract" });
  }
});

/**
 * LINK CONTRACT
 * Creates a link between a unlinked contract and people
 */
router.put("/:id", async (req, res) => {
  try {
    const { peopleIds } = req.body;
    const people = [];

    await Promise.all(
      peopleIds.map(async (personId) => {
        const person = await Person.findById(personId);
        people.push(person);
      })
    );

    await Contract.findOneAndUpdate(
      { _id: req.params.id },
      { people },
      {
        new: true,
      }
    );

    return res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error creating new contract" });
  }
});

module.exports = (app) => app.use("/linked-contract", router);
