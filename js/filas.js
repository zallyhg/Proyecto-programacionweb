const {BrowserWindow}=require('electron').remote
const app=require('electron').app
const path=require('path')
const url=require('url')

var id1=localStorage.getItem("id")
var id2=localStorage.getItem("id2")
var myb=document.getElementsByClassName("articleMostrador");

var detalleMyb = function(){
	localStorage.setItem("id3",this.id)

	MyB=new BrowserWindow({width:1440,height:1025})
	MyB.loadURL(url.format({
		pathname: path.join(__dirname,'../monedasybilletes.html'),
		protocol: 'file',
		slashes: true
	}))

	MyB.show();

}

var monedasyb = function(){
	var url="http://museobillete.azurewebsites.net/api/Expo/";
	fetch(url+id1)
	.then(datos=> datos.json())
	.then(datos=>{
		console.log(datos);
		var cantidadG=datos.mostradores[id2].grupos.length;
		var foto = ''
			for(let i=0;i<cantidadG;i++){
				foto=datos.mostradores[id2].imagenFondoUrl;
				document.getElementById('seccionFilas').innerHTML += `
				<article class="articleMostrador" id="${i}">
				<img src="${foto}" class="">
				<article class="articletxt">Grupo:  ${datos.mostradores[id2].grupos[i].titulo}
				<br>


				</article>
				</article>
				`
			}
		
		for(let i=0;i<cantidadG;i++){
			myb[i].addEventListener('click',detalleMyb);
		}	
	});
}


monedasyb();