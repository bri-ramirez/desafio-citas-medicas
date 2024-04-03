import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';

import { printUsers, usuarios } from '../services/usuarios-service.js';

export const registerUser = async (req, res) => {
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
    
    const usuariosPorSexo = _.groupBy(usuarios, 'sexo');
    printUsers(usuariosPorSexo);

    // Enviar respuesta con el usuario registrado
    res.render('usuarios', { usuariosPorSexo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const listUsers = (req, res) => {
  const usuariosPorSexo = _.groupBy(usuarios, 'sexo');

  // Imprimir la lista de usuarios por consola con Chalk
  printUsers(usuariosPorSexo);

  // Enviar respuesta con los usuarios divididos por sexo
  res.render('usuarios', { usuariosPorSexo });
};
