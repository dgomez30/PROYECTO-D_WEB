var urlCursosAsig = "http://localhost:4004/getCursosAsignados"

function buscarCursos() {
    var token = sessionStorage.getItem('token');

    if (token === null || token === '') {
        window.parent.location.href = 'login.html';
    }

    let jsonEnviar = JSON.stringify({
        id_estudiante: document.getElementById("txtId").value
    });

    fetch(urlCursosAsig, {
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
        .then(response => procesarCursos(response))
        .catch(err => console.log("Fallo la conexion " + err));
}

const procesarCursos = response => {
    var tablaDinamica = '';

    if (response.length === 0) {
        tablaDinamica = '<h5>No se encontraron registros para el curso</h5>'
    } else {
        tablaDinamica =
            '<table class="table table-hover">' +
            '<thead>' +
            '<tr>' +
            '<th>Curso Asignado</th>' +
            '<th>Descripcion Curso</th>' +
            ' </tr>' +
            '</thead>';

        response.forEach(item => {
            tablaDinamica +=
                '<tbody><tr>' +
                '<td>' + item.curso_asignado + '</td>' +
                '<td>' + item.descripcion + '</td>' +
                '</tr></tbody>';
        });
        tablaDinamica += '</table>';
    }

    document.getElementById("lblRegistros").innerHTML = tablaDinamica;
}