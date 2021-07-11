import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/views/prehome.css';
import { IoPawSharp } from 'react-icons/all';

function PreHome() {
	const history = useHistory();
	return (
		<div className="page-prehome">
			<div className="page-content">
				<div className="prehome">
					<div className="float">
						<div className="backdrop"></div>
						<div className="pop-up">
							<div className="title-container">
								<h1>Find Your Perfect Dog Breed</h1>
							</div>
							<div className="content-container">
								<p className="content-text">
									On this page you will find many breeds of dogs, their sizes,
									temperaments, ratings and more. If you are looking for your
									ideal dog, I invite you to make your own search
								</p>
								<button
									onClick={() => history.push('/home')}
									className="button-enter"
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<IoPawSharp size={20} style={{ marginRight: 10 }} />
										<span> Find my ideal dog</span>
										<IoPawSharp size={20} style={{ marginLeft: 10 }} />
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PreHome;
