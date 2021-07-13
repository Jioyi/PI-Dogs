import React, { useState, useEffect } from 'react';
import '../css/views/createDog.css';

export default function CreateDog() {
	const [input, setInput] = useState({
		name: '',
	});

	return (
		<div className="create-dog">
			<div className="create-dog-container">
				<div className="create-dog-container-sub">
					<div className="create-dog-start">Form to create dog breed</div>
					<div className="create-dog-mid">
						<div className="create-dog-mid-item">
							<label>Name:</label>
							<input value={input.name} name="name" type="text"></input>
						</div>
					</div>
					<div className="create-dog-end"></div>
				</div>
			</div>
		</div>
	);
}
