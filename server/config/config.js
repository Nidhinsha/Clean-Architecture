import dotenv from "dotenv"
dotenv.config()

export default {
    port : process.env.PORT || 5000,
    mongoDB : {
        uri : process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/clean-code'
    },
    jwtSecret : process.env.JWT_SECRET || 'jwtsecret',
    awsS3AccessKey : process.env.AWS_S3_ACCESS_KEY,
    awsS3SecretKey : process.env.AWS_S3_SECRET_KEY,
    awsS3BucketName : process.env.AWS_S3_BUCKET_NAME,
    awsS3Regeion : process.env.AWS_S3_REGEION
}