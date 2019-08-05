const express = require('express');
const routes = require('./routes.js')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('./client/dist'));
app.use('/api', routes);

app.get('/', (req, res) => res.send('Hello from server'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));