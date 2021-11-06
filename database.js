const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log(`Conexion Exitosa a ${MONGO_URI}`);
    }).catch((error) => {
        console.log(`No se pudo conectar a ${MONGO_URI}`);
        console.error(error);
        process.exit(1);
    })
};