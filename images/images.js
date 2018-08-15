let jimp = require('jimp');
let s3Lib = require('./../s3/index');

module.exports = {
    thumbnailS3Image : async (bucket, key) => {
        try {
            let newKey = key.split(".")[0]+'_thumbnail'+'.png';
            let imageObj = await s3Lib.download.downloadObj(bucket, key);
            return new Promise((resolve, reject) => {
                jimp.read(imageObj).then(async (image) => {
                    let newImage = await image.resize(50,50).getBufferAsync(jimp.MIME_PNG);
                    let uploadRes = await s3Lib.upload.upload(bucket, newKey, newImage);
                    if(uploadRes) {
                        let thumbmailURL = await s3Lib.download.getDownloadURL(bucket,newKey);
                        resolve(thumbmailURL);
                    } else {
                        resolve(uploadRes); 
                    }
                });
            });
        } catch(error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
}