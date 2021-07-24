const express = require('express');

const PORT = 3000;
const app = express();

app.get('', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT || 3000, () => {
 console.log(`Server is listening on port: ${PORT}`);
});