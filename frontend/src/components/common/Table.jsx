import React from "react";

export default function Table({ columns = [], data = [], renderRow }) {
	return (
		<div className="rounded-xl shadow-md bg-[var(--surface)] overflow-hidden">
			<table className="w-full text-left">
				<thead className="text-sm text-[var(--muted)] border-b">
					<tr>
						{columns.map((c) => (
							<th key={c.key || c.label} className="p-4">{c.label}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data.map((row, idx) => (
						<tr key={row.id || idx} className="hover:bg-[rgba(43,134,255,0.06)] transition">
							{renderRow ? renderRow(row) : columns.map((c) => <td key={c.key} className="p-4">{row[c.key]}</td>)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
