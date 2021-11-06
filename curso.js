var urlGet = "http://localhost:4004/getCursos"
var urlRegistrar = "http://localhost:4004/registroCurso"
var urlUpdate = "http://localhost:4004/updateCurso"
var urlGetById = "http://localhost:4004/getCursoById"
var urlDelete = "http://localhost:4004/deleteCurso"
var isUpdateCurso = false;

function cargarInformacion() {
    var token = sessionStorage.getItem('token');

    if (token === null || token === '') {
        window.parent.location.href = 'login.html';
    }

    isUpdateCurso = false;

    fetch(urlGet, {
            method: 'POST',
            body: "",
            headers: {
                "Content-type": "application/json",
                "x-access-token": token
            }
        })
        .then(function(response) {
            if (!response.ok) {
                window.parent.location.href = 'login.html';
            }

            return response.json();
        })
        .then(response => procesarCursos(response))
        .catch(err => console.log("Fallo la conexion " + err));
}

const procesarCursos = response => {
    var tablaDinamica = '';

    if (response.length === 0) {
        tablaDinamica = '<h5>No se encontraron registros para el curso</h5>'
    } else {
        tablaDinamica =
            '<table id="tblCursos" class="table table-hover">' +
            '<thead>' +
            '<tr>' +
            '<th>ID</th>' +
            '<th>Nombre Curso</th>' +
            '<th>Descripcion</th>' +
            ' </tr>' +
            '</thead>';

        response.forEach(item => {
            tablaDinamica +=
                '<tbody><tr onclick=' + "'cargarInfoRegistro(this);'" + '>' +
                '<td>' + item.id_curso + '</td>' +
                '<td>' + item.nombre_curso + '</td>' +
                '<td>' + item.descripcion + '</td>' +
                '</tr></tbody>';
        });
        tablaDinamica += '</table>';
    }
    document.getElementById("lblRegistros").innerHTML = tablaDinamica;
}

function registrarCurso() {
    if (isUpdateCurso) {
        updateRegistro();
        return;
    }
    var token = sessionStorage.getItem('token');

    if (token === null || token === '') {
        window.parent.location.href = 'login.html';
    }

    let jsonEnviar = JSON.stringify({
        id_curso: document.getElementById("txtId").value,
        nombre_curso: document.getElementById("txtNombre").value,
        descripcion: document.getElementById("txtDescripcion").value,
    });

    fetch(urlRegistrar, {
            method: 'POST',
            body: jsonEnviar,
            headers: {
                "Content-type": "application/json",
                "x-access-token": token
            }
        })
        .then(function(response) {
            if (!response.ok) {
                window.parent.location.href = 'login.html';
            }

            return response.json();
        })
        .then(() => {
            alert('Curso creado con exito');
            cargarInformacion();
            $('#myModal').modal('hide');
        })
        .catch(err => {
            console.log(err);
        });
}

function cargarInfoRegistro(row) {
    var idCurso = document.getElementById("tblCursos").rows[row.rowIndex].cells;
    idCurso = idCurso[0].innerHTML;

    var token = sessionStorage.getItem('token');

    if (token === null || token === '') {
        window.parent.location.href = 'login.html';
    }

    let jsonEnviarID = JSON.stringify({
        id_curso: idCurso
    });

    console.log(jsonEnviarID)

    fetch(urlGetById, {
            method: 'POST',
            body: jsonEnviarID,
            headers: {
                "Content-type": "application/json",
                "x-access-token": token
            }
        })
        .then(function(response) {
            if (!response.ok) {
                window.parent.location.href = 'login.html';
            }

            return response.json();
        })
        .then(response => {
            document.getElementById("txtId").value = response.id_curso;
            document.getElementById("txtNombre").value = response.nombre_curso;
            document.getElementById("txtDescripcion").value = response.descripcion;

            $('#myModal').modal('show');
        });

    isUpdateCurso = true;
};

function updateRegistro() {
    var token = sessionStorage.getItem('token');

    if (token === null || token === '') {
        window.parent.location.href = 'login.html';
    }

    let jsonEnviar = JSON.stringify({
        id_curso: document.getElementById("txtId").value,
        nombre_curso: document.getElementById("txtNombre").value,
        descripcion: document.getElementById("txtDescripcion").value,
    });

    fetch(urlUpdate, {
            method: 'POST',
            body: jsonEnviar,
            headers: {
                "Content-type": "application/json",
                "x-access-token": token
            }
        })
        .then(function(response) {
            if (!response.ok) {
                window.parent.location.href = 'login.html';
            }

            return response.json();
        })
        .then(() => {
            alert('Curso actualizado con exito');
            cargarInformacion();
            $('#myModal').modal('hide');
        })
        .catch(err => {
            console.log(err);
        });
};

function eliminarCurso() {
    var token = sessionStorage.getItem('token');

    if (token === null || token === '') {
        window.parent.location.href = 'login.html';
    }

    let jsonEnviar = JSON.stringify({
        id_curso: document.getElementById("txtId").value
    });

    fetch(urlDelete, {
            method: 'POST',
            body: jsonEnviar,
            headers: {
                "Content-type": "application/json",
                "x-access-token": token
            }
        })
        .then(function(response) {
            if (!response.ok) {
                window.parent.location.href = 'login.html';
            }

            return response.json();
        })
        .then(() => {
            alert('Curso eliminado con exito');
            cargarInformacion();
            $('#myModal').modal('hide');
        })
        .catch(err => {
            console.log(err);
        });
};