const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // Use the cors middleware
const users = require('./Users');


const paginatedResults = (model) => {
    return (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const start_index = (page - 1) * limit;
        const end_index = page * limit;

        const results = {};
        const result = model.slice(start_index, end_index);
        results.result = result;
        if (end_index < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (start_index > 0) {
            results.prev = {
                page: page - 1,
                limit: limit
            }
        }
        const last_available_page = Math.ceil(model.length / limit);
        results.last_available_page = last_available_page;

        res.paginatedResults = results;
        next();
    }
}

app.get('/users', paginatedResults(users), (req, res) => {
    res.json(res.paginatedResults);
});

app.listen(2710);