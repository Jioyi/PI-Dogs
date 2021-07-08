/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Dogs from '../components/Dogs';
import Searching from '../components/Searching';
import Pagination from '../components/Pagination';
import { getDogs, setBreed, setPage, setOrder, setOrderBy } from '../actions';
import {
	FaSearch,
	AiOutlineSortDescending,
	AiOutlineSortAscending,
	BiRename,
	GiWeight,
} from 'react-icons/all';
import '../css/views/home.css';

function Home(props) {
	useEffect(() => {
		props.getDogs({
			breed: props.dogs.breed,
			page: props.dogs.page,
			order: props.dogs.order,
			orderBy: props.dogs.orderBy,
		});
	}, []);

	useEffect(() => {
		props.getDogs({
			breed: props.dogs.breed,
			page: props.dogs.page,
			order: props.dogs.order,
			orderBy: props.dogs.orderBy,
		});
	}, [props.dogs.page, props.dogs.order, props.dogs.orderBy]);

	const handleOnChangeBreed = (e) => {
		props.setBreed(e.target.value);
	};

	const handleOnChangeOrder = (e) => {
		props.setOrder(e.target.value);
	};

	const handleOnChangeOrderBy = (e) => {
		props.setOrderBy(e.target.value);
	};

	const Search = (e) => {
		e.preventDefault();
		props.setPage(1);
		props.getDogs({
			breed: props.dogs.breed,
			page: props.dogs.page,
			order: props.dogs.order,
			orderBy: props.dogs.orderBy,
		});
	};

	return (
		<div className="home">
			<div className="search-container">
				<div className="search-sub">
					<form onSubmit={Search}>
						<div className="search-text">Find Your Perfect Dog Breed</div>
						<div className="search-blocks">
							<div className="search-blocks-sub">
								<div className="search-label">
									<input
										placeholder="what dog are you looking for?"
										className="search-input"
										onChange={handleOnChangeBreed}
										value={props.dogs.breed}
										name="breed"
										type="text"
									></input>
									<button type="submit" id="button" className="search-button">
										<FaSearch size={20} style={{ marginTop: 4 }} />
									</button>
								</div>
							</div>
							<div className="search-blocks-sub">
								<select
									value={props.dogs.orderBy}
									id="order"
									name="order"
									className="search-order-by"
									onChange={handleOnChangeOrderBy}
								>
									<option value="name">NAME</option>
									<option value="weight">WEIGHT</option>
								</select>
								<label className="search-order-label">
									{props.dogs.orderBy === 'name' ? (
										<BiRename size={20} style={{ marginTop: 9 }} />
									) : (
										<GiWeight size={20} style={{ marginTop: 9 }} />
									)}
								</label>
							</div>
							<div className="search-blocks-sub">
								<select
									value={props.dogs.order}
									id="order"
									name="order"
									className="search-order"
									onChange={handleOnChangeOrder}
								>
									<option value="ASC">ASC</option>
									<option value="DESC">DESC</option>
								</select>
								<label className="search-order-label">
									{props.dogs.order === 'DESC' ? (
										<AiOutlineSortDescending
											size={20}
											style={{ marginTop: 9 }}
										/>
									) : (
										<AiOutlineSortAscending
											size={20}
											style={{ marginTop: 9 }}
										/>
									)}
								</label>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="result-container">
				{props.dogs.totalResults > 8 ? <Pagination /> : null}
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
		setBreed: (payload) => dispatch(setBreed(payload)),
		setPage: (payload) => dispatch(setPage(payload)),
		setOrder: (payload) => dispatch(setOrder(payload)),
		setOrderBy: (payload) => dispatch(setOrderBy(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
