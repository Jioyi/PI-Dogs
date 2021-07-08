import React from 'react';
import '../css/components/Dog.css';

export default function Dog({ name, image, temperaments, weight }) {
	return (
		<div className="dog-container">
			<div className="dog-sub">
				<div className="dog-name">{name.toUpperCase()}</div>
				<div className="dog-weight">({weight.metric+" Kgs"})</div>
				<img
					className="dog-img"
					src={image}
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
