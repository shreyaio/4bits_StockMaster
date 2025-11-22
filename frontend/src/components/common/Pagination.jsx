import React from "react";

export default function Pagination({ page = 1, total = 1, onChange = () => {} }) {
	return (
		<div className="flex items-center gap-2">
			<button className="btn btn-surface" onClick={() => onChange(Math.max(1, page - 1))}>
				Prev
			</button>
			<div className="px-3">{page} / {total}</div>
			<button className="btn btn-surface" onClick={() => onChange(Math.min(total, page + 1))}>
				Next
			</button>
		</div>
	);
}
