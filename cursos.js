const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    id_curso: { type: String },
    nombre_curso: { type: String },
    descripcion: { type: String }
});
module.exports = mongoose.model("cursos", cursoSchema);