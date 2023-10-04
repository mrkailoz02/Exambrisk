// Using Model
const List = require('../models/listModel');
const { logSearchRequest } = require('../searchLogger');

const getAllLists = async (req, res) => {
    try {
        const lists = await List.getAllLists();
        if (lists === null) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

async function filterList(req, res) {
    try {
        const body = req.body;
        const searchQuery = req.body.filter.title || '';
        logSearchRequest(searchQuery);

        if (JSON.stringify(body) === JSON.stringify({})) {
            return res.status(400).json({ message: 'Bad Request', status: 400 });
        }

        const filter = body.filter;

        if (JSON.stringify(filter) === JSON.stringify({})) {
            return res.status(400).json({ message: 'Bad Request', status: 400 });
        }

        const title = filter.title;

        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ message: 'Bad Request', status: 400 });
        }

        const list = await List.getAllLists();

        if (list === null) {
            return res.status(500).json({ message: 'Something Wrong', status: 500 });
        }

        const result = list.filter(data => data.title.includes(title));

        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || 'Internal Server Error',
            status: error.statusCode || 500
        });
    }
}

module.exports = {
    getAllLists,
    filterList
}