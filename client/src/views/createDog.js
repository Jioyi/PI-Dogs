/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTemperaments, createDog, setCreateResponse } from '../actions';
import '../css/views/createDog.css';

function CreateDog(props) {
	const [input, setInput] = useState({
		name: '',
		heightMin: '',
		heightMax: '',
		weightMin: '',
		weightMax: '',
		lifeSpan: '',
		image: '',
		temperaments: [],
	});

	const [errors, setErrors] = useState({});

	useEffect(() => {
		props.getTemperaments();
		return () => {
			props.setCreateResponse('');
		};
	}, []);

	function validateInputs(input) {
		let errors = {};
		let patternName = new RegExp(/^[A-Za-z\s]+$/g);
		let patternNumber = new RegExp('^[0-9]+$', 'i');
		//let pattern = new RegExp('^[A-Z]+$', 'i');
		if (!input.name) {
			errors.name = 'write a name please!';
		} else if (!patternName.test(input.name)) {
			errors.name =
				'only alphabetic characters and space are allowed for the name!';
		}
		if (!input.heightMin) {
			errors.heightMin = 'write a height min please!';
		} else if (!patternNumber.test(input.heightMin)) {
			errors.heightMin = 'only numeric characters are allowed and no spaces!';
		}
		if (!input.heightMax) {
			errors.heightMax = 'write a height max please!';
		} else if (!patternNumber.test(input.heightMax)) {
			errors.heightMax = 'only numeric characters are allowed and no spaces!';
		}
		if (!input.weightMin) {
			errors.weightMin = 'write a weight min please!';
		} else if (!patternNumber.test(input.weightMin)) {
			errors.weightMin = 'only numeric characters are allowed and no spaces!';
		}
		if (!input.weightMax) {
			errors.weightMax = 'write a weight max please!';
		} else if (!patternNumber.test(input.weightMax)) {
			errors.weightMax = 'only numeric characters are allowed and no spaces!';
		}
		return errors;
	}

	const handleOnChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validateInputs({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	};

	const handleOnChangeCheckBox = (e) => {
		if (e.target.checked) {
			setInput({
				...input,
				temperaments: [...input.temperaments, e.target.name],
			});
		} else {
			setInput({
				...input,
				temperaments: input.temperaments.filter(function (temp) {
					return temp !== e.target.name;
				}),
			});
		}
	};

	const checkForm = () => {
		if (
			input.name !== '' &&
			input.heightMin !== '' &&
			input.heightMax !== '' &&
			input.weightMin !== '' &&
			input.weightMax !== '' &&
			Object.keys(errors).length === 0
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (checkForm()) {
			props.createDog(input);
		}
	};

	return (
		<div className="create-dog">
			<div className="create-dog-container">
				<div className="create-dog-container-sub">
					<div className="create-dog-start">Form to create dog breed</div>
					<form onSubmit={handleOnSubmit}>
						<div className="create-dog-mid">
							<div className="create-dog-mid-item">
								<label className="create-dog-label">Name:</label>
								<div className="create-dog-input">
									<input
										value={input.name}
										name="name"
										type="text"
										onChange={handleOnChange}
									></input>
									{errors.name ? errors.name : null}
								</div>
							</div>
							<div className="create-dog-mid-item">
								<label className="create-dog-label">Height min(cm):</label>
								<div className="create-dog-input">
									<input
										value={input.heightMin}
										name="heightMin"
										type="text"
										onChange={handleOnChange}
									></input>
									{errors.heightMin ? errors.heightMin : null}
								</div>
							</div>
							<div className="create-dog-mid-item">
								<label className="create-dog-label">Height max(cm):</label>
								<div className="create-dog-input">
									<input
										value={input.heightMax}
										name="heightMax"
										type="text"
										onChange={handleOnChange}
									></input>
									{errors.heightMax ? errors.heightMax : null}
								</div>
							</div>
							<div className="create-dog-mid-item">
								<label className="create-dog-label">Weight min(kg):</label>
								<div className="create-dog-input">
									<input
										value={input.weightMin}
										name="weightMin"
										type="text"
										onChange={handleOnChange}
									></input>
									{errors.weightMin ? errors.weightMin : null}
								</div>
							</div>
							<div className="create-dog-mid-item">
								<label className="create-dog-label">Weight max(kg):</label>
								<div className="create-dog-input">
									<input
										value={input.weightMax}
										name="weightMax"
										type="text"
										onChange={handleOnChange}
									></input>
									{errors.weightMax ? errors.weightMax : null}
								</div>
							</div>
							<div className="create-dog-mid-item">
								<label className="create-dog-label">
									Life span(in years, example: 9 - 10):
								</label>
								<div className="create-dog-input">
									<input
										value={input.lifeSpan}
										name="lifeSpan"
										type="text"
										onChange={handleOnChange}
									></input>
								</div>
							</div>
							<div className="create-dog-mid-item">
								<label className="create-dog-label">Image(url):</label>
								<div className="create-dog-input">
									<input
										value={input.image}
										name="image"
										type="text"
										onChange={handleOnChange}
									></input>
								</div>
							</div>
							<div className="create-dog-mid-item">
								<label className="create-dog-label">Temperaments:</label>
								<div className="create-dog-input2">
									{props.dogs.temperaments.map((temp, i) => (
										<div className="create-dog-temp-block" key={i}>
											<input
												onChange={handleOnChangeCheckBox}
												type="checkbox"
												defaultChecked={false}
												name={temp.name}
											/>
											<label>{temp.name}</label>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="create-dog-mid2">
							<button type="submit" className="create-dog-button">
								Create Dog
							</button>
						</div>
						{props.dogs.createResponse !== '' ? (
							<div className="create-dog-mid2">
								{props.dogs.createResponse === 'successful' ? (
									<div className="text-successful">
										successfully created dog breed!
									</div>
								) : props.dogs.createResponse === 'exist' ? (
									<div className="text-danger">That race already exists!</div>
								) : (
									<div className="text-danger">
										failed when trying to create dog breed!
									</div>
								)}
							</div>
						) : null}
					</form>
					<div className="create-dog-end"></div>
				</div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		dogs: state.dogs,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getTemperaments: (payload) => dispatch(getTemperaments(payload)),
		createDog: (payload) => dispatch(createDog(payload)),
		setCreateResponse: (payload) => dispatch(setCreateResponse(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDog);
