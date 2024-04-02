import axios from 'axios';
import chalk from 'chalk';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import moment from 'moment';

const app = express();
const PORT = 4000;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=10');
    const { results } = response.data;
    res.send(response.data);
  } catch (error) {}
});

let usuarios = [];

// Ruta para registrar un nuevo usuario
app.get('/registrar', async (req, res) => {
  try {
    // Consultar datos de un usuario aleatorio desde la API Random User
    const { data } = await axios.get('https://randomuser.me/api/');
    const usuarioAleatorio = data.results[0];

    // Generar un ID único para el usuario
    const id = uuidv4();

    // Obtener la fecha y hora actual formateada
    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

    // Crear el objeto de usuario
    const nuevoUsuario = {
      id,
      nombre: usuarioAleatorio.name.first,
      apellido: usuarioAleatorio.name.last,
      sexo: usuarioAleatorio.gender,
      timestamp,
    };

    // Agregar el nuevo usuario a la base de datos
    usuarios.push(nuevoUsuario);
    console.log(usuarios);

    // Enviar respuesta con el usuario registrado
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Ruta para consultar todos los usuarios registrados
app.get('/usuarios', (req, res) => {
  // Dividir los usuarios por sexo utilizando lodash
  const usuariosPorSexo = _.groupBy(usuarios, 'sexo');

  console.log(usuariosPorSexo);
  // Imprimir la lista de usuarios por consola con Chalk
  printUsers();

  // Enviar respuesta con los usuarios divididos por sexo
  res.json(usuariosPorSexo);
});

app.listen(PORT, () => {
  console.log('servidor en puerto :', PORT);
});

function printUsers() {
  console.log(chalk.bgWhite.blue('Mujeres:'));

  const usuariosPorSexo = _.groupBy(usuarios, 'sexo');

  if (usuariosPorSexo && usuariosPorSexo.female) {
    usuariosPorSexo.female.forEach((usuario, index) => {
      console.log(
        chalk.bgWhite.blue(
          `${index + 1} Nombre: ${usuario.nombre} - Apellido: ${
            usuario.apellido
          } - ID: ${usuario.sexo} - Timestamp: ${usuario.timestamp}`
        )
      );
    });
  }

  
  console.log(chalk.bgWhite.blue('Hombres:'));
  if (usuariosPorSexo && usuariosPorSexo.male) {
    usuariosPorSexo.male.forEach((usuario, index) => {
      console.log(
        chalk.bgWhite.blue(
          `${index + 1} Nombre: ${usuario.nombre} - Apellido: ${
            usuario.apellido
          } - ID: ${usuario.sexo} - Timestamp: ${usuario.timestamp}`
        )
      );
    });
  }
}
