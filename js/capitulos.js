"use strict";
window.addEventListener("load",() => {
    const contenedor = document.querySelector(".capitulos");
    const flechas = document.querySelectorAll(".pagina p");
    const numero = document.querySelector(".numero");
    let indicador = 1;

    class Capitulo{
        constructor(nombre,episodio,airDate,personajes){
            this.nombre = nombre;
            this.episodio = episodio;
            this.fecha = airDate;
            this.personajes = personajes;
            this.crearEpisodio();
        }
        crearEpisodio(){
            let capitulo = document.createElement("div");
            capitulo.className = "capitulo";

            let top = document.createElement("section");
            top.className = "top";

            let nombre = document.createElement("h3");
            nombre.innerHTML = `Capítulo ${this.episodio}: ${this.nombre}`;

            let nombresPersonajes = document.createElement("h3");
            nombresPersonajes.innerHTML = "Nombres: ";
            nombresPersonajes.classList.add("invisible","nombres");

            let abridor = document.createElement("div");
            abridor.classList.add("abre");
            abridor.innerHTML = "<";
            abridor.addEventListener("click",() => {
                abridor.classList.add("invisible");
                cerrar.classList.remove("invisible");
                fecha.classList.remove("invisible");
                nombresPersonajes.classList.remove("invisible");
                if(nombresPersonajes.innerHTML === "Nombres: " ){
                    this.personajes.forEach((personaje, index) => {
                        fetch(personaje)
                        .then(respuesta => respuesta.json())
                        .then(respuesta => nombresPersonajes.innerHTML += respuesta.name + (this.personajes.length - 1 === index ? "." : ", "))
                    });
                }
            });

            let cerrar = document.createElement("div");
            cerrar.classList.add("cierra","invisible");
            cerrar.innerHTML = "X";
            cerrar.addEventListener("click",function(){
                this.classList.add("invisible");
                abridor.classList.remove("invisible");
                fecha.classList.add("invisible");
                nombresPersonajes.classList.add("invisible");
            });

            let fecha = document.createElement("h3");
            fecha.innerHTML = `Fecha de estreno: ${this.fecha}`;
            fecha.classList.add("invisible")

            top.appendChild(nombre);
            top.appendChild(abridor);
            top.appendChild(cerrar);


            capitulo.appendChild(top);
            capitulo.appendChild(fecha)
            capitulo.appendChild(nombresPersonajes)
            // capitulo.appendChild(personajes)
            contenedor.appendChild(capitulo);
        }
    }

    function conectarse(indicando){
        fetch(`https://rickandmortyapi.com/api/episode?page=${indicando}`)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            respuesta.results.forEach(function(capitulo){
                new Capitulo(capitulo.name,capitulo.episode,capitulo.air_date,capitulo.characters);
            });
        });
    }

    flechas.forEach(function(flecha,indice){
        flecha.addEventListener("click",function(){
            if(indice === 1){
                indicador++;
                if(indicador === 4){
                    indicador = 3;
                }
                numero.innerHTML = indicador;
                contenedor.innerHTML = "";
                return conectarse(indicador);
            }else if(indice === 0){
                indicador--;
                if(indicador === 0){
                    indicador = 1;
                }
                numero.innerHTML = indicador;
                contenedor.innerHTML = "";
                conectarse(indicador);
            }
        });
    });

    conectarse(1)




});