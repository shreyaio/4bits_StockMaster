import React from "react";
import { useNavigate } from "react-router-dom";

const ReceiptsList = () => {
	const navigate = useNavigate();

	return (
		<div className="p-6 w-full">
			<div className="flex-between mb-6">
				<h1 className="text-[24px] font-semibold text-[var(--text)]">Receipts</h1>
				<div>
					<button className="btn btn-primary" onClick={() => navigate('/operations/receipt/new')}>NEW</button>
				</div>
			</div>

			<div className="rounded-xl shadow-md bg-[var(--surface)] overflow-hidden p-6 text-center text-[var(--muted)]">
				Receipts listing is not yet wired to the API. Visit individual receipts to create or edit.
			</div>
		</div>
	);
};

export default ReceiptsList;
