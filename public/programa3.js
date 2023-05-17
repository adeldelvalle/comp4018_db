function programa3() {
    const entrada = prompt("Ingrese una palabra:");
    const resultado = entrada.split("").reverse().join("");
    alert("La palabra invertida es: " + resultado);
  }
  