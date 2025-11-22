import React from "react";

export default function Badge({ children, className = "" }) {
	return (
		<span className={`inline-block px-2 py-1 rounded-md text-sm bg-[var(--surface)] ${className}`}>
			{children}
		</span>
	);
}
