import userController from "../../../adapters/controllers/userController";
import userDbRepository from "../../../applications/repositories/userDbRepository"
import userRepositoryMongoDB from "../../database/mongoDB/repositories/userRepositoryMongoDB";
import authServiceInterface from "../../../applications/services/authService"
import authServiceImpl from "../../services/authService";
import authMiddleware from "../middlewares/authMiddleware";

export default function userRouter(express) {
    const router = express.Router()

    // load controller with dependencies
    const controller = userController(
        userDbRepository,
        userRepositoryMongoDB,
        authServiceInterface,
        authServiceImpl
    )

    // GET endpoints
    router.route('/:id').get(authMiddleware,controller.fetchUserById);
    router.route('/').get(controller.findAllUsers)
    
    // POST endpoints
    router.route('/').post(controller.addNewUser)

    return router
}