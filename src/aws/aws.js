import aws from 'aws-sdk';
const {config, S3} = aws;

config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const s3 = new S3();

