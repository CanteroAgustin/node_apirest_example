window.onload = function () {
    CargarGrilla();
}

function Borrar(indice) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaBorrar;
    xhr.open('DELETE', 'http://localhost:3000/api/clients/'+indice, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}

function Modificar(indice) {
    document.getElementById('indiceModificar').value = indice;
    ModificarPersona(indice);
}

function ModificarPersona(indice){
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var genero = document.getElementsByName("genero");
    for(var i=0;i<genero.length;i++)
    {
        if(genero[i].checked)
            var genderSelected = genero[i].value;
            genero[i].checked = false;
    }
    if(nombre==""){
        nombre = document.getElementById(indice);
    }
    var data = 'name=' + encodeURIComponent(nombre) + '&email=' + encodeURIComponent(email) + '&genre=' + encodeURIComponent(genderSelected);
    document.getElementById('nombre').value = "";
    document.getElementById('email').value = "";
    radiobtn = document.getElementById("male");
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaModificar;
    var ruta = 'http://localhost:3000/api/clients/'+indice;
    xhr.open('PUT', 'http://localhost:3000/api/clients/'+indice, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
}

function CargarGrilla() {
    var cuerpo = document.getElementById('tbody');
    cuerpo.innerHTML = "";
    traerPersonas();

}
function guardar() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var genero = document.getElementsByName("genero");
    for(var i=0;i<genero.length;i++)
    {
        if(genero[i].checked)
            var genderSelected = genero[i].value;
            genero[i].checked = false;
    }
    document.getElementById('nombre').value = "";
    document.getElementById('email').value = "";
    radiobtn = document.getElementById("male");
    agregarPersonas(nombre, email, genderSelected);
}

function agregarPersonas(nombre, email, genero) {
    var data = 'name=' + encodeURIComponent(nombre) + '&email=' + encodeURIComponent(email) + '&genre=' + encodeURIComponent(genero);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaAgregar;
    xhr.open('POST', 'http://localhost:3000/api/clients', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
}

function traerPersona(indice) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaTraerPersona;
    xhr.open('GET', 'http://localhost:3000/traerpersona?indice=' + indice, true);
    xhr.send();
}

function traerPersonas() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaTraerPersonas;
    xhr.open('GET', 'http://localhost:3000/api/clients/', true);
    xhr.send();
}

function gestionarRespuestaTraerPersonas() {

    var div = document.getElementById('tbody');

    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var personas = JSON.parse(xhr.responseText);
            armarTablaPersonas(personas);
        } else {
            div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
        }
    }
}

function armarTablaPersonas(personas){
    var div = document.getElementById('tbody');
    for (i = 0; i < personas.length; i++) {
        var indice = "'"+personas[i]._id+"'";
        var nombre = personas[i].name;
        var email = personas[i].email;
        var genero = personas[i].genre;
        div.innerHTML = div.innerHTML +
            "<tr id=" + nombre + "><td>" + nombre + "</td>" +
            "<td>" + email + "</td>" +
            "<td>" + genero + "</td>" +
            "<td>"+"<button class='btn'"+
            "onClick="+"Borrar("+indice+")"+">Borrar</button><button class='btn' onClick="+"Modificar("+indice+")"+">Modificar</button></td></tr>";
    }
}

function gestionarRespuestaTraerPersona() {

    var div = document.getElementById('tbody');
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var btnGuardar = document.getElementById('btnGuardar');
    var indice = document.getElementById('indiceModificar').value;
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var persona = JSON.parse(xhr.responseText);
            nombre.value = persona.nombre;
            apellido.value = persona.apellido;
            btnGuardar.setAttribute('onclick',"ModificarPersona("+indice+");");
        } else {
            div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
        }
    }
}

function gestionarRespuestaAgregar() {
    var div = document.getElementById('tbody');
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            CargarGrilla();
        }
    } else {
        div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
    }
}

function gestionarRespuestaBorrar() {
    var div = document.getElementById('tbody');
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            CargarGrilla();
        }
    } else {
        div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
    }
}

function gestionarRespuestaModificar() {
    var div = document.getElementById('tbody');
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            CargarGrilla();
        }
    } else {
        div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
    }
}