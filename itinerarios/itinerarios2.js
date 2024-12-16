
var lugar = document.getElementById('location');
var intro = document.getElementById('intro').value;
var outro = document.getElementById('outro').value;
var jor;
const d = 20;
const h = 120;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function jornadas(){
    intro = document.getElementById('intro').value;
    outro = document.getElementById('outro').value;
    introParse = Date.parse(document.getElementById('intro').value);
    outroParse = Date.parse(document.getElementById('outro').value);
    jor = (outroParse - introParse)/1000/3600/24;
    console.log(jor);
    ctx.clearRect(0,0,640,340);
    dibujarBase();
    mapearCalendario()
};

function dibujarBase(){
    if (intro == '' || outro == ''){
        alert('ingresa la fecha de inicio')
    } else {
        const d = 20;
        const h = 120;
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#907296';
        ctx.setLineDash([1,0])
        ctx.beginPath();
        ctx.moveTo(0+h,0+d);
        ctx.lineTo(0+h,340-d);
        ctx.lineTo(500+h,340-d);
        ctx.lineTo(500+h,0+d);
        ctx.lineTo(0+h,0+d);
        ctx.stroke();
        var divJor = 500 / (jor + 1);
        console.log(divJor)
        for (var i = 0 ; i <= jor ; i++){
            ctx.beginPath();
            ctx.moveTo((divJor*i)+h,0+d);
            ctx.lineTo((divJor*i)+h,340-d);
            ctx.stroke();
        };
    };    
};

var inicio = document.getElementById('inicio').value;
var cierre = document.getElementById('objetivo').value;
var puntoCierre = {
    campamento: document.getElementById('objetivo').value,
    distancia: Number(document.getElementById('distanciaTramoO').value),
    tiempo: Number(document.getElementById('tiempoJornadaO').value)
};
var puntoInicio = {
    campamento: document.getElementById('inicio').value,
    distancia: Number(document.getElementById('distanciaTramoI').value),
    tiempo: Number(document.getElementById('tiempoJornadaI').value)
};
// var camps = [
    //     {campamento: 'inicio', distancia: 0, tiempo: 0},
    //     {campamento: 'objetivo', distancia: "distTramo", tiempo: "tiempJorn"}
    // ];
    var camps = [puntoInicio];
    var tiempoPI = 0;
    
function datosIniciales(){
    inicio = document.getElementById('inicio').value;
    cierre = document.getElementById('objetivo').value;
    var campamentoPC = document.getElementById('objetivo').value;
    var distanciaPC = document.getElementById('distanciaTramoO').value;
    tiempoPI = document.getElementById('tiempoJornadaI').value;
    var tiempoPC = document.getElementById('tiempoJornadaO').value;
    puntoCierre = {
        campamento: campamentoPC,
        distancia: distanciaPC,
        tiempo: tiempoPC 
    };    
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#907296';
    jornadas();
    camps[0].campamento = inicio;
    //camps[1].campamento = cierre;
    var puntoInicio = camps[0];
    var puntoCierre = camps[camps.lenght-1];
    ctx.font = "13px Arial";
    ctx.fillText(cierre, d,d);
    ctx.fillText(inicio, d,300+d);
    
    crearDibujo();
};
function dibujarLineaNivel(tramo,i,d,h){
    ctx.beginPath();
    ctx.moveTo(0+h,(300-tramo)+d);
    ctx.lineTo(500+h,(300-tramo)+d);
    ctx.stroke();
}
function calculoTramo(camp){
    var t = camp.tiempo/((camps.map(e=>e.tiempo)).reduce((a,b)=> a+b)+ puntoCierre.tiempo)
    console.log(t)
    return t;
}
var tramosDim = [tiempoPI];
function insert(){
    ctx.clearRect(0,0,640,340);
    datosIniciales();
    const d = 20;
    const h = 120;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#907296';
    ctx.setLineDash([1,0]);
    puntoCierre = {
        campamento: document.getElementById('objetivo').value,
        distancia: Number(document.getElementById('distanciaTramoO').value),
        tiempo: Number(document.getElementById('tiempoJornadaO').value)
    };
    var nameCamp = document.getElementById('nameCamp').value;
    var distTramo = Number(document.getElementById('distanciaTramoJ').value);
    var tiempJorn = Number(document.getElementById('tiempoJornadaJ').value);
    var camp = {campamento: nameCamp, distancia: distTramo, tiempo: tiempJorn};
    
    console.log('CAMP',camp);
    camps.push(camp);
    console.log('push',camps);   
    
    var cantCamp = camps.length;
    console.log(cantCamp);
    //ctx.clearRect(0,100,120,340);
    tramosDim = [tiempoPI];
    var tramoSumado = 0;
    for(var i=1 ; i<cantCamp ; i++){
        var t = 300*calculoTramo(camps[i]);
        console.log(t);
        tramosDim.push(t);
        console.log(tramosDim);
        tramoSumado += t;
        tramo = tramoSumado;
        dibujarLineaNivel(tramo,i,d,h);
        ctx.font = "13px Arial";
        ctx.fillText(camps[i].campamento, d,(300-(tramo))+d);
    }
    var tFinal = 300*calculoTramo(puntoCierre)
    tramosDim.push(tFinal)
    console.log(camps);
    document.getElementById('nameCamp').value = '';
    document.getElementById('distanciaTramoJ').value = 1;
    document.getElementById('tiempoJornadaJ').value = 1;
    document.getElementById('nameCamp').focus();

    moduloV = 300/camps.length;
    moduloH = 500/(jor+1);
    console.log('modulo', moduloH, moduloV);
}

