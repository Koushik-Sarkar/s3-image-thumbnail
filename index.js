// let upload = require('./s3/upload');
// let download = require('./s3/download');
let images = require('./images/images');

//upload.upload('notes-app-upload-koushik','hello.txt', 'Hello world23');

// download.download('notes-app-upload-koushik','hello.txt');

// download.downloadObj('notes-app-upload-koushik','koushik2.jpg','./localStore/as3.png');
images.thumbnailS3Image('notes-app-upload-koushik','koushik.jpg');
