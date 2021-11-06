const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id_estudiante: { type: String, default: null },
    nombre: { type: String, default: null },
    apellido: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String, default: "$2a$10$pwERw9MwzRnvbBfRYrkXB.lLY6uHrn/VCDyv.TPWiFgAz2S97.NlW" },
    disponibilidad: { type: String, default: "SI" },
    ultima_conexion: { type: Date, default: Date.now() },
    token: { type: String },
});

module.exports = mongoose.model("usuarios", userSchema);