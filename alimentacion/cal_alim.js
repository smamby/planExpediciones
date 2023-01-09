function styleLigth(){
    document.body.classList.toggle('ligth');
    if(document.body.classList=='ligth'){
        document.getElementById("imgBtnTheme").src="./assets/img/btnTheme dark.png"
        document.getElementById("imgHeader").classList='headLigth'
        document.documentElement.style.backgroundColor = "rgb(241, 209, 102)";
    } else {
        document.getElementById("imgBtnTheme").src="./assets/img/btnTheme ligth.png"
        document.getElementById("imgHeader").classList='imgHeader';
        document.documentElement.style.backgroundColor = "rgb(24, 18, 29)";
    };
};

var lugar = "";
var fecha = "";
var diasDescanso = 0;
var diasMarcha = 0;  
var integrantes=1;
var integ = parseInt(integrantes);
var datosExpeCargados=false;
function preArranque() {
    document.getElementById("lugarInput").focus();
}
preArranque();

function arranque(){   
    lugar = document.getElementById("lugarInput").value;
    fecha = document.getElementById("fechaInput").value;
    diasMarcha = document.getElementById('marchas').value;
    diasDescanso = document.getElementById('descanso').value;
    integrantes = parseInt(document.getElementById('integrantes').value);
    console.log(lugar);
    console.log(fecha);

    let m = parseInt(diasMarcha);
    let des = parseInt(diasDescanso);
    var integ = parseInt(integrantes);
    var dias = m+des;
    diasDeDesayuno=dias-1+des;
    diasDeMarcha=m
    var cenasTotales = (m - 1 + (des*2)) * integ;
    cenas = cenasTotales
    console.log(dias);
    console.log(cenasTotales); 
    if (diasDeMarcha > 0){   
        datosExpeCargados=true;
        var impDias = document.getElementById("dias");
        impDias.innerHTML = ':  '+dias;
        var impComYPorc = document.getElementById("comidasYPorciones");
        impComYPorc.innerHTML = cenasTotales/integ
            +" comidas por "+integ+" integrantes = "+cenasTotales+" porciones";
        var impDiasMarcha = document.getElementById("labelMarchas");
        impDiasMarcha.innerHTML = diasDeMarcha
            +" dias y "+diasDeMarcha*integ+" porciones";
        var impDesayunos = document.getElementById("labelDesayunos");
        impDesayunos.innerHTML = diasDeDesayuno
            +" dias y "+diasDeDesayuno*integ+" porciones ("+(diasDeDesayuno-1)+" desayunos, "+des+" meriendas)";
    } else {
        condPlatoCargado();
    };
};

var integrantes = document.getElementById('integrantes').value;
var integ = parseInt(integrantes);
var cenas;
var platosCenas = [];
var cantPlatosCena;
var comidasComputadas=0;
var diasDeDesayuno=0;
var diasDeMarcha=0;
var cargaIngrediente=true;
var platoCargado=false;
var comidasP =[];
var platoNombre="";
var diasPlato=0;
var nuevaTabla=[];

function cargarPlato(){
    if (datosExpeCargados===true) {
        reloadNobraYdiasPlato();        
        nuevaTabla = [...tablaPlatosYDias];
        if(!cargaIngrediente){
            swal.fire({
                title: 'No cargaste ingredientes para el plato anterior',
                color: "rgb(190,150,120)",
                background: "rgb(35, 24, 44)",
                confirmButtonColor: 'rgb(164, 149, 216)',
                didClose: () => {            
                    focus("ingredientesCenas")
                } 
            }); 
            tablaPlatosYDias.pop();            
        } else {
            if(document.getElementById('plato').value!="" 
            && document.getElementById('cantidadCenas').value!=""){        
                cargaIngrediente=false;
                var integrantes = document.getElementById('integrantes').value;
                var integ = parseInt(integrantes);
                
                existePlato();                    
                  
            } else {
                swal.fire({
                    title: '"carga algun plato"',
                    color: "rgb(190,150,120)",
                    background: "rgb(35, 24, 44)",
                    confirmButtonColor: 'rgb(164, 149, 216)',
                    didClose: () => {            
                        focus("plato")
                    } 
                });
            }
        };
    }else {
        condPlatoCargado();
    };
};
function pushPlato(){
    platosCenas.push(platoNombre);   
    var conteoPlatoP={};             
    conteoPlatoP={plato:platoNombre,diasRepet:diasPlato,};
    comidasP.push(conteoPlatoP); 
    console.log("comidasP",comidasP);   
    console.log("platosNombre",platoNombre);
    console.log("platosCenas",platosCenas);
    comidasComputadas += diasPlato; 
    console.log("var comidaComputadas",comidasComputadas);
    platoCargado=true;
    imprimirMenu(tablaPlatosYDias)
}

