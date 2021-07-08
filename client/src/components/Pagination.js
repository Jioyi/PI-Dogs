import React from 'react';
import { connect } from 'react-redux';
import { setPage } from '../actions';
import '../css/components/Pagination.css';

function Pagination(props) {
	let startPage, endPage;
	const maxPages = 8;
	const totalPages = Math.ceil(props.dogs.totalResults / 8);

    if (totalPages <= maxPages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (props.dogs.page <= maxPagesBeforeCurrentPage) {
            startPage = 1;
            endPage = maxPages;
        } else if (props.dogs.page + maxPagesAfterCurrentPage >= totalPages) {
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            startPage = props.dogs.page - maxPagesBeforeCurrentPage;
            endPage = props.dogs.page + maxPagesAfterCurrentPage;
        }
    }


	let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
		(i) => startPage + i
	);

	function next() {
		props.setPage(props.dogs.page + 1);
	}

	function prev() {
		props.setPage(props.dogs.page - 1);
	}

	function select(e) {
		props.setPage(parseInt(e.target.textContent));
	}

	return (
		<div className="pagination-container">
			{props.dogs.page !== 1 ? <button className="button-pagination" onClick={prev}>Prev</button> : null}
			{pages.map((pagemap) =>
				pagemap === props.dogs.page ? (
					<button className="button-pagination-select" key={pagemap}>{pagemap}</button>
				) : (
					<button className="button-pagination" key={pagemap} onClick={select}>
						{pagemap}
					</button>
				)
			)}
			{props.dogs.page !== totalPages ? (
				<button className="button-pagination" onClick={next}>Next</button>
			) : null}
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
		setPage: (payload) => dispatch(setPage(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
