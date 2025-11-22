import React from "react";
import { useNavigate } from "react-router-dom";

const ReceiptsList = () => {
	const navigate = useNavigate();

	return (
		<div className="page-container">
			<div className="flex-between" style={{ marginBottom: '24px' }}>
				<h1 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text)' }}>Receipts</h1>
				<div>
					<button className="btn btn-primary" onClick={() => navigate('/operations/receipts/new')}>NEW</button>
				</div>
			</div>

			<div className="card" style={{ textAlign: 'center', color: 'var(--muted)' }}>
				<p>Receipts listing is not yet wired to the API. Visit individual receipts to create or edit.</p>
			</div>
		</div>
	);
};

export default ReceiptsList;
