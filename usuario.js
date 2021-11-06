var urlGet = "http://localhost:4004/getEstudiantes"
var urlRegistrar = "http://localhost:4004/registro"
var urlUpdate = "http://localhost:4004/updateEstudiante"
var urlGetById = "http://localhost:4004/getEstudianteById"
var urlDelete = "http://localhost:4004/deleteEstudiante"
var isUpdateEstudiante = false;

function abrirModal() {
    document.getElementById("txtId").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtEmail").value = "";

    $('#myModal').modal('show');
};

function cargarInformacion() {
    var token = sessionStorage.getItem('token');

    if (token === null || token === '') {
        window.parent.location.href = 'login.html';
    }

    isUpdateEstudiante = false;

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
        .then(response => procesarUsuarios(response))
        .catch(err => console.log("Fallo la conexion " + err));
}

const procesarUsuarios = response => {
    var tablaDinamica = '';

    if (response.length === 0) {
        tablaDinamica = '<h5>No se encontraron registros para el curso</h5>'
    } else {
        tablaDinamica =
            '<table id="tblUsuarios" class="table table-hover">' +
            '<thead>' +
            '<tr>' +
            '<th>ID</th>' +
            '<th>Nombre Estudiante</th>' +
            '<th>Email</th>' +
            '<th>Dispibilidad</th>' +
            '<th>Ultima Conexion</th>' +
            ' </tr>' +
            '</thead>';

        response.forEach(item => {
            tablaDinamica +=
                '<tbody><tr onclick=' + "'cargarInfoRegistro(this);'" + '>' +
                '<td>' + item.id_estudiante + '</td>' +
                '<td>' + item.nombre + " " + item.apellido + '</td>' +
                '<td>' + item.email + '</td>' +
                '<td>' + item.disponibilidad + '</td>' +
                '<td>' + item.ultima_conexion + '</td>' +
                '</tr></tbody>';
        });
        tablaDinamica += '</table>';
    }
    document.getElementById("lblRegistros").innerHTML = tablaDinamica;
}

function registrarEstudiante() {
    if (isUpdateEstudiante) {
        updateRegistro();
        return;
    }
    var token = sessionStorage.getItem('token');

    if (token === null || token === '') {
        window.parent.location.href = 'login.html';
    }

    let jsonEnviar = JSON.stringify({
        id_estudiante: document.getElementById("txtId").value,
        nombre: document.getElementById("txtNombre").value,
        apellido: document.getElementById("txtApellido").value,
        email: document.getElementById('txtEmail').value,
        password: "123",
        disponibilidad: document.getElementById('ddlDisponibilidad').value
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
            alert('Estudiante registrado con exito');
            cargarInformacion();
            $('#myModal').modal('hide');
        })
        .catch(err => {
            console.log(err);
        });
}

function cargarInfoRegistro(row) {
    var carne = document.getElementById("tblUsuarios").rows[row.rowIndex].cells;
    carne = carne[0].innerHTML;

    var token = sessionStorage.getItem('token');

    if (token === null || token === '') {
        window.parent.location.href = 'login.html';
    }

    let jsonEnviarID = JSON.stringify({
        id_estudiante: carne
    });

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
            document.getElementById("txtId").value = response.id_estudiante;
            document.getElementById("txtNombre").value = response.nombre;
            document.getElementById("txtApellido").value = response.apellido;
            document.getElementById("txtEmail").value = response.email;
            document.getElementById("ddlDisponibilidad").value = response.disponibilidad;

            $('#myModal').modal('show');
        })
        .catch(err => {
            console.log(err);
        });

    isUpdateEstudiante = true;
};

function updateRegistro() {
    var token = sessionStorage.getItem('token');

    if (token === null || token === '') {
        window.parent.location.href = 'login.html';
    }

    let jsonEnviar = JSON.stringify({
        id_estudiante: document.getElementById("txtId").value,
        nombre: document.getElementById("txtNombre").value,
        apellido: document.getElementById("txtApellido").value,
        email: document.getElementById('txtEmail').value,
        password: "123",
        disponibilidad: document.getElementById('ddlDisponibilidad').value
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
            alert('Estudiante actualizado con exito');
            cargarInformacion();
            $('#myModal').modal('hide');
        })
        .catch(err => {
            console.log(err);
        });
};

function eliminarEstudiante() {
    var token = sessionStorage.getItem('token');

    if (token === null || token === '') {
        window.parent.location.href = 'login.html';
    }

    let jsonEnviar = JSON.stringify({
        id_estudiante: document.getElementById("txtId").value,
        email: document.getElementById('txtEmail').value
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
            alert('Estudiante eliminado con exito');
            cargarInformacion();
            $('#myModal').modal('hide');
        })
        .catch(err => {
            console.log(err);
        });
};