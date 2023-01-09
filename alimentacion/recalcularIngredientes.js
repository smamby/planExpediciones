function recalcularIngredientes(){
    encontrarItemsRec(tablaPlatosYDias);
    sumarItemsIgualesRec(tablaPlatosYDias);   
    console.log("listaFinalRec",listaFinalRec);
    console.log("ingrdientesDeCena", ingredientesDeCenas);
    corregirListaIngCena();
}
var itemsRec = [];
function encontrarItemsRec(lista) {
    itemsRec = [];
    let itemsList = [];
    itemsList = lista.map(el=> el.plato);
    console.log("itemList",itemsList);
    itemsList.forEach(item => {
        if(!itemsRec.includes(item)){
            itemsRec.push(item);
        };
    });
    console.log(itemsRec);
};
var listaFinalRec = [];
var platoListaFinalRec = [];
function sumarItemsIgualesRec(lista){
    listaFinalRec = [];
    platoListaFinalRec = [];
    for (let item of itemsRec){
        for(let elemento of lista) {
            if(item === elemento.plato){
                if(!platoListaFinalRec.includes(item)){
                    platoListaFinalRec.push(item);
                    listaFinalRec.push(elemento);
                } else {
                    listaFinalRec[listaFinalRec.length-1].diasRepet += elemento.diasRepet;
                };
            };
        };   
    };
};
var tempPNombre = "";
var tempDiasPlato = 0;
function corregirListaIngCena(){
    tempDiasPlato = 0;
    var ingRep = 0;
    for (let elem of listaFinalRec) {
        let elePlato = elem.plato;
        let eleDias = elem.diasRepet;
        console.log("nombreP",elePlato,"diasP",eleDias);
        for(let ing of ingredientesDeCenas){
            if(elePlato === ing.plato){
                ingRep = eleDias;
                ing.diasRepet = eleDias;
                ing.comidasComp = ing.diasRepet+" de "+(cenas/integrantes);
                console.log("ing",ing);
            }
        }
    }
    document.getElementById('cantidadCenas').value = ingRep;
    imprimirListaIngredientes(ingredientesDeCenas); 
    let tempPlatoNombre=document.getElementById('plato').value;
    let tempBuscarPlatoEnTabla= 0;  
        for(i of nuevaTabla){
            if(i.plato===tempPlatoNombre){
                tempBuscarPlatoEnTabla=i.diasRepet;
            }
        };
    
    tablaPlatosYDias=[...nuevaTabla];
    impMenu(tablaPlatosYDias);
    borrarIngredientesCena();
    listasDeCompras();
    limpiarPlatoInputsinPreguntar();
    tempDiasPlato = tempBuscarPlatoEnTabla;
    tempPNombre = tempPlatoNombre;
    document.getElementById('plato').value=tempPlatoNombre;
    document.getElementById('cantidadCenas').value=tempBuscarPlatoEnTabla;
}
function impMenu(lista){
    var menu = lista;
    var tBodyMenu = document.querySelector("#tabMenu tbody");
    var platoNombre = document.getElementById('plato').value;
    var diasPlato = parseInt(document.getElementById('cantidadCenas').value);
    var integrantes = document.getElementById('integrantes').value;
    tBodyMenu.innerHTML = "";
    for (i=0; i<menu.length; i++) {        
        console.log("menu[i]",menu[i]);
        console.log("menu",menu);
        console.log("lista",lista);
        var row = tBodyMenu.insertRow(i)
        var platoMenuCell = row.insertCell(0);
        var diasMenu = row.insertCell(1);
        var porcionesMenu = row.insertCell(2);
        platoMenuCell.innerHTML = lista[i].plato;
        diasMenu.innerHTML = lista[i].diasRepet;
        porcionesMenu.innerHTML = lista[i].diasRepet*integrantes;
        tBodyMenu.appendChild(row);
    };  
}