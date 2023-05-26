export default function cloudService(service) {
    const upload = async(file) => await service.uploadFile(file)

    const getFile = async(fileKey) => await service.getFile(fileKey)
    
    const deleteFile = async(fileKey) => await service.deleteFile(fileKey)
    return {
        upload,
        getFile,
        deleteFile
    }
} 