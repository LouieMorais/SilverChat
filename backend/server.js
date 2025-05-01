const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

// console.log(process.env); // Yes, it is working!

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send('SilverChat API is running!');
    console.log(res, req)
});

app.listen(PORT, () => {
    console.log(`⚙️  It is alive on port ${PORT} 🔧`);
})