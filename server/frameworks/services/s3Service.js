import {PutObjectCommand, S3Client, GetObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import configKeys from "../../config/config"
import crypto from "crypto"

const s3 = new S3Client({
    credentials:{
        accessKeyId :configKeys.awsS3AccessKey,
        secretAccessKey :configKeys.awsS3SecretKey
    },
    region: configKeys.awsS3Regeion
})
// to get unique name to file for storing
const randomImageName = (bytes=32) => crypto.randomBytes(bytes).toString('hex')

export const s3Service =()=> {
    const uploadFile = async(file) => {
        const key = randomImageName()
        const params = {
            Bucket:configKeys.awsS3BucketName,
            Key:key,
            Body:file.buffer,
            ContentType:file.mimetype
        }
        const command = new PutObjectCommand(params)
        await s3.send(command)
        return {
            name:file.originalname,
            key
        }
    }

    const getFile = async(fileKey) => {
        const GetObjectParams = {
            Bucket: configKeys.awsS3BucketName,
            Key: fileKey
        }

        const command = new GetObjectCommand(GetObjectParams)
        return await getSignedUrl(s3, command, {expiresIn:60000})
    }

    const deleteFile = async(fileKey) => {
        const params = {
            Bucket : configKeys.awsS3BucketName,
            key: fileKey
        }

        const command = new DeleteObjectCommand(params)
        await s3.send(command)
    }

    return {
        uploadFile,
        getFile,
        deleteFile
    }
}