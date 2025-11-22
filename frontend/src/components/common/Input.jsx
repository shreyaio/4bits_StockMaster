import React from "react";

export default function Input({ className = "", ...props }) {
	return <input className={`p-2 border rounded-md ${className}`} {...props} />;
}
