import post from "../../../entities/post"

export default function addPost({
    title,
    description,
    file,
    createdAt,
    isPublished,
    userId,
    cloudService,
    postRepository
}) {
    if(!title || !description){
        throw new Error(`title and description cannot be empty`)
    }

    const newPost = post({
        title,
        description,
        file,
        createdAt,
        isPublished,
        userId,
        cloudService
    })

    return postRepository.add(newPost)
    
}