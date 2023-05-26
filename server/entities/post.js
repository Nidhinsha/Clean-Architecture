export default function post({
    title,
    description,
    createdAt,
    isPublished = false,
    userId,
    file
}) {
    return {
        getTitle: () => title,
        getDescription: () => description,
        getFile: () => file,
        getCreatedAt: () => createdAt,
        isPublished: () => isPublished,
        getUserId: () => userId
    }
}