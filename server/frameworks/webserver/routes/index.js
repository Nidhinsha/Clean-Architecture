import userRouter from "./user"
import authRouter from "./auth"
import postRouter from "./post"

export default function routes(app, express) {
    app.use('/api/users', userRouter(express))
    app.use('/api/posts',postRouter(express))
}