function saveIngredientes(){
    if(condCargarIngredientesPlato()){
        cargaIngrediente=true;
        if(segundaCondCargaIng()){
            var platoNombre = document.getElementById('plato').value;
            var ingredienteInput = document.getElementById('ingredientesCenas').value;
            var ingUnidadesInput = document.getElementById('unidades').value;
            var ingCantidadInput = document.getElementById('cantidadIngCenas').value;
            var clasifIngCenaInput = document.getElementById('clasificacionIngCenas').value;
            cargarIngDeCena(platoNombre,ingredienteInput,ingUnidadesInput,ingCantidadInput,clasifIngCenaInput);
        };
    };
};

var ingredientesDeCenas = [];

function cargarIngDeCena(iplato,iingrediente,iunidad,icantidad,iclasifIngCenas){    
    var diasPlato = parseInt(document.getElementById('cantidadCenas').value);
    var integrantes = document.getElementById('integrantes').value;
    var integ = parseInt(integrantes);    
    comidasComputadas;
    var nuevoIngrediente = {
        plato : iplato,
        ingrediente : iingrediente,
        clasificacion: iclasifIngCenas,
        unidad : iunidad,
        diasRepet: diasPlato,
        cantidad : icantidad,
        subtotal : 0, 
        comidasComp : (comidasComputadas)+" de "+cenas/integ,        
    };
    console.log("nuevoIngredienteCantidad",nuevoIngrediente.cantidad);
    console.log("nuevoIngredienteSubtotal",nuevoIngrediente.subtotal);
    console.log("nuevoIngredienteInteg",integ);
    console.log("nuevoIngredienteDiasPlato",diasPlato);
   
    ingredientesDeCenas.push(nuevoIngrediente);
    console.log("nuevoIngrediente",nuevoIngrediente);
    nuevoIngrediente = {};
    console.log("nuevoIngredienteCantidad",nuevoIngrediente.cantidad);
    console.log("nuevoIngredienteSubtotal",nuevoIngrediente.subtotal);
    
    limpiarIngredientes();
    console.log("nuevoIngrediente",nuevoIngrediente);
    imprimirListaIngredientes(ingredientesDeCenas);
    console.log("ingredientesDeCenas",ingredientesDeCenas);
    document.getElementById('ingredientesCenas').value = ""; 
    document.getElementById('ingredientesCenas').focus();
}

console.log("platosCenas",platosCenas) 

function imprimirListaIngredientes(lista){
    var listaDeIngredientes = lista 
    var tbody = document.querySelector("#listaDeIngredientes tbody");
    tbody.innerHTML = "";

    for(var i = 0; i < listaDeIngredientes.length; i++){
        var checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.checked=false;        
        checkBox.setAttribute("id",`cena${i}`);
        var row = tbody.insertRow(i);
        var platoCell = row.insertCell(0);
        var ingredienteCell = row.insertCell(1);
        var unidadesCell = row.insertCell(2);
        var cantidadCell = row.insertCell(3);
        var ComidasCompCell = row.insertCell(4);
        var checkboxForDelete = row.insertCell(5);
        
        platoCell.innerHTML = listaDeIngredientes[i].plato;
        ingredienteCell.innerHTML = listaDeIngredientes[i].ingrediente;
        unidadesCell.innerHTML = listaDeIngredientes[i].unidad;
        cantidadCell.innerHTML = listaDeIngredientes[i].cantidad;
        ComidasCompCell.innerHTML = listaDeIngredientes[i].comidasComp;
        checkboxForDelete.appendChild(checkBox);

        tbody.appendChild(row);                     
    };
    listasDeCompras();
};
var tablaPlatosYDias=[];
function imprimirMenu(lista){
    var menu = lista;
    var tBodyMenu = document.querySelector("#tabMenu tbody");
    var platoNombre = document.getElementById('plato').value;
    var diasPlato = parseInt(document.getElementById('cantidadCenas').value);
    var integrantes = document.getElementById('integrantes').value;
    
    if (!isNaN(diasPlato)&&platoNombre!=""){
        var platosYDias = {
            plato : platoNombre,
            diasRepet : diasPlato,
            };
        tablaPlatosYDias.push(platosYDias);
        console.log("tabladiasYPlatos-luego de borrar",tablaPlatosYDias); 
    };
    tBodyMenu.innerHTML = "";
    for (i=0; i<menu.length; i++) {        
        console.log("menu[i]",menu[i]);
        console.log("menu",menu);
        console.log("tablaPlatosYDias",tablaPlatosYDias);
        var row = tBodyMenu.insertRow(i)
        var platoMenuCell = row.insertCell(0);
        var diasMenu = row.insertCell(1);
        var porcionesMenu = row.insertCell(2);
        platoMenuCell.innerHTML = tablaPlatosYDias[i].plato;
        diasMenu.innerHTML = tablaPlatosYDias[i].diasRepet;
        porcionesMenu.innerHTML = tablaPlatosYDias[i].diasRepet*integrantes;
        tBodyMenu.appendChild(row);
    };    
};

