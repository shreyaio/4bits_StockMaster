import React from "react";

export default function Modal({ open, onClose, children, className = "" }) {
	if (!open) return null;

	return (
		<div className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}>
			<div className="absolute inset-0 bg-black/30" onClick={onClose} />
			<div className="bg-white rounded-lg p-4 z-10 max-w-2xl w-full">{children}</div>
		</div>
	);
}
