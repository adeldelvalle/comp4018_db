async function displayCV(userId) {
    try {
      const response = await fetch(`/fetchCV/${userId}`);
      const cvData = await response.json();
  
      // Mostrar el título "Vista Previa del Resumen"
      const titleElement = document.getElementById('preview-title');
      titleElement.textContent = 'Vista Previa del Resumen';
  
      // Mostrar el nombre del usuario
      const userNameElement = document.getElementById('user-name');
      userNameElement.textContent = cvData.usuario[0].nombre;
  
      // Mostrar la educación del usuario
      const educationListElement = document.getElementById('education-list');
        educationListElement.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
        cvData.educacion.forEach(education => {
        const startDate = formatDate(education.fecha_inicio);
        const endDate = formatDate(education.fecha_fin);
        const listItem = document.createElement('li');
        listItem.textContent = `${education.titulo} en ${education.institucion} (${startDate} - ${endDate})`;
        educationListElement.appendChild(listItem);
});
  
      // Mostrar la experiencia laboral del usuario
      const workExperienceListElement = document.getElementById('work-experience-list');
        workExperienceListElement.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
        cvData.experiencia.forEach(experience => {
        const startDate = formatDate(experience.fecha_inicio);
        const endDate = formatDate(experience.fecha_fin);
        const listItem = document.createElement('li');
        listItem.textContent = `${experience.cargo} en ${experience.empresa} (${startDate} - ${endDate})`;
        workExperienceListElement.appendChild(listItem);
});
  
      // Mostrar las habilidades del usuario
      const skillsListElement = document.getElementById('skills-list');
      skillsListElement.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
      cvData.habilidades.forEach(skill => {
        const listItem = document.createElement('li');
        listItem.textContent = `${skill.nombre} (${skill.nivel})`;
        skillsListElement.appendChild(listItem);
      });
  
      // Mostrar los idiomas del usuario
      const languagesListElement = document.getElementById('languages-list');
      languagesListElement.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
      cvData.idiomas.forEach(language => {
        const listItem = document.createElement('li');
        listItem.textContent = `${language.nombre} (${language.nivel})`;
        languagesListElement.appendChild(listItem);
      });
  
      // Mostrar las certificaciones del usuario
      const certificationsListElement = document.getElementById('certifications-list');
      certificationsListElement.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
      cvData.certificaciones.forEach(certification => {
        const listItem = document.createElement('li');
        listItem.textContent = `${certification.nombre} - ${certification.institucion} (${certification.fecha_obtencion})`;
        certificationsListElement.appendChild(listItem);
      });
  
      // Mostrar las referencias del usuario
      const referencesListElement = document.getElementById('references-list');
      referencesListElement.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
      cvData.referencias.forEach(reference => {
        const listItem = document.createElement('li');
        listItem.textContent = `${reference.nombre} - ${reference.relacion} (${reference.email}, ${reference.telefono})`;
        referencesListElement.appendChild(listItem);
      });
  
    } catch (err) {
      console.error('Error fetching CV:', err);
    }
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  }

  function makeEditable(event) {
    const listItem = event.target;
    listItem.contentEditable = 'true';
    listItem.focus();
  
    // Guardar los cambios cuando se presione 'Enter'
    listItem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        listItem.contentEditable = 'false';
        // Aquí, llamar a la función para guardar los cambios en la base de datos
        saveChanges(listItem);
      }
    });
  }
  
  async function saveChanges(listItem) {
    const userId = new URLSearchParams(window.location.search).get('userId');
    const section = listItem.parentElement.id;
    const newValue = listItem.textContent;
  
    // Enviar los datos al servidor
    try {
      const response = await fetch(`/updateCV/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          newValue,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error updating CV: ${response.statusText}`);
      }
  
      alert('Cambios guardados exitosamente');
    } catch (err) {
      console.error(err);
      alert('Error al guardar los cambios');
    }
  }
  
  
  window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    displayCV(userId);
  });
  