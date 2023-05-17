<?php
if (isset($_GET['nombre'])) {
  $entrada = $_GET['nombre'];
  $resultado = "Hola, " . $entrada . "!";
  echo $resultado;
} else {
?>
  <form action="programa2.php" method="get">
    Ingrese su nombre: <input type="text" name="nombre">
    <input type="submit" value="Enviar">
  </form>
<?php
}
?>
