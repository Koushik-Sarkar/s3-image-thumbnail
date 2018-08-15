let aws = require('aws-sdk');
let cred = require('../config/aws-creds');

module.exports = {
    upload : async (bucketName, key, stream) => {
        try {
            aws.config.accessKeyId = cred.development.accessKey;
            aws.config.secretAccessKey = cred.development.secretKey;
            let s3 = new aws.S3();
            let params = {
                Bucket: bucketName, //'arn:aws:s3:::notes-app-upload-koushik' /* required */
                Key: key,
                Body: stream
              };
            //   var param = {
            //     Bucket: bucketName
            //   };
            // s3.waitFor('bucketNotExists', param, function(err, data) {
            //     if (err) console.log('checking ' + err, err.stack); // an error occurred
            //     else     console.log('checking '+ data);           // successful response
            // });
            let uploadRes = await s3.upload(params).promise();
            return Promise.resolve(true);
        } catch(error) {
            console.log(error);
        }


        
    }
}