import React from "react";

export default function Select({ className = "", children, ...props }) {
	return (
		<select className={`p-2 border rounded-md ${className}`} {...props}>
			{children}
		</select>
	);
}
