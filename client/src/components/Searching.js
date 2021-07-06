import React from 'react';
import '../css/components/Searching.css';
import searchingImg from '../assets/images/searching.gif';
export default function Searching() {
	return (
		<div className="searching-container">			
			<img className="searching-img" src={searchingImg} alt="searching" />
            <h1 className="searching-text">Searching ...</h1>
		</div>
	);
}
