const $ = require('jquery');


var mostrarFav = function(){
  var parametros =  'opt=favoritos';

  var mostrar= $.ajax({
    method:"POST",
    url:"http://localhost/web/museo.php",
    data:parametros,
    dataType:"json"
  });

  mostrar.done(function(data){
    if(data.respuesta==true){
      //html
    }
  });

}



var btnFav=document.getElementById('fav')
btnFav.addEventListener('click',mostrarFav)