function limpiarIngredientes(){
    document.getElementById('ingredientesCenas').value = "";
    document.getElementById('unidades').value = "";
    document.getElementById('cantidadIngCenas').value = "";
    document.getElementById('ingredientesDesayuno').value = "";
    document.getElementById('unidadesDesayuno').value = "";
    document.getElementById('cantidadIngDesayuno').value = "";
    document.getElementById('ingredientesMarchas').value = "";
    document.getElementById('unidadesMarchas').value = "";
    document.getElementById('cantidadIngMarchas').value = "";
}
function limpiarPlatoInput(){
    conf("Seguro queres limpiar?",
    "No limpies si no completaste el plato. Completá todos los ingredientes del plato y luego limpiá para ingresar un nuevo plato. CANCELA PARA NO LIMPIAR.",
    limpiarPlato);    
}
function limpiarPlato(){
    document.getElementById('plato').value = "";
    document.getElementById('cantidadCenas').value = "";
    document.getElementById('plato').focus();
    platoCargado=false;
    cargaIngrediente=true;   
};

function limpiarPlatoInputsinPreguntar(){
    document.getElementById('plato').value = "";
    document.getElementById('cantidadCenas').value = "";
    platoCargado=false;
    cargaIngrediente=true; 
};

//  BORRADO cenas
var menuLuegoBorrar = [];
function borrarIngredientesCena(){
    menuLuegoBorrar.length = 0;
    console.log("ingredientesCena",ingredientesDeCenas);
    var ingCenaBorrar = [];
    var countPlatos = []; 
    for (i=0; i<ingredientesDeCenas.length;i++){        
        if(!document.getElementById(`cena${i}`).checked){
            ingCenaBorrar.push(ingredientesDeCenas[i]);
        };  
    };
    //----------------------------
    countPlatos = ingCenaBorrar.map(el => {
        return el.plato;
    });
    //------------------------
    console.log('countPlatos',countPlatos);
    var comCompParcial = 0;
    var conteoPlatosBorrados = [];
    for (i=0; i<countPlatos.length;i++){        
        if(conteoPlatosBorrados.includes(countPlatos[i])){            
            ingCenaBorrar[i].comidasComp= comCompParcial+" de "+cenas/integ;
        }else {                      
            var platosMenuLuegoDeBorrar = {
                plato:countPlatos[i],
                diasRepet:ingCenaBorrar[i].diasRepet,
            };
            conteoPlatosBorrados.push(countPlatos[i])
            console.log("conteoPlatosBorrados",conteoPlatosBorrados)          
            comCompParcial += ingCenaBorrar[i].diasRepet;
            menuLuegoBorrar.push(platosMenuLuegoDeBorrar);
            var integrantes = document.getElementById('integrantes').value;
            var integ = parseInt(integrantes);             
            ingCenaBorrar[i].comidasComp= comCompParcial+" de "+cenas/integ;            
        };
    };
    comidasComputadas = comCompParcial;
    platosCenas = menuLuegoBorrar.map(el => el.plato);
    limpiarIngredientes();
    limpiarPlatoInputsinPreguntar();  
    ingredientesDeCenas = [...ingCenaBorrar];
    imprimirListaIngredientes(ingredientesDeCenas);
    console.log("menuLuegoBorrar",menuLuegoBorrar);
    tablaPlatosYDias = [...menuLuegoBorrar];
    cargaIngrediente=true;
    imprimirMenu(tablaPlatosYDias);
    listasDeCompras();
};


