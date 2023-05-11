class CurriculumVitae {
    constructor(nombre, email, telefono, educacion, experiencia, habilidades, idiomas) {
      this.nombre = nombre;
      this.email = email;
      this.telefono = telefono;
      this.educacion = educacion;
      this.experiencia = experiencia;
      this.habilidades = habilidades;
      this.idiomas = idiomas;
    }
  
    mostrarHTML() {
      let cvHTML = `
        <h2>${this.nombre}</h2>
        <p>Email: ${this.email}</p>
        <p>Teléfono: ${this.telefono}</p>
        <div class="cv-section">
          <h3>Educación</h3>
          <ul>
      `;
  
      this.educacion.forEach((item) => {
        cvHTML += `<li>${item}</li>`;
      });
  
      cvHTML += `
          </ul>
        </div>
        <div class="cv-section">
          <h3>Experiencia</h3>
          <ul>
      `;
  
      this.experiencia.forEach((item) => {
        cvHTML += `<li>${item}</li>`;
      });
  
      cvHTML += `
          </ul>
        </div>
        <div class="cv-section">
          <h3>Habilidades</h3>
          <ul>
      `;
  
      this.habilidades.forEach((item) => {
        cvHTML += `<li>${item}</li>`;
      });
  
      cvHTML += `
          </ul>
        </div>
        <div class="cv-section">
          <h3>Idiomas</h3>
          <ul>
      `;
  
      this.idiomas.forEach((item) => {
        cvHTML += `<li>${item}</li>`;
      });
  
      cvHTML += "</ul></div>";
  
      return cvHTML;
    }
  }

  class CurriculumVitaePremium extends CurriculumVitae {
    constructor(
      nombre,
      email,
      telefono,
      educacion,
      experiencia,
      habilidades,
      idiomas,
      referencias
    ) {
      super(nombre, email, telefono, educacion, experiencia, habilidades, idiomas);
      this.referencias = referencias;
    }

    
  
    mostrarHTML() {
      let cvHTML = super.mostrarHTML();
  
      cvHTML += `
        <div class="cv-section">
          <h3>Referencias</h3>
          <ul>
      `;
  
      this.referencias.forEach((item) => {
        cvHTML += `<li>${item}</li>`;
      });
  
      cvHTML += "</ul></div>";
  
      return cvHTML;
    }
  }
  
  function agregarElementosDeTexto(id) {
    const textarea = document.getElementById(id);
    return textarea.value.split("\n").filter((line) => line.trim() !== "");
  }
  
  document.getElementById("crearCV").addEventListener("click", function () {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const educacion = agregarElementosDeTexto("educacion");
    const experiencia = agregarElementosDeTexto("experiencia");
    const habilidades = agregarElementosDeTexto("habilidades");
    const idiomas = agregarElementosDeTexto("idiomas");
    const referencias = agregarElementosDeTexto("referencias");
    const cv = new CurriculumVitaePremium(
    nombre,
    email,
    telefono,
    educacion,
    experiencia,
    habilidades,
    idiomas,
    referencias
    );

    fetch("http://csmath.uprm.edu:3000/api/cv", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(cv),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
  
    document.getElementById("cv").innerHTML = cv.mostrarHTML();
  });
  