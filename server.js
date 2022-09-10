const port = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
  }); 

app.listen(port, ()=> console.log(`listening on port ${port}`));