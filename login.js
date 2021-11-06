var url = "http://localhost:4004/login"

function loginUser() {
    let jsonEnviar = JSON.stringify({
        email: document.getElementById('txtEmail').value.toLowerCase(),
        password: document.getElementById('txtPassword').value
    });

    fetch(url, {
            method: 'POST',
            body: jsonEnviar,
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(function(response) {
            console.log(response.status + " " + response.ok);

            if (!response.ok) {
                alert("Credenciales incorrectas");
                throw new Error("HTTP status " + response.status);
            }

            return response.json();
        })
        .then(response => procesarLogin(response))
        .catch(err => console.log("Fallo la conexion " + err));
}

const procesarLogin = response => {
    console.log(response)
    sessionStorage.setItem('token', response.token);
    alert("Bienvenido " + response.nombre);
    window.location.href = 'home.html';
}