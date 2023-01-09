function condPlatoCargado(){    
    swal.fire({
        title: "Carga los dias de expedicion",
        color: "rgb(190,150,120)",
        background: "rgb(35, 24, 44)",
        confirmButtonColor: 'rgb(164, 149, 216)',
        didClose: () => {            
            focus('marchas')
        } 
    });
};

function cargaPreviaFalse(){
    if (datosExpeCargados===false && platoCargado===false){
        swal.fire({
            title: "Carga los dias de expedicion",
            color: "rgb(190,150,120)",
            background: "rgb(35, 24, 44)",
            confirmButtonColor: 'rgb(164, 149, 216)',
            didClose: () => {            
                focus('marchas')
            } 
        });        
    } else if (platoCargado===false) {        
        swal.fire({
            title: "Carga algun plato",
            color: "rgb(190,150,120)",
            background: "rgb(35, 24, 44)",
            confirmButtonColor: 'rgb(164, 149, 216)',
            didClose: () => {            
                focus('plato')
            } 
        });                
    };
};
function reloadNobraYdiasPlato(){
    platoNombre = document.getElementById('plato').value;
    diasPlato = parseInt(document.getElementById('cantidadCenas').value);
}

function retornarVerdadero() {
    return true;
}
function exitePlatoONo(){
    conf("Este plato ya existe",
    "<CONFIRMAR> para agregar mas dias de este menu."+ 
    "<CANCELAR> para solo agragar mas ingredientes",
    retornarVerdadero())
}
function existePlato(){
    if(platosCenas.includes(platoNombre)){
        sweet();
    }else{
        platoCargado=true;
        pushPlato();
    }
    platoCargado=true;
};
function sweet(){
    Swal.fire({
        title: "Este plato ya existe",
        text: "<CONFIRMAR> para agregar mas dias de este menu."+ 
        "<CANCELAR> para solo agragar mas ingredientes",
        icon: 'info',
        showDenyButton: true,
        denyButtonText: 'Cancelar',
        color: "rgb(190,150,120)",
        background: "rgb(35, 24, 44)",
        confirmButtonColor: 'rgb(164, 149, 216)',        
        denyButtonColor: 'rgb(190, 50, 50)',
        confirmButtonText: 'Confirmar',
        didClose: () => {
            focus('ingredientesCenas')
        }           
    }).then((response) => {
        if(response.isConfirmed){
            pushPlato();
            recalcularIngredientes()
            platoCargado=true; 
            cargaIngrediente=false;           
            swal.fire({
                title: `Se aumento la cantidad de veces que repite el menu ${tempPNombre} a ${tempDiasPlato} veces`,
                color: "rgb(190,150,120)",
                background: "rgb(35, 24, 44)",
                confirmButtonColor: 'rgb(164, 149, 216)',
                didClose: () => {            
                    focus("ingredientesCenas")
                } 
            }) 
        } else if (response.isDenied) {
            swal.fire({
                title: `Continua ingresando ingrediantes para el plato: ${platoNombre}`,
                color: "rgb(190,150,120)",
                background: "rgb(35, 24, 44)",
                confirmButtonColor: 'rgb(164, 149, 216)',
                didClose: () => {            
                    focus("ingredientesCenas")
                } 
            }) 
            platoCargado=true;
            buscarYborrarPlatoMenu();
        } else {
            swal.fire({
                title: `Continua ingresando ingrediantes para el plato: ${platoNombre}`,
                color: "rgb(190,150,120)",
                background: "rgb(35, 24, 44)",
                confirmButtonColor: 'rgb(164, 149, 216)',
                didClose: () => {            
                    focus("ingredientesCenas")
                } 
            }) 
            platoCargado=true;
            buscarYborrarPlatoMenu();
        }
    })
}

function buscarYborrarPlatoMenu(){    
    console.log("plato ya existe ANTES", nuevaTabla);
    console.log("plato ya existe ANTES", tablaPlatosYDias);    
    tablaPlatosYDias = [...nuevaTabla];
    cargaIngrediente=true;
    comidasComputadas = comidasComputadas 
}

function condCargarIngredientesPlato() {
    if (platoCargado===true && datosExpeCargados===true
        && document.getElementById('plato').value!="" 
        && document.getElementById('cantidadCenas').value!=""){
        return true;
    } else {        
        cargaPreviaFalse()             
    };
};

function segundaCondCargaIng(){
    var platoNombre = document.getElementById('plato').value;
    var ingredienteInput = document.getElementById('ingredientesCenas').value;
    var ingUnidadesInput = document.getElementById('unidades').value;
    var ingCantidadInput = document.getElementById('cantidadIngCenas').value;

    if (ingredienteInput!='' && ingUnidadesInput!="" && ingCantidadInput>0){
        return true;
    } else {
        swal.fire({
            title: "Completa los datos del ingrediente",
            color: "rgb(190,150,120)",
            background: "rgb(35, 24, 44)",
            confirmButtonColor: 'rgb(164, 149, 216)',
            didClose: () => {            
                focus("ingredientesCenas")
            } 
        });        
    };
};
function segundaCondCargaIngDes(){
    var ingredienteDesInput = document.getElementById('ingredientesDesayuno').value;
    var ingUnidadesDesInput = document.getElementById('unidadesDesayuno').value;
    var ingCantidadDesInput = document.getElementById('cantidadIngDesayuno').value;
    if (ingredienteDesInput!='' && ingUnidadesDesInput!="" && ingCantidadDesInput>0){
        return true;
    } else {
        swal.fire({
            title: "Completa los datos del ingrediente",
            color: "rgb(190,150,120)",
            background: "rgb(35, 24, 44)",
            confirmButtonColor: 'rgb(164, 149, 216)',
            didClose: () => {            
                focus("ingredientesCenas")
            }
        });
    };
};
function segundaCondCargaIngMar(){
    var ingredienteMarchInput = document.getElementById('ingredientesMarchas').value;
    var ingUnidadesMarchInput = document.getElementById('unidadesMarchas').value;
    var ingCantidadMarchInput = document.getElementById('cantidadIngMarchas').value;
    if (ingredienteMarchInput!='' && ingUnidadesMarchInput!="" && ingCantidadMarchInput>0){
        return true;
    } else {
        swal.fire({
            title: "Completa los datos del ingrediente",
            color: "rgb(190,150,120)",
            background: "rgb(35, 24, 44)",
            confirmButtonColor: 'rgb(164, 149, 216)',
            didClose: () => {            
                focus("ingredientesCenas")
            } 
        });
    };
};
function focus(id){
    document.getElementById(id).focus();
}
function conf(titulo,texto,func){
    Swal.fire({
        title: titulo,
        text: texto,
        color: "rgb(190,150,120)",
        background: "rgb(35, 24, 44)",
        confirmButtonColor: 'rgb(164, 149, 216)',
        denyButtonColor: 'rgb(190, 50, 50)',
        showDenyButton: true,
        denyButtonText: 'Cancelar',        
        confirmButtonText: 'Confirmar',
    })
    .then((result) => {
        if (result.isConfirmed) {
            func()            
            swal.fire({
                timer: 1,
                didClose: () => {            
                    focus("plato")
                } 
            })             
        } else if (result.isDenied) {
            swal.fire({                 
                timer: 1,
                didClose: () => {            
                    focus("ingredientesCenas")
                } 
            })           
        } else {
            swal.fire({
                timer: 1,
                didClose: () => {            
                    focus("ingredientesCenas")
                } 
            })           
        }    
    })        
}


