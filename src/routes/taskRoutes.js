const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig"); // Ajusta la ruta si es necesario

router.post("/", async (req, res) => {
  const { first_name, last_name, email, phone_number, dni } = req.body;

  try {
    const newTask = await db.query(
      "INSERT INTO EMPLOYEES (first_name, last_name, email, phone_number, dni) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [first_name, last_name, email, phone_number, dni]
    );

    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
