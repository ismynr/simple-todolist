const { db } = require("../db");
const notNull = require("../helper/check");

const getAllActivities = async (req, res) => {
  const [rows] = await db.query(`SELECT * FROM activities`);
  res.json({ status: 'Success', message: "Success", data: rows });
}

const getOneActivitie = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query(`SELECT * FROM activities WHERE activity_id = ?`, [id]);
  res.json({ status: 'Success', message: "Success", data: rows[0] });
}

const createActivities = async (req, res) => {
  const { title, email } = req.body;
  const [rows] = await db.query(`INSERT INTO activities (title, email) VALUES(?,?)`, [title, email]);
  const [rowsResult] = await db.query(`SELECT * FROM activities WHERE activity_id = ?`, [rows.insertId]);
  res.json({ status: 'Success', message: "Success", data: rowsResult[0] });
}

const updateActivities = async (req, res) => {
  const { id } = req.params;
  const { title, email } = req.body;
  let query = `UPDATE activities SET`;
  let array = [];
  if (notNull(title)) {
    query += ` title = ?`;
    array.push(title);
  }
  
  if (notNull(title) && notNull(email)) {
    query += `,`;
  }
  
  if (notNull(email)) {
    query += ` SET email = ?`;
    array.push(email);
  }
  
  array.push(id);
  const [rows] = await db.query(`${query} WHERE activity_id = ?`, array);
  const [rowsResult] = await db.query(`SELECT * FROM activities WHERE activity_id = ?`, [id]);
  res.json({ status: 'Success', message: "Success", data: rowsResult[0] });
}

const deleteActivities = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query(`DELETE FROM activities WHERE activity_id = ?`, [id]);
  if (rows.affectedRows < 1) {
    res.json({ status: 'Not Found', message: `Activity with ID ${id} Not Found` });
  } else {
    res.json({ status: 'Success', message: "Success" });
  }
}

module.exports = {
  getAllActivities,
  getOneActivitie,
  createActivities,
  updateActivities,
  deleteActivities,
};
