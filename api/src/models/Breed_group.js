const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('breed_group', {
		name: { type: DataTypes.STRING, allowNull: false },
	});
};