const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const http = require('http');

const app = express();
app.use(bodyParser.json());
app.use(cors());
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));



const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'adeldv',
  password: 'comp4018',
  database: 'db_adeldv',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.post('/saveCV', (req, res) => {
    const data = req.body;
    const sqlUsuario = `
      INSERT INTO Usuario (nombre, email, telefono)
      VALUES (?, ?, ?)
    `;
    const valuesUsuario = [data.nombre, data.email, data.telefono];
  
    db.query(sqlUsuario, valuesUsuario, (err, result) => {
      if (err) {
        console.error('Error inserting data into Usuario:', err);
        res.status(500).send('Error inserting data into Usuario');
        return;
      }
  
      const usuarioId = result.insertId;
  
      saveEducacion(data, usuarioId);
    saveExperiencia(data, usuarioId);
    saveHabilidad(data, usuarioId);
    saveIdioma(data, usuarioId);
    saveCertificacion(data, usuarioId);
    saveReferencias(data, usuarioId);

    res.status(200).send('CV saved successfully');
  });
});

function saveEducacion(edu, usuarioId) {
  const sql = `
    INSERT INTO Educacion (usuario_id, institucion, titulo, fecha_inicio, fecha_fin)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [usuarioId, edu.institucion, edu.titulo, edu.fechaInicioEducacion, edu.fechaFinEducacion];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into Educacion:', err);
    }
  });
}

function saveExperienciaLaboral(exp, experienciaId) {
    const sql = `
      INSERT INTO ExperienciaLaboral (experiencia_id, descripcion)
      VALUES (?, ?)
    `;
    const values = [experienciaId, exp.descripcion];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into ExperienciaLaboral:', err);
      }
    });
  }
  
  function saveExperienciaProyecto(exp, experienciaId) {
    const sql = `
      INSERT INTO ExperienciaProyecto (experiencia_id, proyecto, rol)
      VALUES (?, ?, ?)
    `;
    const values = [experienciaId, exp.proyecto, exp.rol];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into ExperienciaProyecto:', err);
      }
    });
  }

  function saveExperiencia(data, usuarioId) {
    const sql = `
      INSERT INTO Experiencia (usuario_id, empresa, cargo, fecha_inicio, fecha_fin, tipo)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [usuarioId, data.empresa, data.cargo, data.fechaInicioExperiencia, data.fechaFinExperiencia, data.tipo];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into Experiencia:', err);
      } else {
        const experienciaId = result.insertId;
        if (data.tipo === 'laboral') {
          saveExperienciaLaboral(data, experienciaId);
        } else if (data.tipo === 'proyecto') {
          saveExperienciaProyecto(data, experienciaId);
        }
      }
    });
}

function saveHabilidad(hab, usuarioId) {
  const sql = `
    INSERT INTO Habilidad (usuario_id, nombre, nivel)
    VALUES (?, ?, ?)
  `;
  const values = [usuarioId, hab.habilidades, hab.nivelHabilidad];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into Habilidad:', err);
    }
  });
}

function saveIdioma(idi, usuarioId) {
  const sql = `
    INSERT INTO Idioma (usuario_id, nombre, nivel)
    VALUES (?, ?, ?)
  `;
  const values = [usuarioId, idi.idiomas, idi.nivelIdioma];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into Idioma:', err);
    }
  });
}
  