var moduloV = 300/camps.length;
var moduloH = 500/(jor+1);
console.log('modulo', moduloH, moduloV);
var getNumDay;
function diasSemana(f,i){
    console.log(f);
    var FF = new Date(Date.parse(f)+((1+i)*86400000))
    console.log(FF);
    var getDay = (new Date(FF)).getDay();
    getNumDay = (new Date(FF)).getDate();
    console.log(getDay);    
    switch(getDay){
        case 0:
            return 'Sun';
            break;
        case 1:
            return 'Mon';
            break;
        case 2:
            return 'Tue';
            break;
        case 3:
            return 'Wed';
            break;
        case 4:
            return 'Thurs';
            break;
        case 5:
            return 'Fri';
            break;
        case 6:
            return 'Sat';
            break;
        default:
            break;
    }
}
function mapearCalendario(){
    moduloH = 500/(jor+1);
    for (var i=0 ; i<=jor ; i++){   
        var dia = diasSemana(intro,i);
        console.log('intro',intro);
        console.log(dia);
        // var getNumDay;
        console.log(getNumDay);
        ctx.font = "11px Arial";
        ctx.fillText(getNumDay, (h+(moduloH/3)+(moduloH*i)),14)
        ctx.fillText(dia, (h+(moduloH/3)+(moduloH*i)),295+d+d)
    }
}


