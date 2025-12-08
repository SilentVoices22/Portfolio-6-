const app = require ('express')();
const PORT = 8080
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'port6data.json');
let port6data = [];

function loadData() {
  const fileContents = fs.readFileSync(dataPath, 'utf8');
  port6data = JSON.parse(fileContents);
}

loadData();

app.listen(
    PORT,() => console.log('DEN LEVER PÅ localhost:${PORT}')
)