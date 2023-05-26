export default function connection(mongoose, config) {
    function connectToMongoDB() {
        mongoose.connect(config.mongoDB.uri)
            .then(() => { }, (err) => { console.info(`MongoDB Error`, err); })
            .catch((err) => { console.log(`Error`, err) })
    }

    mongoose.connection.on('connected', () => {
        console.info('Connected to MongoDB');
    })
mongodb://localhost:27017
    mongoose.connection.on('Error', (err) => {
        console.error(`Error in MongoDB Connection : ${err}`);
        mongoose.disconnect()
    })

    return {
        connectToMongoDB
    }
}