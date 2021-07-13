import { render, screen } from '@testing-library/react';
import React from 'react';
import Dogs from '../src/components/Dogs';

test('Componente Dogs', () => {
	const dogs = [
		{
			id: 1,
			name: 'terrier',
			image: 'ASDasdasd',
			weight: { imperial: '2 - 5', metric: '2 - 5' },
      temperaments: ["lindos","dormilones"],
      breed_groups: [],
		}
	];  
  render(<Dogs dogs={dogs} />);
	//expect(screen.queryByText(dogs)).toBeNull();
});
