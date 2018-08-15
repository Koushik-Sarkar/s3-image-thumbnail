let aws = require('aws-sdk');
let fs = require('fs');
let cred = require('../config/aws-creds');

module.exports = {
    getDownloadURL : async (bucketName, key) => {
        try {
            aws.config.accessKeyId = cred.development.accessKey;
            aws.config.secretAccessKey = cred.development.secretKey;
            aws.config.update({
                signatureVersion: 'v4',
                region: 'ap-south-1'
            });
            let s3 = new aws.S3();
            let params = {
                Bucket: bucketName,
                Key: key,
                Expires: 60 * 10
            };
            s3.getObject
            let url = await new Promise((resolve, reject) => {
                s3.getSignedUrl('getObject',params, (err ,data) => {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(data);    
                } );
            });
            console.log(url);
        } catch(error) {
            console.log(error);
            Promise.reject(error);
        }
    },
    downloadObj : async (bucketName, key) => {
        try {
            aws.config.accessKeyId = cred.development.accessKey;
            aws.config.secretAccessKey = cred.development.secretKey;
            aws.config.update({
                signatureVersion: 'v4',
                region: 'ap-south-1'
            });
            let s3 = new aws.S3();
            let params = {
                Bucket: bucketName,
                Key: key    
            };
            let s3Obj = await s3.getObject(params).promise();
            return Promise.resolve(s3Obj.Body);
            // return new Promise((resolve, reject) => {
            //     jimp.read(s3Obj.Body).then((image) => {
            //         image.resize(50,50).write(path, (err) => {
            //             if(err) {  
            //                 console.log(err);
            //                 reject(err);
            //             }
            //             resolve({path , fileName : key});    
            //         });
            //     });
        } catch(error) {
            console.log(error);
            Promise.reject(error);
        }
    },
    downloadToDisk : async (bucketName, key, path) => {
        try {
            aws.config.accessKeyId = cred.development.accessKey;
            aws.config.secretAccessKey = cred.development.secretKey;
            aws.config.update({
                signatureVersion: 'v4',
                region: 'ap-south-1'
            });
            let s3 = new aws.S3();
            let params = {
                Bucket: bucketName,
                Key: key    
            };
            let s3Obj = await s3.getObject(params).promise();

            fs.writeFile(path, s3Obj.Body, 'binary',(err) => {
                if(err) {  
                    console.log(err);
                    reject(err);
                }
                resolve({path , fileName : key});
            });
        } catch(error) {
            console.log(error);
            Promise.reject(error);
        }
    }
}
