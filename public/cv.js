class CurriculumVitae {
  constructor(
    nombre,
    email,
    telefono,
    institucion,
    titulo,
    fechaInicioEducacion,
    fechaFinEducacion,
    empresa,
    cargo,
    fechaInicioExperiencia,
    fechaFinExperiencia,
    tipo,
    descripcion,
    proyecto,
    rol,
    habilidades,
    idiomas,
    certificaciones,
    institucionCertificacion,
    fechaCertificacion,
    referencias,
    relacion,
    emailRel,
    telRel
  ) {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.institucion = institucion;
    this.titulo = titulo;
    this.fechaInicioEducacion = fechaInicioEducacion;
    this.fechaFinEducacion = fechaFinEducacion;
    this.empresa = empresa;
    this.cargo = cargo;
    this.fechaInicioExperiencia = fechaInicioExperiencia;
    this.fechaFinExperiencia = fechaFinExperiencia;
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.proyecto = proyecto;
    this.rol = rol;
    this.habilidades = habilidades;
    this.idiomas = idiomas;
    this.certificaciones = certificaciones;
    this.institucionCertificacion = institucionCertificacion;
    this.fechaCertificacion = fechaCertificacion;
    this.referencias = referencias;
    this.relacion = relacion;
    this.emailRel = emailRel;
    this.telRel = telRel;
  }
  
  
  mostrarHTML() {
    let cvHTML = `
      <h2>${this.nombre}</h2>
      <p>Email: ${this.email}</p>
      <p>Teléfono: ${this.telefono}</p>
      <div class="cv-section">
        <h3>Educación</h3>
        <p>Institución: ${this.institucion}</p>
        <p>Título: ${this.titulo}</p>
        <p>Fecha de inicio: ${this.fechaInicioEducacion}</p>
        <p>Fecha de fin: ${this.fechaFinEducacion}</p>
      </div>
      <div class="cv-section">
        <h3>Experiencia Laboral</h3>
        <p>Empresa: ${this.empresa}</p>
        <p>Cargo: ${this.cargo}</p>
        <p>Fecha de inicio: ${this.fechaInicioExperiencia}</p>
        <p>Fecha de fin: ${this.fechaFinExperiencia}</p>
        <p>Tipo: ${this.tipo}</p>
        <p>Descripción: ${this.descripcion}</p>
      </div>
      <div class="cv-section">
        <h3>Experiencia en Proyectos</h3>
        <p>Proyecto: ${this.proyecto}</p>
        <p>Rol: ${this.rol}</p>
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

    cvHTML += `
        </ul>
      </div>
      <div class="cv-section">
        <h3>Certificaciones</h3>
        <ul>
    `;

    this.certificaciones.forEach((item) => {
      cvHTML += `<li>${item}</li>`;
    });

    cvHTML += `
        </ul>
      </div>
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

  class CurriculumVitaePremium extends CurriculumVitae {
    constructor(
      nombre,
      email,
      telefono,
      institucion,
      titulo,
      fechaInicioEducacion,
      fechaFinEducacion,
      empresa,
      cargo,
      fechaInicioExperiencia,
      fechaFinExperiencia,
      tipo,
      descripcion,
      proyecto,
      rol,
      habilidades,
      idiomas,
      certificaciones,
      institucionCertificacion,
      fechaCertificacion,
      referencias,
      relacion,
      emailRel,
      telRel,
      nivelHabilidad,
      nivelIdioma
    ) {
      super(
        nombre,
        email,
        telefono,
        institucion,
        titulo,
        fechaInicioEducacion,
        fechaFinEducacion,
        empresa,
        cargo,
        fechaInicioExperiencia,
        fechaFinExperiencia,
        tipo,
        descripcion,
        proyecto,
        rol,
        habilidades,
        idiomas,
        certificaciones,
        institucionCertificacion,
        fechaCertificacion,
        referencias,
        relacion,
        emailRel,
        telRel
      );
      this.nivelHabilidad = nivelHabilidad;
      this.nivelIdioma = nivelIdioma;
    }
    mostrarHTML() {
      let cvHTML = super.mostrarHTML();
  
      cvHTML += `
        <div class="cv-section">
          <h3>Nivel de habilidad</h3>
          <p>${this.nivelHabilidad}</p>
        </div>
        <div class="cv-section">
          <h3>Nivel de idioma</h3>
          <p>${this.nivelIdioma}</p>
        </div>
        <div class="cv-section">
          <h3>Información de certificación</h3>
          <p>Certificación: ${this.certificacion}</p
          <p>Institución de certificación: ${this.institucionCertificacion}</p>
          <p>Fecha de certificación: ${this.fechaCertificacion}</p>
        </div>
        <div class="cv-section">
          <h3>Información de referencias</h3>
          <ul>
      `;
  
      this.referencias.forEach((item, index) => {
        cvHTML += `
            <li>
              <p>${item}</p>
              <p>Relación: ${this.relacion[index]}</p>
              <p>Email: ${this.emailRel[index]}</p>
              <p>Teléfono: ${this.telRel[index]}</p>
            </li>
          `;
      });
  
      cvHTML += `
          </ul>
        </div>
      `;
  
      return cvHTML;
    }
  
    
  }

  function mostrarNombresDeCVs(cvs) {
    const nombresContainer = document.getElementById("nombresDeCVs");
    cvs.forEach((cv) => {
      const nombre = document.createElement("p");
      nombre.textContent = cv.nombre;
      nombresContainer.appendChild(nombre);
    });
  }
  
  
  function agregarElementosDeTexto(id) {
    const textarea = document.getElementById(id);
    return textarea.value.split("\n").filter((line) => line.trim() !== "");
  }
  
  
  async function fetchAllCVs() {
    try {
      const response = await fetch('/fetchAllCVs');
      const cvs = await response.json();
  
      const cvListElement = document.getElementById('cv-list');
      cvs.forEach(cv => {
        const listItem = document.createElement('li');
        listItem.textContent = `${cv.nombre} (ID: ${cv.id})`;
        listItem.addEventListener('click', () => redirectToCV(cv.id));
        cvListElement.appendChild(listItem);
      });
    } catch (err) {
      console.error('Error fetching CVs:', err);
    }
  }
  
  fetchAllCVs();
  

  function redirectToCV(userId) {
    window.location.href = `cv_user.html?userId=${userId}`;
  }
  
  

  
  document.getElementById("crearCV").addEventListener("click", async function () {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const institucion = document.getElementById("institucion").value;
    const empresa = document.getElementById("empresa").value;
    const habilidades = agregarElementosDeTexto("habilidades");
    const idiomas = agregarElementosDeTexto("idiomas");
    const certificaciones = agregarElementosDeTexto("certificacion");
    const referencias = agregarElementosDeTexto("referencias");
    const titulo = document.getElementById("titulo").value;
    const fechaInicioEducacion = document.getElementById("fechaInicioEducacion").value;
    const fechaFinEducacion = document.getElementById("fechaFinEducacion").value;
    const cargo = document.getElementById("cargo").value;
    const fechaInicioExperiencia = document.getElementById("fechaInicioExperiencia").value;
    const fechaFinExperiencia = document.getElementById("fechaFinExperiencia").value;
    const tipo = document.getElementById("tipo").value;
    const descripcion = document.getElementById("descripcion").value;
    const proyecto = document.getElementById("proyecto").value;
    const rol = document.getElementById("rol").value;
    const nivelHabilidad = document.getElementById("nivelHabilidad").value;
    const nivelIdioma = document.getElementById("nivelIdioma").value;
    //const certificacion = document.getElementById("certificacion").value;
    const institucionCertificacion = document.getElementById("institucionCertificacion").value;
    const fechaCertificacion = document.getElementById("fechaCertificacion").value;
    const relacion = document.getElementById("relacion").value;
    const telRel = document.getElementById("telRel").value;
    const emailRel = document.getElementById("emailRel").value;



  
    const cv = new CurriculumVitaePremium(
      nombre,
      email,
      telefono,
      institucion,
      titulo,
      fechaInicioEducacion,
      fechaFinEducacion,
      empresa,
      cargo,
      fechaInicioExperiencia,
      fechaFinExperiencia,
      tipo,
      descripcion,
      proyecto,
      rol,
      habilidades,
      idiomas,
      certificaciones,
      institucionCertificacion,
      fechaCertificacion,
      referencias,
      relacion,
      emailRel,
      telRel,
      nivelHabilidad,
      nivelIdioma
    );
    
  
    document.getElementById("cv").innerHTML = cv.mostrarHTML();
  
    const data = {
      nombre: nombre,
      email: email,
      telefono: telefono,
      institucion: institucion,
      empresa: empresa,
      habilidades: habilidades,
      idiomas: idiomas,
      certificaciones: certificaciones,
      referencias: referencias,
      titulo: titulo,
      fechaInicioEducacion: fechaInicioEducacion,
      fechaFinEducacion: fechaFinEducacion,
      cargo: cargo,
      fechaInicioExperiencia: fechaInicioExperiencia,
      fechaFinExperiencia: fechaFinExperiencia,
      tipo: tipo,
      descripcion: descripcion,
      proyecto: proyecto,
      rol: rol,
      nivelHabilidad: nivelHabilidad,
      nivelIdioma: nivelIdioma,
      certificacion: certificaciones,
      institucionCertificacion: institucionCertificacion,
      fechaCertificacion: fechaCertificacion,
      relacion: relacion,
      emailRel: emailRel,
      telRel: telRel
    };

    try {
      const response = await fetch('/saveCV', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // Handle successful response
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle network error
    }
  
   
  });
  