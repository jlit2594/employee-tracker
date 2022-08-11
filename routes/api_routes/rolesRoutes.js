const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Sucess!',
            data: rows
        });
    });
});

router.get('/roles/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
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

router.delete('/roles/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: "Sorry! I couldn't find that role."
            });
        } else {
            res.json({
                message: 'Role deleted.',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;