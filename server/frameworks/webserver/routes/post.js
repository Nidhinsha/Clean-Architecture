import postController from "../../../adapters/controllers/postController"
import authServiceInterface from "../../../applications/services/authService"
import authServiceImpl from "../../services/authService"
import postRepositoryMongoDB from "../../database/mongoDB/repositories/postRepositoryMongoDB"
import postDbRepository from "../../../applications/repositories/postDbRepository"
import authMiddleware from "../middlewares/authMiddleware"
import upload from "../middlewares/multerMiddleware"
import {s3Service} from "../../services/s3Service"
import cloudServiceInterface from "../../../applications/services/cloudService";

export default function postRouter(express) {
    const router = express.Router()

    // load the controller with dependencies
    const controller = postController(
        postDbRepository,
        postRepositoryMongoDB,
        authServiceInterface,
        authServiceImpl,
        s3Service,
        cloudServiceInterface
    )

    // GET endpoints
    router.route("/").get(controller.fetchAllPosts)
    router.route("/:id").get(controller.fetchPostById)
    
    // POST endpoints
    router.route('/').post(upload.single('file'), controller.addNewPost);
    // router.route('/').post(controller.addNewPost);

    // PUT endpoints
    router.route("/:id").put(controller.updatePostById)
    
    // DELETE endpoints
    router.route("/:id").delete(controller.deletePostById)

    return router
}