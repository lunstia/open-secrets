const express = require('express');
const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('Yo its the chat page!')
})

module.exports = router;