/// DESAYUNOS

function saveIngredientesDesayuno(){
    if(datosExpeCargados===true){
        var platoNombre = 'Desayuno';
        if (segundaCondCargaIngDes()){
            var ingredienteDesInput = document.getElementById('ingredientesDesayuno').value;
            var ingUnidadesDesInput = document.getElementById('unidadesDesayuno').value;
            var ingCantidadDesInput = document.getElementById('cantidadIngDesayuno').value;
            var clasifIngDesInput = document.getElementById('clasificacionIngDes').value;
            cargarIngDeDesayunos(platoNombre,ingredienteDesInput,ingUnidadesDesInput,ingCantidadDesInput,clasifIngDesInput);
        };
    } else {
        condPlatoCargado()
    };
};

var ingredientesDeDesayuno = [];
var acumuladoDesayuno=0;
function cargarIngDeDesayunos(dplato,dingrediente,dunidad,dcantidad,dclasifIngCenas){    
    var vecesRepiteDesayuno = parseInt(document.getElementById('repiteDesayuno').value);
    var integrantes = document.getElementById('integrantes').value;
    var integ = parseInt(integrantes);   
    acumuladoDesayuno+=vecesRepiteDesayuno;
    var nuevoIngredienteDesayuno = {
        plato : dplato,
        ingrediente : dingrediente,
        clasificacion: dclasifIngCenas,
        unidad : dunidad,
        diasRepet: vecesRepiteDesayuno,
        cantidad : dcantidad,
        subtotal : 0,
        comidasComp : 'NO DATA',
        
    };    
    ingredientesDeDesayuno.push(nuevoIngredienteDesayuno);  
    imprimirListaIngredientesDeDesayunos(ingredientesDeDesayuno);
    console.log("ingredientesDeDesayuno",ingredientesDeDesayuno);      
    document.getElementById('ingredientesDesayuno').value = ""; 
    document.getElementById('ingredientesDesayuno').focus();    
};

// imprimir lista desayunos 
function imprimirListaIngredientesDeDesayunos(lista){
    var listaDeIngredientes = lista //obtenerLista();
    var tbody = document.querySelector("#listaDeIngredientesDesayunos tbody");
    tbody.innerHTML = "";
    
    for(var i = 0; i < listaDeIngredientes.length; i++){
        var checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.checked=false;        
        checkBox.setAttribute("id",`desayunos${i}`);
        var row = tbody.insertRow(i);
        var platoCell = row.insertCell(0);
        var ingredienteCell = row.insertCell(1);
        var unidadesCell = row.insertCell(2);
        var cantidadCell = row.insertCell(3);
        var repiteDes = row.insertCell(4);
        var checkboxForDelete = row.insertCell(5);
        
        
        platoCell.innerHTML = listaDeIngredientes[i].plato;
        ingredienteCell.innerHTML = listaDeIngredientes[i].ingrediente;
        unidadesCell.innerHTML = listaDeIngredientes[i].unidad;
        cantidadCell.innerHTML = listaDeIngredientes[i].cantidad;
        repiteDes.innerHTML = listaDeIngredientes[i].diasRepet;
        checkboxForDelete.append(checkBox);
        console.log("i",i);

        tbody.appendChild(row);               
    };
    listasDeCompras();
};

function borrarIngredientesDesayunos(){
    console.log("ingredientesDeDesayuno",ingredientesDeDesayuno);
    var ingDeDesayunos = ingredientesDeDesayuno;
    var ingDesayunosBorrar = [];
    var newIngDeDesYMar = [];
    for (i=0; i<ingDeDesayunos.length;i++){        
        if(!document.getElementById(`desayunos${i}`).checked){
            ingDesayunosBorrar.push(ingDeDesayunos[i]);
        };  
    };
    ingredientesDeDesayuno = [];
    for (i=0; i<ingDesayunosBorrar.length; i++){
            ingredientesDeDesayuno.push(ingDesayunosBorrar[i]);
    };
    limpiarIngredientes();
    console.log("ingDesayunosBorrar",ingDesayunosBorrar); 
    console.log("ingredientesDeDesayuno",ingredientesDeDesayuno);  
    imprimirListaIngredientesDeDesayunos(ingredientesDeDesayuno);
    listasDeCompras();
};

