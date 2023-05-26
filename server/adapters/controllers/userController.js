import addUser from "../../applications/useCases/user/add"
import findById from "../../applications/useCases/user/findById"
import countAll from "../../applications/useCases/user/countAll"
import findByProperty from "../../applications/useCases/user/findByProperty"
import getUsers from "../../applications/useCases/user/getUsers"

export default function userController(
    userDbRepository,
    userDbRepositoryImpl,
    authServiceImpl,
    authServiceInterface
) {
    const dbRepository = userDbRepository(userDbRepositoryImpl())
    const authService = authServiceInterface(authServiceImpl())

    const fetchUsersByProperty = (req, res, next) => {
        const params = {};
        const response = {};

        // dynamically created query params based on endpoint params
        for (const key in req.query) {
            if (Object.prototype.hasOwnProperty.call(req.query, key)) {
                params[key] = req.query[key];
            }
        }

        // predefined query params (apart from dynamically) for pagination
        params.page = params.page ? parseInt(params.page, 10) : 1;
        params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;

        findByProperty(params, dbRepository)
            .then((users) => {
                response.users = users
                return countAll(params, dbRepository)
            })
            .then((totalItems) => {
                response.totalItems = totalItems;
                response.totalPages = Math.ceil(totalItems / params.perPage)
                response.itemsPerPage = params.perPage;
                return res.json(response);
            })
            .catch((error) => next(error))
    }
    const fetchUserById = (req, res, next) => {
        findById(req.params.id, dbRepository)
            .then((user) => res.json(user))
            .catch((error) => next(error))
    }

    const addNewUser = (req, res, next) => {
        const { username, password, email, role, createdAt } = req.body

        addUser(
            username,
            password,
            email,
            role,
            createdAt,
            dbRepository,
            authService
            )
            .then((user) => res.json(user))
            .catch((error) => next(error))
    }

    const findAllUsers =(req, res, next) => {
        getUsers(dbRepository)
        .then((users)=> res.json(users))
        .catch((error)=> next(error))
    }

    return {
        fetchUsersByProperty,
        fetchUserById,
        addNewUser,
        findAllUsers
    }
}