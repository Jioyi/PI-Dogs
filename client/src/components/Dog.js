import React from 'react';
import { Link } from 'react-router-dom';
import '../css/components/Dog.css';

export default function Dog({ id, name, image, temperaments, weight, groups }) {
	return (
		<div className="dog-container">
			<Link to={`/dog/${id}`} className="dog-link">
				<div className="dog-sub">
					<div className="dog-name">{name.toUpperCase()}</div>
					<div className="dog-weight">
						({weight.metric + ' kg'})
						{groups.length > 0 ? ' / ' + groups[0].name : null}
					</div>
					<img className="dog-img" src={image} alt={name} />
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
			</Link>
		</div>
	);
}
