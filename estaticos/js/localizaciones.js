"use strict";
window.addEventListener("load",() => {
    const flechas = document.querySelectorAll(".pagina p");
    const numero = document.querySelector(".numero");
    const contenedor = document.querySelector(".localizaciones");
    const header = document.querySelector("header");
    const modificadorHeader = document.querySelector(".headerResponsive");
    let indicador = 1;

    modificadorHeader.addEventListener("click",function(){
        header.classList.toggle("visible");
        document.querySelector("span:nth-child(2)").classList.toggle("invisible");
        document.querySelector("span:first-child").classList.toggle("negativo");
        document.querySelector("span:last-child").classList.toggle("positivo");
    });

    class Localizacion {
        constructor(dimension,nombre,tipo,residentes){
            this.dimension = dimension;
            this.nombre = nombre;
            this.tipo = tipo;
            this.residentes = residentes;
            this.crearLocalizacion();
        }
        crearLocalizacion(){
            let ids = [];

            this.residentes.forEach((residente) => {
                ids.push(residente.split("/").pop());
            });
            if(ids.length > 10){
                ids = ids.splice(0,10);
            }

            let container = document.createElement("div");
            container.className = "localizacion";

            let nombre = document.createElement("h3");
            nombre.innerHTML = "Nombre localizacion: " + this.nombre;

            let dimension = document.createElement("h4");
            dimension.innerHTML = "Dimension: " + this.dimension;

            let tipo = document.createElement("h4");
            tipo.innerHTML = "Tipo: " + this.tipo;
            
            let residents = document.createElement("h4");
            residents.innerHTML = "Residentes: ";

            if(this.residentes.length > 15){
                this.residentes = this.residentes.splice(0,15);
            }else if(this.residentes.length === 0){
                residents.innerHTML = "Residentes: Nobody";
            }

            fetch(`https://rickandmortyapi.com/api/character/${ids}`)
            .then(respuesta => respuesta.json())
            .then(respuesta => {
                if(respuesta.length > 1){
                    return respuesta.forEach(function(personaje,index){
                        residents.innerHTML += personaje.name + (respuesta.length - 1 !== index ? ", " : ".");
                    });
                }
                return residents.innerHTML += respuesta.name + ".";
            });

            container.appendChild(nombre);
            container.appendChild(dimension);
            container.appendChild(tipo);
            container.appendChild(residents);
            contenedor.appendChild(container);
        }
    }

    function conectarse(indicando){
        fetch(`https://rickandmortyapi.com/api/location?page=${indicando}`)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            respuesta.results.forEach(function(localizacion){
                new Localizacion(localizacion.dimension,localizacion.name,localizacion.type,localizacion.residents);
            });
        });
    }

    flechas.forEach(function(flecha,indice){
        flecha.addEventListener("click",function(){
            if(indice === 1){
                indicador++;
                if(indicador === 8){
                    indicador = 7;
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

    conectarse(1);
});