//MARCHAS

function saveIngredientesMarchas(){
    if(datosExpeCargados===true){
        var platoNombre = 'Marcha';
        if (segundaCondCargaIngMar()){
            var ingredienteMarchInput = document.getElementById('ingredientesMarchas').value;
            var ingUnidadesMarchInput = document.getElementById('unidadesMarchas').value;
            var ingCantidadMarchInput = document.getElementById('cantidadIngMarchas').value;
            var clasifIngMarchInput = document.getElementById('clasificacionIngMarchas').value;
            cargarIngDeMarchas(platoNombre,ingredienteMarchInput,ingUnidadesMarchInput,ingCantidadMarchInput,clasifIngMarchInput);
        };
    } else {
        condPlatoCargado();
    };
};

var ingredientesDeMarchas = [];
var acumuladoMarchas=0;
function cargarIngDeMarchas(dplato,dingrediente,dunidad,dcantidad,dclasifIngCenas){    
    var vecesRepiteMarchas = parseInt(document.getElementById('repiteMarcha').value);
    var integrantes = document.getElementById('integrantes').value;
    var integ = parseInt(integrantes);   
    acumuladoMarchas+=vecesRepiteMarchas;
    var nuevoIngredienteMarchas = {
        plato : dplato,
        ingrediente : dingrediente,
        clasificacion: dclasifIngCenas,
        diasRepet: vecesRepiteMarchas,
        unidad : dunidad,
        cantidad : dcantidad,
        subtotal : 0,
        comidasComp : 'NO DATA',
    };
         ingredientesDeMarchas.push(nuevoIngredienteMarchas);
    
    imprimirListaIngredientesDeMarchas(ingredientesDeMarchas);
    console.log("ingredientesDeMarchas",ingredientesDeMarchas);
    document.getElementById('ingredientesMarchas').value = ""; 
    document.getElementById('ingredientesMarchas').focus();
};

// imprimir lista marchas
function imprimirListaIngredientesDeMarchas(lista){
    var listaDeIngredientes = lista 
    var tbody = document.querySelector("#listaDeIngredientesMarchas tbody");
    tbody.innerHTML = "";
    
    for(var i = 0; i < listaDeIngredientes.length; i++){
        var checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.checked=false;        
        checkBox.setAttribute("id",`marchas${i}`);
        var row = tbody.insertRow(i);
        var platoCell = row.insertCell(0);
        var ingredienteCell = row.insertCell(1);
        var unidadesCell = row.insertCell(2);
        var cantidadCell = row.insertCell(3);
        var repiteDes = row.insertCell(4);
        var checkboxForDelete = row.insertCell(5)
        
        
        platoCell.innerHTML = listaDeIngredientes[i].plato;
        ingredienteCell.innerHTML = listaDeIngredientes[i].ingrediente;
        unidadesCell.innerHTML = listaDeIngredientes[i].unidad;
        cantidadCell.innerHTML = listaDeIngredientes[i].cantidad;
        repiteDes.innerHTML = listaDeIngredientes[i].diasRepet;
        checkboxForDelete.append(checkBox);
        console.log("i",i);

        tbody.appendChild(row);               
    };
    listasDeCompras();
};

function borrarIngredientesMarchas(){
    console.log("ingredientesDeMarchas",ingredientesDeMarchas);
    var ingDeMarchas = ingredientesDeMarchas;
    var ingMarchasBorrar = [];
    var newIngDeMarchas = [];
    for (i=0; i<ingDeMarchas.length;i++){        
        if(!document.getElementById(`marchas${i}`).checked){
            ingMarchasBorrar.push(ingDeMarchas[i]);
        };  
    };
    ingredientesDeMarchas =[];
    for (i=0; i<ingMarchasBorrar.length; i++){
            ingredientesDeMarchas.push(ingMarchasBorrar[i]);
    };
    limpiarIngredientes();
    console.log("ingMarchasBorrar",ingMarchasBorrar); 
    console.log("ingredientesDeMarchas",ingredientesDeMarchas);
    imprimirListaIngredientesDeMarchas(ingredientesDeMarchas);
    listasDeCompras();
};

//compilar listas
console.log('lugar',lugar);
console.log('fecha',fecha);
console.log('cenas',ingredientesDeCenas);
console.log('des',ingredientesDeDesayuno);
console.log('march',ingredientesDeMarchas);

