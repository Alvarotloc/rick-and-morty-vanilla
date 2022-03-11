"use strict";
window.addEventListener("load",() => {
    const contenedor = document.querySelector(".cards")
    const flechas = document.querySelectorAll(".pagina p");
    const numero = document.querySelector(".numero");
    const modal = document.querySelector(".modal");
    const header = document.querySelector("header");
    const modificadorHeader = document.querySelector(".headerResponsive");
    const derecha = document.querySelector(".mas");
    const izquierda = document.querySelector(".menos");
    let indicador = 1;

    modal.addEventListener("click",function(){
        this.innerHTML = "";
        this.classList.add("invisible");
    });

    modificadorHeader.addEventListener("click",function(){
        header.classList.toggle("visible");
        document.querySelector("span:nth-child(2)").classList.toggle("invisible");
        document.querySelector("span:first-child").classList.toggle("negativo");
        document.querySelector("span:last-child").classList.toggle("positivo");
    });

    class Card{
        constructor(id,nombre,especie,estado,urlImagen){
            this.id = id;
            this.nombre = nombre;
            this.especie = especie;
            this.estado = estado;
            this.elemento = null;
            this.url = urlImagen;
            this.crearCard();
        }
        crearCard(){
            this.elemento = document.createElement("div");
            this.elemento.className = "card";

            let imagen = document.createElement("img");
            imagen.setAttribute("src",this.url);

            let nombre = document.createElement("h3");
            nombre.className = "nombre";
            nombre.innerHTML = this.nombre;

            let especie = document.createElement("p");
            especie.className = "especie";
            especie.innerHTML = `Especie: ${this.especie}`;

            let estado = document.createElement("p");
            estado.className = "estado";
            estado.innerHTML = `Estado: ${this.estado}`;

            let boton = document.createElement("button");
            boton.className = "boton";
            boton.innerHTML = "Leer más";
            boton.addEventListener("click",() => {
                modal.classList.remove("invisible");
                crear(this.id);
            });

            this.elemento.appendChild(imagen);
            this.elemento.appendChild(nombre);
            this.elemento.appendChild(especie);
            this.elemento.appendChild(estado);
            this.elemento.appendChild(boton);

            contenedor.appendChild(this.elemento);
        }
    }
    class Personaje{
        constructor(nombre,estado,genero,localizacion,origen,especie,url){
            this.nombre = nombre;
            this.especie = especie;
            this.estado = estado; 
            this.genero = genero; 
            this.localizacion = localizacion; 
            this.origen = origen; 
            this.url = url;
            this.crearPersonaje();
        }
        crearPersonaje(){
            let container = document.createElement("section");
            container.className = "personaje"; 

            let imagen = document.createElement("img");
            imagen.setAttribute("src",this.url);

            let contenedor = document.createElement("section");
            contenedor.className = "informacion";

            let nombre = document.createElement("h2");
            nombre.innerHTML = `Nombre: ${this.nombre}`
            
            let estatus = document.createElement("h4");
            estatus.innerHTML = `Estatus: ${this.estado}`
            
            let genero = document.createElement("h4");
            genero.innerHTML = `Genero: ${this.genero}`

            let localizacion = document.createElement("h4");
            localizacion.innerHTML = `Localizacion: ${this.localizacion}`

            let origen = document.createElement("h4");
            origen.innerHTML = `Origen: ${this.origen}`

            let especie = document.createElement("h4");
            especie.innerHTML = `Especie: ${this.especie}`

            container.appendChild(imagen);
            contenedor.appendChild(nombre);
            contenedor.appendChild(estatus);
            contenedor.appendChild(genero);
            contenedor.appendChild(localizacion);
            contenedor.appendChild(origen);
            contenedor.appendChild(especie);
            container.appendChild(contenedor);

            modal.appendChild(container);
        }
    }
    function conectarse(indicando){
        fetch(`https://rickandmortyapi.com/api/character?page=${indicando}`)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            respuesta.results.forEach(function(personaje){
                if(personaje.name.length > 12){
                    personaje.name = personaje.name.slice(0,12) + "...";
                }
                if(personaje.species.length > 10){
                    personaje.species = personaje.species.slice(0,10) + "...";
                }
                    new Card(personaje.id,personaje.name,personaje.species,personaje.status,personaje.image);
            });
        });
    }

    function crear(id){
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
                    new Personaje(respuesta.name,respuesta.status,respuesta.gender,respuesta.location.name,respuesta.origin.name,respuesta.species,respuesta.image);
        });
    }

    flechas.forEach(function(flecha,indice){
        flecha.addEventListener("click",function(){
            if(indice === 1){
                indicador++;
                numero.innerHTML = indicador;
                contenedor.innerHTML = "";
                izquierda.classList.remove("invisible");
                comprobador();
                return conectarse(indicador);
            }else if(indice === 0){
                indicador--;
                numero.innerHTML = indicador;
                contenedor.innerHTML = "";
                derecha.classList.remove("invisible");
                comprobador();
                conectarse(indicador);
            }
        });
    });

    function comprobador(){
        if(indicador === 1){
            return izquierda.classList.add("invisible");
        }
        if(indicador === 42){
            return derecha.classList.add("invisible");
        }
    }
    comprobador();
    conectarse(1);
});