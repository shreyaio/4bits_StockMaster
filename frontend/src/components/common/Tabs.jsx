import React from "react";

export default function Tabs({ tabs = [], active = 0, onChange = () => {} }) {
	return (
		<div className="flex gap-2">
			{tabs.map((t, i) => (
				<button
					key={t.key || i}
					onClick={() => onChange(i)}
					className={`px-3 py-1 rounded-md ${i === active ? "bg-[var(--primary)] text-white" : "bg-[var(--surface)]"}`}
				>
					{t.label}
				</button>
			))}
		</div>
	);
}