function saveCertificacion(cer, usuarioId) {
    const sql = `
      INSERT INTO Certificacion (usuario_id, nombre, institucion, fecha_obtencion)
      VALUES (?, ?, ?, ?)
    `;
    const values = [usuarioId, cer.certificacion, cer.institucionCertificacion, cer.fechaCertificacion];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into Certificacion:', err);
      }
    });
  }
  
  function saveReferencias(ref, usuarioId) {
    const sql = `
      INSERT INTO Referencia (usuario_id, nombre, email, telefono, relacion)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [usuarioId, ref.referencias, ref.emailRel, ref.telRel, ref.relacion];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into Referencia:', err);
      }
    });
  }

  app.get('/fetchAllCVs', async (req, res) => {
    const sql = `
      SELECT id, nombre
      FROM Usuario
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching CVs:', err);
        res.status(500).send('Error fetching CVs');
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.get('/fetchCV/:id', async (req, res) => {
    const userId = req.params.id;
    const cvData = {};
  
    const sqlUsuario = `
      SELECT nombre, email, telefono
      FROM Usuario
      WHERE id = ?
    `;
  
    const sqlEducacion = `
      SELECT institucion, titulo, fecha_inicio, fecha_fin
      FROM Educacion
      WHERE usuario_id = ?
    `;
  
    const sqlExperiencia = `
      SELECT empresa, cargo, fecha_inicio, fecha_fin, tipo
      FROM Experiencia
      WHERE usuario_id = ?
    `;
  
    const sqlHabilidad = `
      SELECT nombre, nivel
      FROM Habilidad
      WHERE usuario_id = ?
    `;
  
    const sqlIdioma = `
      SELECT nombre, nivel
      FROM Idioma
      WHERE usuario_id = ?
    `;
  
    const sqlCertificacion = `
      SELECT nombre, institucion, fecha_obtencion
      FROM Certificacion
      WHERE usuario_id = ?
    `;
  
    const sqlReferencia = `
      SELECT nombre, email, telefono, relacion
      FROM Referencia
      WHERE usuario_id = ?
    `;
  
    const fetchUserData = (query, key) => {
      return new Promise((resolve, reject) => {
        db.query(query, [userId], (err, results) => {
          if (err) {
            reject(err);
          } else {
            cvData[key] = results;
            resolve();
          }
        });
      });
    };
  
    try {
      await Promise.all([
        fetchUserData(sqlUsuario, 'usuario'),
        fetchUserData(sqlEducacion, 'educacion'),
        fetchUserData(sqlExperiencia, 'experiencia'),
        fetchUserData(sqlHabilidad, 'habilidades'),
        fetchUserData(sqlIdioma, 'idiomas'),
        fetchUserData(sqlCertificacion, 'certificaciones'),
        fetchUserData(sqlReferencia, 'referencias'),
      ]);
  
      res.status(200).json(cvData);
    } catch (err) {
      console.error('Error fetching CV:', err);
      res.status(500).send('Error fetching CV');
    }
  });
  
  app.post('/updateCV/:id', async (req, res) => {
    const userId = req.params.id;
    const { section, newValue } = req.body;
  
    if (section === 'education-list') {
      try {
        // Extraer los datos del elemento de la lista
        const regex = /(.*) en (.*) \((.*) - (.*)\)/;
        const matches = newValue.match(regex);
        const titulo = matches[1];
        const institucion = matches[2];
        const fecha_inicio = matches[3];
        const fecha_fin = matches[4];
  
        // Convertir las fechas al formato 'YYYY-MM-DD'
        const formatDate = (date) => {
          const [month, day, year] = date.split('/');
          return `${year}-${month}-${day}`;
        };
  
        const fecha_inicio_formatted = formatDate(fecha_inicio);
        const fecha_fin_formatted = formatDate(fecha_fin);
  
        // Consulta para actualizar la información de educación
        const sqlUpdateEducation = `
          UPDATE Educacion
          SET titulo = ?, institucion = ?, fecha_inicio = ?, fecha_fin = ?
          WHERE usuario_id = ?
        `;
  
        db.query(
          sqlUpdateEducation,
          [titulo, institucion, fecha_inicio_formatted, fecha_fin_formatted, userId],
          (err, result) => {
            if (err) {
              console.error('Error updating education:', err);
              res.status(500).send('Error updating education');
            } else {
              res.status(200).send('Education updated successfully');
            }
          }
        );
      } catch (err) {
        console.error('Error updating education:', err);
        res.status(500).send('Error updating education');
      }
    } else {
      res.status(400).send('Invalid section');
    }
  });
  
  
  
const PORT = process.env.PORT || 3001;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on port ${PORT}`);
});