export default function serverConfig(server, config) {
    function startServer() {
        return server.listen(config.port, ()=>{
            console.log(`Server Connected On Port :`+config.port);
        })
    }

    return {
        startServer
    }
}