function crearDibujo(){    
    var contItin = document.getElementById('contItin');
    contItin.innerHTML = '';
    for (var i=0 ; i<=jor ; i++){
        var select  = document.createElement('select');
        select.id = `sel${i}`;
        select.className = 'select';
        select.style.width = moduloH+'px';
        var opt1 = document.createElement('option');
        var opt11 = document.createElement('option');
        var opt12 = document.createElement('option');
        var opt13 = document.createElement('option');
        var opt2 = document.createElement('option');
        var opt3 = document.createElement('option');
        var opt4 = document.createElement('option');
        var opt5 = document.createElement('option');
        var opt6 = document.createElement('option');
        var opt7 = document.createElement('option');
        var opt8 = document.createElement('option');
        var opt9 = document.createElement('option');
        opt1.value = 'Ascenso';
        opt11.value = 'Ascenso2camps';
        opt12.value = 'Ascenso3camps';
        opt13.value = 'None';
        opt2.value = 'Descanso';
        opt3.value = 'Porteo';
        opt4.value = 'Exploracion';
        opt5.value = 'Ataque';
        opt6.value = 'Ataque y desenso';
        opt7.value = 'Descenso 1 camp';
        opt8.value = 'Descenso 2 camp';
        opt9.value = 'Descenso 3 camp';
        opt1.text = 'Ascenso';
        opt11.text = 'Ascenso 2 camps';
        opt12.text = 'Ascenso 3 camps';
        opt13.text = 'None';
        opt2.text = 'Descanso';
        opt3.text = 'Porteo';
        opt4.text = 'Exploracion';
        opt5.text = 'Ataque';
        opt6.text = 'Ataque y desenso';
        opt7.text = 'Descenso 1 camp';
        opt8.text = 'Descenso 2 camp';
        opt9.text = 'Descenso 3 camp';
        select.add(opt1);
        select.add(opt11);
        select.add(opt12);
        select.add(opt13);
        select.add(opt2);
        select.add(opt3);
        select.add(opt4);
        select.add(opt5);
        select.add(opt6);
        select.add(opt7);
        select.add(opt8);
        select.add(opt9);
        contItin.appendChild(select);
    };
    // var sel = document.querySelectorAll('.select')
    // addEventListener('change', (event) =>{
    //     ctx.clearRect(0,0,640,340);
    //     datosIniciales()
    //     dibujarLinea(); 
    // })
};
var piso = 0;
var k = (300/camps.length);
//var i = (camps.length - piso);
//var i = tramosDim[piso];
var iSup = tramosDim[piso+1];
var iSup2 = tramosDim[piso+2];
var iSup3 = tramosDim[piso+3];
var tramoSumado = [];
var itinerarios = {marchas: 0, descansos: 0};
function dibujarLinea(){
    piso = 0;
    var acum = 0;
    itinerarios.marchas = 0;
    itinerarios.descansos = 0;
    tramoSumado = tramosDim.map(el=>acum += Number(el));
    console.log("tramoSumado",tramoSumado);
    for (var j=0 ; j<=jor ; j++){
        let dia = document.getElementById(`sel${j}`).value;
        console.log(dia);
        console.log('piso', piso);
        var i = tramoSumado[piso];
        var iSup = tramosDim[piso+1];
        var iSup2 = tramosDim[piso+2];
        var iSup3 = tramosDim[piso+3];
        console.log('i,iSup: ', i, iSup,iSup2,iSup3);
        switch (dia){
            case 'Ascenso':
                dibAscenso(i,j)
                piso += 1;
                itinerarios.marchas +=1;
                break
            case 'Ascenso2camps':
                dibAscenso2Camps(i,j)
                piso += 2;
                itinerarios.marchas +=1;
                break
            case 'Ascenso3camps':
                dibAscenso3Camps(i,j)
                piso += 3;
                itinerarios.marchas +=1;
                break
            case 'None':
                dibNone(i,j)
                itinerarios.marchas +=1;
                break
            case 'Descanso':
                dibDescanso(i,j);
                itinerarios.descansos +=1;
                break
            case 'Porteo':
                dibPorteo(i,j)
                itinerarios.marchas +=1;
                break
            case 'Exploracion':
                dibExploracion(i,j)
                itinerarios.marchas +=1;
                break
            case 'Ataque':
                dibAtaqueCumbre(i,j)
                itinerarios.marchas +=1;
                break
            case 'Ataque y desenso':
                dibCumbreMasDesensoUnCamp(i,j)
                piso -= 1;
                itinerarios.marchas +=1;
                break
            case 'Descenso 1 camp':
                dibDesensoXCamp(i,j,1)
                piso -= 1;
                itinerarios.marchas +=1;
                break
            case 'Descenso 2 camp':
                dibDesensoXCamp(i,j,2);
                piso -= 2;
                itinerarios.marchas +=1;
                break
            case 'Descenso 3 camp':
                dibDesensoXCamp(i,j,3);
                piso -= 3;
                itinerarios.marchas +=1;
                break
            default:
                break
        }
        cuquis();
    }
    printResumen();
     
    pdfCoqui();
    cuquis();    
}

