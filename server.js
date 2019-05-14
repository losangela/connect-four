const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('./client/dist'));

app.get('/', (req, res) => res.send('Hello from server'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));