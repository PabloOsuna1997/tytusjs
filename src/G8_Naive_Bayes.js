// Ingrese los encabezados de los parametros
// Ingrese los valores de los encabezados (Sig=continue; No=fin)
var atributos = new Array(
    new Array("Outlook",    "Temperature",  "Humidity", "Windy",    "Class"),   // Usuario
    new Array("sunny",      "hot",          "high",     "false",    "N"),
    new Array("sunny",      "hot",          "high",     "true",     "N"),
    new Array("overcast",   "hot",          "high",     "false",    "P"),
    new Array("rain",       "mild",         "high",     "false",    "P"),
    new Array("rain",       "cool",         "normal",   "false",    "P"),
    new Array("rain",       "cool",         "normal",   "true",     "N"),
    new Array("overcast",   "cool",         "normal",   "true",     "P"),
    new Array("sunny",      "mild",         "high",     "false",    "N"),
    new Array("sunny",      "cool",         "normal",   "false",    "P"),
    new Array("rain",       "mild",         "normal",   "false",    "P"),
    new Array("sunny",      "mild",         "normal",   "true",     "P"),
    new Array("overcast",   "mild",         "high",     "true",     "P"),
    new Array("overcast",   "hot",          "normal",   "false",    "P"),
    new Array("rain",       "mild",         "high",     "true",     "N")
);
// Ingrese la condicion
var condicion = new Array("sunny", "hot", "high", "false");             // Usuario
// Ingrese la condicion de ganar
var varGanar = "P";                                                     // Usuario
// Ingrese la condicion de no ganar
var varPerder = "N";                                                    // Usuario
var totalGanar = 0;
var totalPerder = 0;
var total = 0

function cantidad(varClass){
    let contador = 0;
    for(let x=1; x<atributos.length; x++){
        if(varClass == atributos[x][atributos[0].length-1]){
            contador++;
        }
    }
    return contador;
}
function probabilidad(varClass){
    let cantidadGanar = new Array();
    let cantidadTotal = new Array();
    let probabilidad = new Array();
    for(let x=0; x<condicion.length; x++){
        let cond = condicion[x];
        let cantGanar = 0;
        let cantTotal = 0;
        for(let y=0; y<atributos.length; y++){
            for(let z=0; z<atributos[y].length; z++){
                if(cond == atributos[y][z]){
                    if(varClass == atributos[y][atributos[0].length-1]){
                        cantGanar++;
                    }
                    cantTotal++;
                }
            }
        }
        cantidadGanar[x] = cantGanar;
        cantidadTotal[x] = cantTotal;
    }
    
    let cantidad = totalPerder;   // Cantidad total de ganar o perder, segun lo que se pida
    if(varClass==varGanar){
        cantidad = totalGanar;
    }
    for(let x=0; x<cantidadTotal.length; x++){
        let cantGanar = cantidadGanar[x];
        let cantTotal = cantidadTotal[x];
        let probabili = (cantGanar/cantTotal) * (cantTotal/total) / (cantidad/total);
        probabilidad[x] = probabili;
    }

    return probabilidad;
}

function ganar(){
    let probabilidades = probabilidad(varGanar);
    let probabilidadTotal = totalGanar/total;
    for(let x=0; x<probabilidades.length; x++){
        probabilidadTotal *= probabilidades[x];
    }
    return probabilidadTotal;
}

function perder(){
    let probabilidades = probabilidad(varPerder);
    let probabilidadTotal = totalPerder/total;
    for(let x=0; x<probabilidades.length; x++){
        probabilidadTotal *= probabilidades[x];
    }
    return probabilidadTotal;
}

function imprimirTabla(pg, png){
    var tab = document.createElement("table")
    tab.style.border = "groove";
    tab.id = "tab123";
    var z=0;
    for(let x=0; x<atributos.length; x++){
        var tr = document.createElement("tr")
        var td = document.createElement("td")
        td.style.border = "groove";
        var p2 = document.createTextNode("");
        if(z!=0){
            p2 = document.createTextNode(z)
        }
        z++;
        td.appendChild(p2);
        tr.appendChild(td);
        for(let y=0; y<atributos[0].length; y++){
            var td = document.createElement("td")
            td.style.border = "groove";
            var p2 = document.createTextNode(atributos[x][y])
            td.appendChild(p2);
            tr.appendChild(td);
        }
        tab.appendChild(tr);
    }
    document.getElementById("salida").appendChild(tab);
    var p3 = document.createTextNode(pg)
    var p4 = document.createTextNode(png)
    document.getElementById("salida2").appendChild(p3);
    document.getElementById("salida3").appendChild(p4);
}

function inicio(){
    totalGanar = cantidad(varGanar);
    totalPerder = cantidad(varPerder);
    total = totalGanar + totalPerder;
    let probabilidadGanar = ganar();
    let probabilidadPerder = perder();

    imprimirTabla(probabilidadGanar, probabilidadPerder)
    var p1 = document.createTextNode("")
    var p2 = document.createTextNode(condicion)

    if(probabilidadGanar>probabilidadPerder){
        console.log("Ganar");
        p1 = document.createTextNode("Ganar")
    }else{
        console.log("No ganar");
        p1 = document.createTextNode("No ganar")
    }
    document.getElementById("salida4").appendChild(p1);
    document.getElementById("salida1").appendChild(p2);
}

function cambioCondicion(){
    var msj = prompt("Escrite la condicion separadas por coma y sin espacio","");
    condicion = msj;
    var tab = document.getElementById("tab123")
    document.getElementById("salida").removeChild(tab);
    inicio()
}

inicio();