function limpiarLinea(){
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#907296';
    ctx.setLineDash([1,0]);
    datosIniciales();
    var cantCamp = camps.length;
    console.log(cantCamp);
    //ctx.clearRect(0,100,120,340);
    var tramo = 300/(cantCamp);
    var tramoSumado = 0;
    for(var i=1 ; i<(cantCamp) ; i++){
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#907296';
        var t = 300*calculoTramo(camps[i]);
        console.log(tramosDim);
        tramoSumado += t;
        tramo = tramoSumado;
        dibujarLineaNivel(tramo,i,d,h);
        ctx.font = "13px Arial";
        ctx.fillText(camps[i].campamento, d,(300-tramo)+d);
    }
    console.log(camps);
    document.getElementById('nameCamp').value = '';
    document.getElementById('distanciaTramoJ').value = '';
    document.getElementById('tiempoJornadaJ').value = '';
    document.getElementById('nameCamp').focus();

    //moduloV = 1; //300/camps.length;
    moduloH = 500/(jor+1);
    console.log('modulo', moduloH, moduloV);
}

function dibAscenso(i,j){
    var colorLine = document.getElementById('colorLine').value
    ctx.lineWidth = 13;
    ctx.setLineDash([0,0]);
    ctx.strokeStyle = colorLine;
    iSup = tramosDim[piso+1]
    ctx.beginPath();
    ctx.moveTo(0+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5)+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5*4)+h+(moduloH*j),((300-i)-iSup)+d);
    ctx.lineTo((moduloH+h+(moduloH*j)),((300-i)-iSup)+d);
    ctx.stroke();
}

function dibAscenso2Camps(i,j){
    var colorLine = document.getElementById('colorLine').value;
    ctx.lineWidth = 13;
    ctx.setLineDash([0,0]);
    ctx.strokeStyle = colorLine;
    var iSup2 = tramoSumado[piso+2];
    console.log(tramoSumado,iSup2);
    ctx.beginPath();
    ctx.moveTo(0+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5)+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5*4)+h+(moduloH*j),(300-iSup2)+d);
    ctx.lineTo((moduloH+h+(moduloH*j)),(300-iSup2)+d);
    ctx.stroke();
}
function dibAscenso3Camps(i,j){
    var colorLine = document.getElementById('colorLine').value;
    ctx.lineWidth = 13;
    ctx.setLineDash([0,0]);
    ctx.strokeStyle = colorLine;
    var iSup3 = tramoSumado[piso+3];
    console.log(tramoSumado,iSup3);
    ctx.beginPath();
    ctx.moveTo(0+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5)+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5*4)+h+(moduloH*j),(300-iSup3)+d);
    ctx.lineTo((moduloH+h+(moduloH*j)),(300-iSup3)+d);
    ctx.stroke();
}
function dibNone(i,j){
    return
}
function dibDescanso(i,j){
    ctx.lineWidth = 13;
    ctx.setLineDash([0,0]);
    var colorLine = document.getElementById('colorLine').value
    ctx.strokeStyle = colorLine;
    ctx.beginPath();
    ctx.moveTo(0+h+(moduloH*j),(300-i)+d);    
    ctx.lineTo((moduloH+h+(moduloH*j)),(300-i)+d);
    ctx.stroke();
}

function dibPorteo(i,j){
    ctx.lineWidth = 13;
    ctx.setLineDash([0,0]);
    var colorLine = document.getElementById('colorLine').value
    ctx.strokeStyle = colorLine;
    iSup = tramosDim[piso+1];
    ctx.beginPath();
    ctx.moveTo(0+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5)+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5*2)+h+(moduloH*j),((300-i)-iSup)+d);
    ctx.lineTo((moduloH/5*3)+h+(moduloH*j),((300-i))+d);
    ctx.lineTo((moduloH+h+(moduloH*j)),(300-i)+d);
    ctx.stroke();
}

function dibExploracion(i,j){
    ctx.lineWidth = 13;
    ctx.setLineDash([0,0]);
    var colorLine = document.getElementById('colorLine').value
    ctx.strokeStyle = colorLine;
    iSup = tramosDim[piso+1];
    ctx.beginPath();
    ctx.moveTo(0+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5)+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5*2)+h+(moduloH*j),((300-i)-iSup/2)+d);
    ctx.lineTo((moduloH/5*3)+h+(moduloH*j),((300-i)-iSup/2)+d);
    ctx.lineTo((moduloH/5*4)+h+(moduloH*j),((300-i))+d);
    ctx.lineTo((moduloH+h+(moduloH*j)),(300-i)+d);
    ctx.stroke();
}

