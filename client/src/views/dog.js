/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDog, setDog } from '../actions';
import '../css/views/dog.css';

import PageDog from '../components/PageDog';

function Dog(props) {
	useEffect(() => {
		props.getDog(props.match.params.dogId);
		return () => {
			props.setDog(null);
		};
	}, []);

	return props.dogs.dog ? (
		<div className="page-dog">
			<PageDog dog={props.dogs.dog} />
		</div>
	) : null;
}

function mapStateToProps(state) {
	return {
		dogs: state.dogs,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getDog: (payload) => dispatch(getDog(payload)),
		setDog: (payload) => dispatch(setDog(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dog);
