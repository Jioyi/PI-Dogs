import { render, screen } from '@testing-library/react';
import Dog from '../src/components/Dog';
import { MemoryRouter } from 'react-router-dom';

const defaultProps = {
	id: 1,
	name: 'Terrier Irlandes',
	image: 'http://localhost/123456.jpg',
	weight: { imperial: '2 - 5', metric: '2 - 5' },
	temperaments: ['alerta', 'asustadiso', 'dormilon'],
	groups: ['Terrier'],
};

describe('Componente Dog', () => {
	it('debe mostrar el nombre del dog en mayusculas', () => {
		render(<Dog {...defaultProps} />, {
			wrapper: MemoryRouter,
		});
		screen.getByText(defaultProps.name.toUpperCase());
	});
	it('debe mostrar la imagen del dog', () => {
		render(<Dog {...defaultProps} />, {
			wrapper: MemoryRouter,
		});
		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('src', defaultProps.image);
	});
	it('alt de la imagen del dog, debe ser el nombre del dog', () => {
		render(<Dog {...defaultProps} />, {
			wrapper: MemoryRouter,
		});
		const img2 = screen.getByRole('img');
		expect(img2).toHaveAttribute('alt', defaultProps.name);
	});

	it('debe tener un link para redirecionar a los detalles del dog - /dog/:id', () => {
		render(<Dog {...defaultProps} />, {
			wrapper: MemoryRouter,
		});
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', "/dog/"+defaultProps.id);
	});
});
