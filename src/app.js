require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const { migration, db } = require('./db');
const {
    getAllTodos,
    getOneTodo,
    createTodos,
    updateTodos,
    deleteTodos,
} = require('./services/todos');
const {
    getAllActivities,
    createActivities,
    getOneActivitie,
    updateActivities,
    deleteActivities,
} = require('./services/activites');

const port = process.env.PORT || 3030;
const host = process.env.HOST || 'localhost';

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/todo-items', getAllTodos);
app.get('/todo-items/:id', getOneTodo);
app.post('/todo-items', createTodos);
app.patch('/todo-items/:id', updateTodos);
app.delete('/todo-items/:id', deleteTodos);

app.get('/activity-groups', getAllActivities);
app.get('/activity-groups/:id', getOneActivitie);
app.post('/activity-groups', createActivities);
app.patch('/activity-groups/:id', updateActivities);
app.delete('/activity-groups/:id', deleteActivities);

// 404 endpoint middleware
app.all('*', (req, res) => {
    res.status(404).json({ message: `${req.originalUrl} not found!` });
});

// error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message || 'An error occurred.',
    });
});

const run = async () => {
    await migration(); // 👈 running migration before server
    app.listen(port); // running server
    console.log(`Server run on http://${host}:${port}/`);
};

run();
