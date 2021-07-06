import React from 'react';
import '../css/components/Dogs.css';

import Dog from './Dog';

export default function Dogs({ dogs }) {
	if (dogs.length !== 0) {
		return (
			<div className="dogs-container">
				{dogs.map((dog) => (
					<Dog
						key={dog.id}
						name={dog.name}
						image={dog.reference_image_id}
						temperaments={dog.temperaments}
					/>
				))}
			</div>
		);
	} else {
		return <div>Sin perros</div>;
	}
}
