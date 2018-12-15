const {BrowserWindow}=require('electron').remote
const app=require('electron').app
const path=require('path')
const url=require('url')

var id1=localStorage.getItem("id")

var mostrador=document.getElementsByClassName("articleMostrador");
var MyB;
var Filas;



var detalleGrupos = function(){
	localStorage.setItem("id2",this.id)

	Filas=new BrowserWindow({width:1440,height:1025})
	Filas.loadURL(url.format({
		pathname: path.join(__dirname,'../filas.html'),
		protocol: 'file',
		slashes: true
	}))

	Filas.show();

}
var detalleMostradores = function(){
	localStorage.setItem("id2",this.id)

	MyB=new BrowserWindow({width:1440,height:1025})
	MyB.loadURL(url.format({
		pathname: path.join(__dirname,'../monedasybilletes.html'),
		protocol: 'file',
		slashes: true
	}))

	MyB.show();

}
var mostradores = function(){
	var url="http://museobillete.azurewebsites.net/api/Expo/";
	fetch(url+id1)
	.then(datos=> datos.json())
	.then(datos=>{

		console.log(datos);
		var cantidad=datos.mostradores.length;
		var foto = ''
		console.log(cantidad)

		for(let i=0;i<cantidad;i++){
			foto=datos.mostradores[i].imagenFondoUrl;
			document.getElementById('seccionMostrador').innerHTML += `
				<article class="articleMostrador" id="${i}">
					<img src="${foto}" class="">
					<article class="articletxt">Nombre:  ${datos.mostradores[i].titulo}</article>
				</article>
			`
		}

		for(let i=0;i<cantidad;i++){
		if (datos.mostradores[i].grupos[0].unico==false) {
			mostrador[i].addEventListener('click',detalleGrupos);
		}else{
			mostrador[i].addEventListener('click',detalleMostradores);
		}
		}	
	});
}


mostradores();
