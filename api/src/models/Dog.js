const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
  
  /*ID *
  Nombre *
  Altura *
  Peso *
  Años de vida
  temperament*/
	sequelize.define('dog', {
		name: { type: DataTypes.STRING, allowNull: false },
    height: { type: DataTypes.STRING, allowNull: false },
    weight: { type: DataTypes.STRING, allowNull: false },
    life_span: { type: DataTypes.STRING },
    /*breed_group: { type: DataTypes.STRING },
    bred_for: { type: DataTypes.STRING },
    origin: { type: DataTypes.STRING },
    reference_image_id: { type: DataTypes.STRING },*/
    external_api_id: { type: DataTypes.INTEGER, unique: true },
	});
};
