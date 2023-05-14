const { db } = require("../db");
const notNull = require("../helper/check");

const getAllTodos = async (req, res) => {
  const { activity_group_id } = req.query;
  const notNullAGI = activity_group_id !== '' && activity_group_id !== null && activity_group_id !== undefined;
  let query = '';
  let array = [];
  
  if (notNullAGI) {
    query += ` WHERE activity_group_id = ?`;
    array.push(activity_group_id);
  }
  
  const [rows] = await db.query(`SELECT * FROM todos ${query}`, array);
  res.json({ status: 'Success', message: "Success", data: rows });
}

const getOneTodo = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query(`SELECT * FROM todos WHERE todo_id = ?`, [id]);
  res.json({ status: 'Success', message: "Success", data: rows[0] });
}

const createTodos = async (req, res) => {
  const { title, activity_group_id, priority, is_active } = req.body;
  const [rows] = await db.query(`INSERT INTO todos (title, activity_group_id, priority, is_active) VALUES(?,?,?,?)`, [title, activity_group_id, priority, is_active]);
  const [rowsResult] = await db.query(`SELECT * FROM todos WHERE todo_id = ?`, [rows.insertId]);
  res.json({ status: 'Success', message: "Success", data: rowsResult[0] });
}

const updateTodos = async (req, res) => {
  const { id } = req.params;
  const { title, activity_group_id, priority, is_active } = req.body;
  let query = `UPDATE todos SET`;
  let array = [];

  if (notNull(title)) {
    query += ` title = ?`;
    array.push(title);
  }
  
  query += notNull(title) && notNull(activity_group_id) ? `,` : '';
  
  if (notNull(activity_group_id)) {
    query += ` activity_group_id = ?`;
    array.push(activity_group_id);
  }
  
  query += notNull(title) || notNull(activity_group_id) || notNull(priority) ? `,` : '';
  
  if (notNull(priority)) {
    query += ` priority = ?`;
    array.push(priority);
  }
  
  query += notNull(title) || notNull(activity_group_id) || notNull(priority) || notNull(is_active) ? `,` : '';
  
  if (notNull(is_active)) {
    query += ` is_active = ?`;
    array.push(is_active);
  }
  
  array.push(id);
  const [rows] = await db.query(`${query} WHERE todo_id = ?`, array);
  const [rowsResult] = await db.query(`SELECT * FROM todos WHERE todo_id = ?`, [id]);
  res.json({ status: 'Success', message: "Success", data: rowsResult[0] });
}

const deleteTodos = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query(`DELETE FROM todos WHERE todo_id = ?`, [id]);
  if (rows.affectedRows < 1) {
    res.json({ status: 'Not Found', message: `Todo with ${id} ID Not Found` });
  } else {
    res.json({ status: 'Success', message: "Success", data: rows });
  }
}

module.exports = {
  getAllTodos,
  getOneTodo,
  createTodos,
  updateTodos,
  deleteTodos,
};
