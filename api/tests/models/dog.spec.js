const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	describe('Validators', () => {
		beforeEach(() => Dog.sync({ force: true }));
		describe('error sin name', () => {
			it('debería arrojar un error si el nombre es nulo', (done) => {
				Dog.create({ name: null })
					.then(() => done('No debería haberse creado'))
					.catch(() => done());
			});
			it('debería funcionar cuando es un nombre válido', () => {
				Dog.create({ name: 'Terrier beta' })
					.then(() => done('No debería haberse creado'))
					.catch(() => done());
			});
		});
	});
});
