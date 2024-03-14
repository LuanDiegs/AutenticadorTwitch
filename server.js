const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = 8080;

app.use(express.static(__dirname));
app.use('/', router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

router.get('/',function(req, res){
  res.sendFile(path.join(__dirname + '/paginas/index.html'));
});