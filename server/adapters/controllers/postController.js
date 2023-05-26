import findAll from "../../applications/useCases/post/findAll"
import findById from "../../applications/useCases/post/findById"
import addPost from "../../applications/useCases/post/add"
import deletePost from "../../applications/useCases/post/deleteById"
import updateById from "../../applications/useCases/post/updateById"
import { getFileUrl } from "../../applications/useCases/post/getFileUrl"

export default function postController(
    postDbRepository,
    postRepositoryImpl,
    authServiceInterface,
    authServiceImpl,
    cloudServiceImpl,
    cloudServiceInterface
) {
    const dbRepository = postDbRepository(postRepositoryImpl())
    const authService = authServiceInterface(authServiceImpl())
    const cloudService = cloudServiceInterface(cloudServiceImpl())

    const fetchAllPosts = async (req, res, next) => {
        try {
            const posts = await findAll(dbRepository);
            const postsWithImageUrl = await Promise.all(
                posts.map(async (post) => {
                    const fileUrl = await getFileUrl(post.file.key, cloudService);
                    return Object.assign({}, post._doc, { imageUrl: fileUrl });
                })
            );
            res.json(postsWithImageUrl);
        } catch (error) {
            next(error);
        }

    }

    const fetchPostById = (req, res, next) => {
        findById(req.params.id, dbRepository)
            .then(async (post) => {
                if (!post) {
                    throw new Error(`No post found with id: ${req.params.id}`)
                }
                // Retrieve the file URL using the file key and cloudService
                const fileUrl = await getFileUrl(post.file.key, cloudService);

                // Extract the necessary fields for the response
                const responseData = {
                    _id: post._id,
                    title: post.title,
                    description: post.description,
                    createdAt: post.createdAt,
                    isPublished: post.isPublished,
                    imageUrl: fileUrl,
                };

                res.json(responseData);
            })
            .catch((error) => next(error))
    }

    // getting the file urls
    const getFile = async (req, res, next) => {
        const { key } = req.params
        const url = await getFileUrl(key, cloudService)
        res.json(url)
    }

    const addNewPost = async (req, res, next) => {
        const { title, description } = req.body

        const file = await cloudService.upload(req.file)
        addPost({
            title,
            description,
            file,
            // userId: req.user.id,
            postRepository: dbRepository,
        })
            .then((post) => res.json(post))
            .catch((error) => next(error))
    }

    const deletePostById = async (req, res, next) => {

        deletePost(req.params.id, dbRepository)
            .then(() => res.json(`Post Successfully deleted`))
            .catch((error) => next(error))
    }

    const updatePostById = (req, res, next) => {
        const { title, description, isPublished } = req.body

        updateById({
            id: req.params.id,
            title,
            description,
            // userId: req.user.id,
            isPublished,
            postRepository: dbRepository
        })
            .then((message) => res.json(message))
            .catch((error) => next(error))
    }

    return {
        fetchAllPosts,
        fetchPostById,
        getFile,
        addNewPost,
        deletePostById,
        updatePostById
    }
}