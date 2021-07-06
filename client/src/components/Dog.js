import React from 'react';
import '../css/components/Dog.css';

export default function Dog({ name, image, temperaments }) {
	return (
		<div className="dog-container">
			<div className="dog-sub">
				<div className="dog-name">{name.toUpperCase()}</div>
				<img
					className="dog-img"
					src={'https://cdn2.thedogapi.com/images/' + image + '.jpg'}
					alt={name}
				/>
				<div className="dog-temperaments">
					<div className="temperament">
						{temperaments.map((temp, i) => (
							<div className="temperament-sub" key={i}>
								{temp.name}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
