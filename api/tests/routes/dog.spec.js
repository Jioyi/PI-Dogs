/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
	name: 'Pug',
	height: {},
	weight: {},
};

const dog2 = {
	name: 'Terrier',
	height: {},
	weight: {},
};

describe('Dogs Routes Testing', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
	describe('pedidos a GET /api/dogs', () => {
		it('responde con json', function () {
			return agent.get('/api/dogs').expect('Content-Type', /json/);
		});
		it('responde con 200', () => agent.get('/api/dogs').expect(200));
		it('responde con 404 cuando le enviamos un id pero no hay resultados de dogs con ese id', function () {
			return agent.get('/api/dogs/:id').expect(404);
		});
		it('responde con 200 cuando el dog existe', function () {
			return Dog.create(dog2).then((newDog) => {
				return agent.get(`/api/dogs/${newDog.id}`).expect(200);
			});
		});
	});

	describe('pedidos a POST /api/dog', function () {
		it('responde con 404 cuando no enviablos los datos necesario para crear un dog', function () {
			return agent
				.post('/api/dog')
				.send({
					name: 'Terrier nova',
				})
				.expect(404);
		});
	});
});
