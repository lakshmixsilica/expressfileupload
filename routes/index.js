var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var app = express();
var port = 8000;


var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');
/* GET home page. */

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  //'dist/index.html'));
  //console.log(res);
  res.sendFile(path.join(_dirname, 'dist/index.html/'));
});

// specify the folder
app.use(express.static(path.join(__dirname, 'uploads')));
// headers and content type
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}
});

var upload = multer({ storage: storage });

function checkFileType(file, cb){
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
      return cb(null, true);
  }else{
      cb('Error: Images Only!');
  }
}

app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
  console.log('files', req.files);
  res.send(req.files);
});
var server = app.listen(port, function () {
  console.log("Listening on port %s...", port);
});

module.exports = router;
