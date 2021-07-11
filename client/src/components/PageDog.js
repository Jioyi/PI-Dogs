import React from 'react';
import '../css/components/PageDog.css';

export default function PageDog({ dog }) {
	return (
		<div className="page-dog-container">
			<div className="page-dog-container-sub">
				<div className="page-dog-name">{'Name: ' + dog.name}</div>
				<div className="page-dog-mid">
					<div>
						<img className="page-dog-img" src={dog.image} alt={dog.name} />
					</div>
					<div className="page-dog-mid-sub">
						<div className="page-dog-data">
							Height: <span className="normal-font">{dog.height.metric}</span>
						</div>
						<div className="page-dog-data">
							Weight: <span className="normal-font">{dog.weight.metric}</span>
						</div>
						<div className="page-dog-data">
							Life span: <span className="normal-font">{dog.life_span}</span>
						</div>
						<div className="page-dog-data">
							Temperaments:
							<span className="normal-font">
								{dog.temperaments.map((temp, i) => ' ' + temp.name)}
							</span>
						</div>
					</div>
				</div>
				<div className="page-dog-end"></div>
			</div>
		</div>
	);
}
