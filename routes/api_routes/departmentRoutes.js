const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success!',
            data: rows
        });
    });
});

router.get('/departments/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Sucess!',
            data: row
        });
    });
});

router.post('/department', ({ body }, res) => {

    const sql = `INSERT INTO departments (id, name) VALUES (?,?)`;
    const params = [body.id, body.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    })
})

router.delete('/department/:id', (req, res) => {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: "Sorry! I couldn't find that department."
            });
        } else {
            res.json({
                message: 'Succesfully deleted the department',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;