function dibAtaqueCumbre(i,j){
    ctx.lineWidth = 13;
    ctx.setLineDash([0,0]);
    var colorLine = document.getElementById('colorLine').value
    ctx.strokeStyle = colorLine;
    iSup = tramosDim[piso+1];
    ctx.beginPath();
    ctx.moveTo(0+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5)+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5*2)+h+(moduloH*j),((300-i)-iSup)+d);
    ctx.lineTo((moduloH/5*3)+h+(moduloH*j),((300-i))+d);
    ctx.lineTo((moduloH+h+(moduloH*j)),(300-i)+d);
    ctx.stroke();
}
function dibCumbreMasDesensoUnCamp(i,j){
    ctx.lineWidth = 13;
    ctx.setLineDash([0,0]);
    var colorLine = document.getElementById('colorLine').value
    ctx.strokeStyle = colorLine;
    iSup = tramosDim[piso+1];
    iInf = tramoSumado[piso-1];
    ctx.beginPath();
    ctx.moveTo(0+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5)+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5*2)+h+(moduloH*j),((300-i)-iSup)+d);
    ctx.lineTo((moduloH/5*3)+h+(moduloH*j),((300-iInf))+d);
    ctx.lineTo((moduloH+h+(moduloH*j)),300-iInf+d);
    ctx.stroke();
}
function dibDesensoXCamp(i,j,p){
    ctx.lineWidth = 13;
    ctx.setLineDash([0,0]);
    var colorLine = document.getElementById('colorLine').value
    ctx.strokeStyle = colorLine;
    //iSup = tramosDim[piso+1];
    iInf = tramoSumado[piso-p];
    ctx.beginPath();
    ctx.moveTo(0+h+(moduloH*j),(300-i)+d);
    ctx.lineTo((moduloH/5*2)+h+(moduloH*j),((300-i))+d);
    ctx.lineTo((moduloH/5*3)+h+(moduloH*j),(300-iInf+d));
    ctx.lineTo((moduloH+h+(moduloH*j)),(300-iInf)+d);
    ctx.stroke();
}

function cuquis(){
    localStorage.setItem('itinerarios', JSON.stringify(itinerarios));
    localStorage.setItem('fechaInicioInvert', JSON.stringify(introInverted));
    localStorage.setItem('fechaInicio', document.getElementById('intro').value);
    localStorage.setItem('lugar', document.getElementById('lugarInput').value);
    localStorage.setItem('integrantes', document.getElementById('integrantes').value);
    setTimeout(()=> {
        localStorage.setItem('imagenItin', JSON.stringify(imagen));
    }, 500);
}

function arrancarAlimentacion(){
    cuquis()
    window.location.href= "../alimentacion/index.html";
    
}
var introInverted;
function printResumen(){    
    var contLocation = document.getElementById('titleCanvas'); 
    var location = document.getElementById('lugarInput').value;   
    var jMSpan = document.getElementById('jM');
    var jDSpan = document.getElementById('jD');
    introInverted = (Number(new Date(intro).getDate())+1) + '-' + (Number(new Date(intro).getMonth())+1)  + '-' + new Date(intro).getFullYear();
    contLocation.innerHTML = location + ' | ' + introInverted;
    jMSpan.innerHTML = ' ';
    jDSpan.innerHTML = ' ';
    jMSpan.append(itinerarios.marchas);
    jDSpan.append(itinerarios.descansos);
}



var imagen = '';
function pdfCoqui(){
    html2canvas(document.querySelector("#contImprimirPDF"))
    .then(canvas => {
      imagen = canvas.toDataURL("image/jpeg");
    }).catch((error)=>{
        console.log(error)
    })
}

function printPDF2(){
    html2canvas(document.querySelector("#contImprimirPDF"))
    .then(canvas => {
      imagen = canvas.toDataURL("image/jpeg");
      var win = window.open();
      win.document.write('<img src="'+imagen+'"/>');
      win.document.head.innerHTML = '<link rel="stylesheet" href="printitin.css">';
      
    }).catch((error)=>{
      console.log(error)
    })
  }
  
