const config = {
    production: {
        SECRET: process.env.SECRET,
        SALT: process.env.SALT,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: 'super-secret',
        SALT: 10,
        DATABASE: 'mongodb://localhost:27017/lucytech?retryWrites=false&replicaSet=rs0'
    }
}


exports.get = function get(env) {
    console.log(`environment: ${env}`)
    return config[env] || config.default
}