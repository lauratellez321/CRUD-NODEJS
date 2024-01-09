const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig"); // Ajusta la ruta si es necesario

router.post("/createUser", async (req, res) => {
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

router.get("/getUser/:dni", async (req, res) => {
  const dni = req.params.dni;

  try {
    const newTask = await db.query("SELECT * FROM EMPLOYEES WHERE dni=$1", [
      dni,
    ]);

    if (newTask.rows.length === 0) {
      return res.status(404).json({ msg: "Employee not found" });
    }
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/editUser/:dni", async (req, res) => {
  const dni = req.params.dni;
  const { newEmail, newPhoneNumber } = req.body;

  try {
    const newTask = await db.query("SELECT * FROM EMPLOYEES WHERE dni=$1", [
      dni,
    ]);

    if (newTask.rows.length === 0) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    const updateDataUser = await db.query(
      "UPDATE employees SET email = $1, phone_number = $2 WHERE dni = $3 RETURNING *",
      [newEmail, newPhoneNumber, dni]
    );

    res.json(updateDataUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/deleteUser/:dni", async (req, res) => {
  const dni = req.params.dni;
  try {
    const getUser = await db.query("SELECT * FROM EMPLOYEES WHERE dni=$1", [
      dni,
    ]);
    if (getUser.rows.length === 0) {
      return res.status(404).json({ msg: "Employee not found" });
    }
    await db.query("DELETE FROM EMPLOYEES WHERE dni=$1", [dni]);

    res.json({ msg: "Deleted employee" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
