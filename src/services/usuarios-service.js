import chalk from 'chalk';
import _ from 'lodash';

export const usuarios = [];

export const printUsers = (usuariosPorSexo) => {
  console.log(chalk.bgWhite.blue('Mujeres:'));

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
};
