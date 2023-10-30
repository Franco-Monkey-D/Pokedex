const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const busquedaInput = document.querySelector("#busqueda-input");
const busquedaBoton = document.querySelector("#busqueda-boton");
const listaBusqueda = document.querySelector("#listaBusqueda");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

// Función para buscar Pokémon por nombre o número
function buscarPokemon() {
    const busqueda = busquedaInput.value.toLowerCase();
    listaBusqueda.innerHTML = "";

 
    if (!busqueda) {
        return;
    }
    if (!isNaN(busqueda)) {
        fetch(URL + busqueda)
            .then((response) => response.json())
            .then(data => mostrarPokemonBusqueda(data))
    } else {
    
        fetch(URL + busqueda.toLowerCase())
            .then((response) => response.json())
            .then(data => mostrarPokemonBusqueda(data))
    }
}

// Función para mostrar los resultados de la búsqueda
function mostrarPokemonBusqueda(poke) {
    if (poke.detail) {
        const div = document.createElement("div");
        div.innerHTML = `<p>No se encontró ningún Pokémon con ese nombre o número.</p>`;
        listaBusqueda.append(div);
    } else {
        const div = document.createElement("div");
        div.classList.add("pokemon");
        let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
        tipos = tipos.join('');
        let pokeId = poke.id.toString();
        if (pokeId.length === 1) {
            pokeId = "00" + pokeId;
        } else if (pokeId.length === 2) {
            pokeId = "0" + pokeId;
        }
        div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
        <div class="nombre-contenedor">
        <p class="pokemon-id">#${pokeId}</p>
        <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
        ${tipos}
        </div>
        <div class="pokemon-stats">
        <p class="stat">${poke.height}m</p>
        <p class="stat">${poke.weight}kg</p>
        </div>
        </div>
        `;
        listaBusqueda.append(div);
        
    }
   
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    
    listaPokemon.innerHTML = "";
    listaBusqueda.innerHTML = "";
    
    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            
            if(botonId === "ver-todos") {
                mostrarPokemon(data);
            } else {
                const tipos = data.types.map(type => type.type.name);
                if (tipos.some(tipo => tipo.includes(botonId))) {
                    mostrarPokemon(data);
                }
            }
            
        })
    }
}))


busquedaBoton.addEventListener("click", buscarPokemon);

