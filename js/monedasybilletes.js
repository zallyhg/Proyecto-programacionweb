const {BrowserWindow}=require('electron').remote
const app=require('electron').app
const path=require('path')
const url=require('url')
const $ = require('jquery')

var id1=localStorage.getItem("id")
var id2=localStorage.getItem("id2")
var id3=localStorage.getItem("id3")
var myb=document.getElementsByClassName("articleMostrador2");

var a = function () {
	localStorage.setItem("id4",this.id)
}

var monedasyb = function(){
	var url="http://museobillete.azurewebsites.net/api/Expo/";
	fetch(url+id1)
	.then(datos=> datos.json())
	.then(datos=>{
		console.log(datos);
		var cantidadG=datos.mostradores[id2].grupos.length;
		
		var foto = ''
		//test
		if (datos.mostradores[id2].grupos[0].unico==false) {
			var cantidadP=datos.mostradores[id2].grupos[id3].piezas.length
			for(let i=0;i<cantidadP;i++){
				let obj = {
					id: datos.mostradores[id2].grupos[id3].piezas[i].id,
					titulo: datos.mostradores[id2].grupos[id3].piezas[i].titulo,
					descripcion: null,
					urlImagen: datos.mostradores[id2].grupos[id3].piezas[i].detallesUrl
				};

				foto=datos.mostradores[id2].grupos[id3].piezas[i].imagenFondoUrl;
				document.getElementById('seccionMyB').innerHTML += `
				<article class="articleMostrador" id="${datos.mostradores[id2].grupos[id3].piezas[i].id}">
				<img src="${foto}" class="">
				<article class="articletxt ">Nombre:  ${datos.mostradores[id2].grupos[id3].piezas[i].titulo}
				<br>
				<a class="link" href="${datos.mostradores[id2].grupos[id3].piezas[i].detallesUrl}"> <br>Detalles </a>
				<br>
				<button id="${i}" class="articleMostrador2"> Like </button>
				</article>
				
				</article>
				`		
				
			}
		}else{
			for(let i=0;i<cantidadG;i++){
				let obj = {
					id: datos.mostradores[id2].grupos[id3].piezas[i].id,
					titulo: datos.mostradores[id2].grupos[id3].piezas[i].titulo,
					descripcion: null,
					urlImagen: datos.mostradores[id2].grupos[id3].piezas[i].detallesUrl
				};

				foto=datos.mostradores[id2].grupos[i].imagenFondoUrl;
				document.getElementById('seccionMyB').innerHTML += `
				<article class="articleMostrador" id="${datos.mostradores[id2].grupos[i].id}">
				<img src="${foto}" >
				<article class="articletxt">Nombre:  ${datos.mostradores[id2].grupos[i].titulo}
				<br>
				Descripcion:  ${datos.mostradores[id2].grupos[i].descripcion}
				<a class="link" href="${datos.mostradores[id2].grupos[i].piezas[0].detallesUrl}"><br>Detalles </a>
				<br>
				<button id="${i}" class="articleMostrador2"> Like </button>
				</article>
				</article>
				`
			}
		}
		//endtest

		for(let i=0;i<cantidadG;i++){
			myb[i].addEventListener('click', a);
		}	
	});
}



 function guardar() {
	var url="http://museobillete.azurewebsites.net/api/Expo/";
	
 	var obj;

 	fetch(url+id1)
	.then(datos=> datos.json())
	.then(datos=>{
		console.log(datos);
		var cantidadG=datos.mostradores[id2].grupos[id3].length;
		
		//test
		if (datos.mostradores[id2].grupos[id3].unico==false) {
			obj = {
				id: datos.mostradores[id2].grupos[id3].piezas[id4].id,
				titulo: datos.mostradores[id2].grupos[id3].piezas[id4].titulo,
				descripcion: datos.mostradores[id2].grupos[id3].piezas[id4].descripcion,
				urlImagen: datos.mostradores[id2].grupos[id3].piezas[id4].detallesUrl
			};
		}else{
			obj = {
				id: datos.mostradores[id2].grupos[id4].id,
				titulo: datos.mostradores[id2].grupos[id4].titulo,
				descripcion: datos.mostradores[id2].grupos[id4].descripcion,
				urlImagen: datos.mostradores[id2].grupos[id4].detallesUrl
			};
		}


	var id =obj.id;
    var titulo = obj.titulo;
    var descripcion = obj.descripcion;
    var urlImagen = obj.urlImagen;

    var parametros =  'opt=guardar'+
                      '&id='+id+
                      '&titulo='+titulo+
                      '&descripcion='+descripcion+
                      '&urlImagen='+urlImagen;

    var guardar= $.ajax({
      method:"POST",
      url:"http://localhost/web/museo.php",
      data:parametros,
      dataType:"json"
    });

    guardar.done(function(data){
      if(data.respuesta==true){
       	console.log('Se guardó')

      }else{

      }
    });

    guardar.fail(function(jqError,textStatus){
      console.log(jqError.responseText);
    });
	});

    

  }
monedasyb();