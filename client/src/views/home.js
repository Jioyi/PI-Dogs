/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Dogs from '../components/Dogs';
import Searching from '../components/Searching';
import Pagination from '../components/Pagination';
import { getDogs, getTemperaments, getBreedGroups, setPage } from '../actions';
import {
	FaSearch,
	AiOutlineSortDescending,
	AiOutlineSortAscending,
	BiRename,
	GiWeight,
	AiOutlineGroup,
	RiEmotionLine,
} from 'react-icons/all';
import '../css/views/home.css';

function Home(props) {
	const [filters, setFilters] = useState({
		breed: '',
		order: 'ASC',
		orderBy: 'name',
		filter: 'All',
		filterBy: 'temperament',
	});

	useEffect(() => {
		props.getTemperaments();
		props.getBreedGroups();
		props.getDogs(filters);
	}, []);

	useEffect(() => {
		props.getDogs({
			...filters,
			page: props.dogs.page,
		});
	}, [props.dogs.page]);

	const handleOnChange = (e) => {
		if (e.target.name === 'filterBy') {
			setFilters({
				...filters,
				[e.target.name]: e.target.value,
				filter: 'All',
			});
		} else {
			setFilters({
				...filters,
				[e.target.name]: e.target.value,
			});
		}
	};

	const Search = (e) => {
		e.preventDefault();
		props.setPage(1);
		props.getDogs(filters);
	};

	return (
		<div className="home">
			<div className="search-container">
				<div className="search-sub">
					<form onSubmit={Search}>
						<div className="search-text">Find Your Perfect Dog Breed</div>
						<div className="search-blocks">
							<div className="search-blocks-sub">
								<label className="search-order-label">Name</label>
								<div className="search-label">
									<input
										placeholder="what dog are you looking for?"
										className="search-input"
										onChange={handleOnChange}
										value={filters.breed}
										name="breed"
										type="text"
									></input>
									<button type="submit" id="button" className="search-button">
										<FaSearch size={20} style={{ marginTop: 4 }} />
									</button>
								</div>
							</div>
						</div>
						<div className="search-blocks">
							<div className="search-blocks-sub">
								<label className="search-order-label">Order By</label>
								<select
									value={filters.orderBy}
									id="orderBy"
									name="orderBy"
									className="search-order-by"
									onChange={handleOnChange}
								>
									<option value="name">NAME</option>
									<option value="weight">WEIGHT</option>
								</select>
								<label className="search-order-label2">
									{filters.orderBy === 'name' ? (
										<BiRename size={20} style={{ marginTop: 9 }} />
									) : (
										<GiWeight size={20} style={{ marginTop: 8 }} />
									)}
								</label>
							</div>
							<div className="search-blocks-sub">
								<label className="search-order-label">Order</label>
								<select
									value={filters.order}
									id="order"
									name="order"
									className="search-order"
									onChange={handleOnChange}
								>
									<option value="ASC">ASC</option>
									<option value="DESC">DESC</option>
								</select>
								<label className="search-order-label2">
									{filters.order === 'DESC' ? (
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
						<div className="search-blocks">
							<div className="search-blocks-sub">
								<label className="search-order-label">Filter By</label>
								<select
									value={filters.filterBy}
									id="filterBy"
									name="filterBy"
									className="search-order-by"
									onChange={handleOnChange}
								>
									<option value="temperament">Temperament</option>
									<option value="breed_group">Breed Group</option>
								</select>
								<label className="search-order-label2">
									{filters.filterBy === 'temperament' ? (
										<RiEmotionLine size={20} style={{ marginTop: 9 }} />
									) : (
										<AiOutlineGroup size={20} style={{ marginTop: 9 }} />
									)}
								</label>
							</div>
							<div className="search-blocks-sub">
								<label className="search-order-label">Filter select</label>
								<select
									value={filters.filter}
									id="filter"
									name="filter"
									className="search-order-by"
									onChange={handleOnChange}
								>
									<option value="All">All</option>
									{filters.filterBy === 'temperament'
										? props.dogs.temperaments.map((temp, i) => (
												<option key={i} value={temp.name}>
													{temp.name}
												</option>
										  ))
										: props.dogs.breedGroups.map((temp, i) => (
												<option key={i} value={temp.name}>
													{temp.name}
												</option>
										  ))}
								</select>
								<label className="search-order-label2">
									{filters.filterBy === 'temperament' ? (
										<RiEmotionLine size={20} style={{ marginTop: 9 }} />
									) : (
										<AiOutlineGroup size={20} style={{ marginTop: 9 }} />
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
		getTemperaments: (payload) => dispatch(getTemperaments(payload)),
		getBreedGroups: (payload) => dispatch(getBreedGroups(payload)),
		setPage: (payload) => dispatch(setPage(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
