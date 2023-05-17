<?php
if (isset($_GET['palabra'])) {
  $entrada = $_GET['palabra'];
  $resultado = strrev($entrada);
  echo "La palabra invertida es: " . $resultado;
} else {
?>
  <form action="programa3.php" method="get">
    Ingrese una palabra: <input type="text" name="palabra">
    <input type="submit" value="Enviar">
  </form>
<?php
}
?>
