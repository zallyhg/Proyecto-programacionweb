<?php
	require("utilerias.php");

	function favoritos(){
		$respuesta = false;
		$conexion=conecta();

		$consulta = sprintf('select * from favoritos');
		$resultado = mysql_query($consulta);
		$favoritos = array();

		if(mysql_num_rows($resultado)>0){
			$respuesta=true;
			while($registro = mysql_fetch_array($resultado)){
				$favoritos[] = $registro;
			}
		}

		$salidaJSON = array('respuesta' => $respuesta,
							'favoritos' => $favoritos);

		print json_encode($salidaJSON);
	}

	function guardar(){
		$respuesta=false;
		$conexion=conecta();

		$id = GetSQLValueString($_POST["id"],"text");
		$titulo = GetSQLValueString($_POST["titulo"],"text");;
		$descripcion = GetSQLValueString($_POST["descripcion"],"text");
		$urlImagen= GetSQLValueString($_POST["urlImagen"],"text");

		$busca=sprintf("select id from favoritos where id=%s limit 1",$id);

		$resultadoBusca=mysql_query($busca);

		if(mysql_num_rows($resultadoBusca)==0){
			//Si no existe
			$inserta=sprintf("insert into favoritos values(%s,%s,%s,%s)",$id, $titulo, $descripcion, $urlImagen);
			mysql_query($inserta);

			if(mysql_affected_rows()>0){
				$respuesta=true;
			}
		}

		$salidaJSON = array('respuesta' => $respuesta );
		
		print json_encode($salidaJSON);
	}

	//Menú principal
	$o=$_POST["opt"];
	switch ($o) {
		case 'favoritos':
			favoritos();
			break;
		case 'guardar':
			guardar();
			break;
		default:
			# code...
			break;
	}
?>
