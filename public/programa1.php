<?php
if (isset($_GET['numero'])) {
  $entrada = $_GET['numero'];
  $resultado = $entrada * 2;
  echo "El doble del número ingresado es: " . $resultado;
} else {
?>
  <form action="programa1.php" method="get">
    Ingrese un número: <input type="number" name="numero">
    <input type="submit" value="Enviar">
  </form>
<?php
}
?>
