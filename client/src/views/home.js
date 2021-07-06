/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Dogs from '../components/Dogs';
import Searching from '../components/Searching';
import { getDogs, getDogsForBreed } from '../actions';
import { FaSearch } from 'react-icons/fa';
import '../css/views/home.css';

function Home(props) {
	const [input, setInput] = useState({
		breed: '',
	});

	useEffect(() => {
		props.getDogs();
		/*return () => {
			props.getDogs();
		};*/
	}, []);

	useEffect(() => {
		//console.log(props.dogs);
		/*return () => {
			props.getDogs();
		};*/
	}, [props.dogs]);

	const handleOnChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	};

	const Search = () => {
		props.getDogsForBreed(input.breed);
	};

	return (
		<div className="home">
			<div className="search-container">
				<div className="search-sub">
					<div className="search-text">Find Your Perfect Dog Breed</div>
					<div className="search-label">
						<input
							placeholder="what dog are you looking for?"
							className="search-input"
							onChange={handleOnChange}
							value={input.breed}
							name="breed"
							type="text"
						></input>
						<button
							id="button"
							className="search-button"
							onClick={() => {
								Search();
							}}
						>
							<FaSearch size={20} style={{ marginTop: 4 }} />
						</button>
					</div>
				</div>
			</div>
			<div className="result-container">
				{props.dogs.loading ? <Searching /> : <Dogs dogs={props.dogs.list} />}
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
		getDogs: (payload) => dispatch(getDogs(payload)),
		getDogsForBreed: (payload) => dispatch(getDogsForBreed(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
