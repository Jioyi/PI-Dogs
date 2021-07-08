import React from 'react';
import '../css/components/Dogs.css';
import Dog from './Dog';
import img_error404 from '../assets/images/dog_not_found.jpg';

export default function Dogs({ dogs }) {
	if (dogs.length !== 0) {
		return (
			<div className="dogs-container">
				{dogs.map((dog) => (
					<Dog
						key={dog.id}
						name={dog.name}
						image={dog.image}
						weight={dog.weight}
						temperaments={dog.temperaments}
						groups={dog.breed_groups}
					/>
				))}
			</div>
		);
	} else {
		return (
			<div className="dogs-not-found">				
				<img src={img_error404} alt="NotFound" />
				<h1>I am sorry! No results for your search</h1>
			</div>
		);
	}
}
