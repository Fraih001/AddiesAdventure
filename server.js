const port = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));
app.use('/styles.css'), express.static('styles.css');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
  }); 

app.listen(port, ()=> console.log(`listening on port ${port}`));