//GUARDAR LISTA
function guardar(lista,nombreLista){
    localStorage.setItem(nombreLista, JSON.stringify(lista));
};
var cargarListaCena = []; 
var cargarListaDesayunos = [];
var cargarListaMarchas = [];
var guardarDataExpe = [];
var cargarListaMenu = [];
var cargarPlatosCenas = [];
var cargarComidasP = [];
var cargarPlatoNombre = '';
var cargarDiasPlato = 0;
var cargarComidasComputadas=0;

function guardarDatosExpe(lg,dt,dM,dD,int){
    guardarDataExpe.splice(0,guardarDataExpe.length);
    guardarDataExpe.push(lg)
    guardarDataExpe.push(dt)
    guardarDataExpe.push(dM)
    guardarDataExpe.push(dD)
    guardarDataExpe.push(int);
    console.log(guardarDataExpe);
};
function guardarTodo(){
    guardarDatosExpe(lugar,fecha,diasMarcha,diasDescanso,integrantes);
    guardar(guardarDataExpe, "dataExpe");
    guardar(ingredientesDeCenas,"cenas");    
    guardar(ingredientesDeDesayuno,"desayunos");
    guardar(ingredientesDeMarchas, "marchas");    
    guardar(tablaPlatosYDias,"tablaMenu");
    guardar(platosCenas, "platosCenas");
    guardar(comidasP, "comidasP");
    guardar(platoNombre, "platoNombreEnMemory");
    guardar(diasPlato, "diasPlatoEnMemory");
    guardar(comidasComputadas, "comidasComputadasEnMemory")
}
function cargarPlatosCenasYComidasP(){
    cargarPlatosCenas = JSON.parse(localStorage.getItem("platosCenas"));
    platosCenas = [...cargarPlatosCenas];
    cargarComidasP = JSON.parse(localStorage.getItem("comidasP"));
    comidasP = [...cargarComidasP];
    cargarPlatoNombre = JSON.parse(localStorage.getItem("platoNombreEnMemory"));
    platoNombre = cargarPlatoNombre;
    cargarDiasPlato = JSON.parse(localStorage.getItem("diasPlatoEnMemory"));
    diasPlato = cargarDiasPlato;
    cargarComidasComputadas = JSON.parse(localStorage.getItem("comidasComputadasEnMemory"));
    comidasComputadas = cargarComidasComputadas;
}
function cargarMenu(){
    cargarListaMenu = JSON.parse(localStorage.getItem("tablaMenu"));
    console.log("cargarListaMenu",cargarListaMenu);
    tablaPlatosYDias =[...cargarListaMenu];
    imprimirMenu(cargarListaMenu);    
}
function cargarCena(){
    cargarListaCena = JSON.parse(localStorage.getItem("cenas"));
    console.log(cargarListaCena);
    imprimirListaIngredientes(cargarListaCena);
    ingredientesDeCenas =[...cargarListaCena];
};
function cargarDesayuno(){
    cargarListaDesayunos = JSON.parse(localStorage.getItem("desayunos"));
    console.log(cargarListaDesayunos);
    imprimirListaIngredientesDeDesayunos(cargarListaDesayunos);
    ingredientesDeDesayuno = [...cargarListaDesayunos];
};
function cargarMarchas(){
    cargarListaMarchas = JSON.parse(localStorage.getItem("marchas"));
    console.log(cargarListaMarchas);
    imprimirListaIngredientesDeMarchas(cargarListaMarchas);
    ingredientesDeMarchas = [...cargarListaMarchas]
};
function cargarDataExpe(){
    guardarDataExpe = JSON.parse(localStorage.getItem("dataExpe"));
    console.log(guardarDataExpe);
    document.getElementById('lugarInput').value = guardarDataExpe[0]
    document.getElementById('fechaInput').value = guardarDataExpe[1]
    document.getElementById('marchas').value = guardarDataExpe[2];
    document.getElementById('descanso').value = guardarDataExpe[3];
    document.getElementById('integrantes').value = guardarDataExpe[4];
    arranque();
}
function cargarTodo(){
    cargarDataExpe();
    cargarCena();
    cargarDesayuno();
    cargarMarchas();    
    cargarMenu();
    listasDeCompras();
    cargarPlatosCenasYComidasP();
    limpiarPlatoInputsinPreguntar();
    cargaIngrediente=true;
    document.getElementById('plato').focus();
}