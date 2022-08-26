const txtPelicula = document.getElementById("txtPelicula");
const tblPeliculas = document.getElementById("tblPeliculas");

let peliculas = (localStorage.getItem("peliculas")) ? JSON.parse(localStorage.getItem("peliculas")) : [];


mostrarPeliculas();

function guardar() {
    const pelicula = txtPelicula.value;
    peliculas.push(pelicula);
    actualizarStorage();
    txtPelicula.value = "";
}

function actualizarStorage() {
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    mostrarPeliculas();
}

function mostrarPeliculas() {
    if (peliculas.length === 0) {
        tblPeliculas.innerHTML = `<tr><td colspan="2" class="text-center font-weight-bold">No hay registros</td></tr>`;
    } else {
        tblPeliculas.innerHTML = "";
        for (const pelicula of peliculas) {
            const tr = document.createElement("tr");
            tr.classList.add("text-center");

            const tdPelicula = document.createElement("td");
            tdPelicula.innerText = pelicula;
            tr.appendChild(tdPelicula);

            const tdAcciones = document.createElement("td");

            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("btn", "btn-danger");
            btnEliminar.innerText = "Eliminar";
            btnEliminar.onclick = () => eliminar(pelicula);
            tdAcciones.appendChild(btnEliminar);

            const btnEditar = document.createElement("button");
            btnEditar.classList.add("btn", "btn-warning", "ml-2");
            btnEditar.innerText = "Editar";
            btnEditar.onclick = () => editar(pelicula);
            tdAcciones.appendChild(btnEditar);
            tr.appendChild(tdAcciones);

            tblPeliculas.appendChild(tr);
        }
    }

}

function eliminar(pelicula) {
    const index = peliculas.indexOf(pelicula);
    peliculas.splice(index, 1);
    actualizarStorage();
}

function editar(pelicula) {
    const index = peliculas.indexOf(pelicula);
    const nuevo_nombre_pelicula = prompt(`Escribe el nuevo nombre para ${pelicula}`);
    peliculas[index] = nuevo_nombre_pelicula;
    actualizarStorage();
}


txtPelicula.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        guardar();
    }
});