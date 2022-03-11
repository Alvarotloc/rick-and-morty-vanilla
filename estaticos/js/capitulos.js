"use strict";
window.addEventListener("load",() => {
    const contenedor = document.querySelector(".capitulos");
    const flechas = document.querySelectorAll(".pagina p");
    const numero = document.querySelector(".numero");
    const header = document.querySelector("header");
    const modificadorHeader = document.querySelector(".headerResponsive");
    const derecha = document.querySelector(".mas");
    const izquierda = document.querySelector(".menos");
    let indicador = 1;

    modificadorHeader.addEventListener("click",function(){
        header.classList.toggle("visible");
        document.querySelector("span:nth-child(2)").classList.toggle("invisible");
        document.querySelector("span:first-child").classList.toggle("negativo");
        document.querySelector("span:last-child").classList.toggle("positivo");
    });

    class Capitulo{
        constructor(nombre,episodio,airDate,personajes){
            this.nombre = nombre;
            this.episodio = episodio;
            this.fecha = airDate;
            this.personajes = personajes;
            this.crearEpisodio();
        }
        crearEpisodio(){
            let ids = [];

            this.personajes.forEach((residente) => {
                ids.push(residente.split("/").pop());
            });
            if(ids.length > 10){
                ids = ids.splice(0,10);
            }

            let capitulo = document.createElement("div");
            capitulo.className = "capitulo";

            let top = document.createElement("section");
            top.className = "top";

            let nombre = document.createElement("h3");
            nombre.innerHTML = `Capítulo ${this.episodio}: ${this.nombre}`;

            let nombresPersonajes = document.createElement("h3");
            nombresPersonajes.innerHTML = "Nombres: ";
            nombresPersonajes.classList.add("invisible","nombres");

            fetch(`https://rickandmortyapi.com/api/character/${ids}`)
            .then(respuesta => respuesta.json())
            .then(respuesta => {
                if(respuesta.length > 1){
                    return respuesta.forEach(function(personaje,index){
                        nombresPersonajes.innerHTML += personaje.name + (respuesta.length - 1 !== index ? ", " : ".");
                    });
                }
                return nombresPersonajes.innerHTML += respuesta.name + ".";
            });

            let abridor = document.createElement("div");
            abridor.classList.add("abre");
            abridor.innerHTML = "<";
            abridor.addEventListener("click",() => {
                abridor.classList.add("invisible");
                cerrar.classList.remove("invisible");
                fecha.classList.remove("invisible");
                nombresPersonajes.classList.remove("invisible");
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
        if(indicador === 3){
            return derecha.classList.add("invisible");
        }
    }
    comprobador();
    conectarse(1);

});