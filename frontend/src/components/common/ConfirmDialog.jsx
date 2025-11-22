import React from "react";
import Modal from "./Modal";

export default function ConfirmDialog({ open, title, message, onConfirm, onClose }) {
	return (
		<Modal open={open} onClose={onClose}>
			<div>
				<h3 className="text-lg font-semibold mb-2">{title}</h3>
				<p className="text-sm text-[var(--muted)] mb-4">{message}</p>
				<div className="flex gap-2 justify-end">
					<button className="btn btn-surface" onClick={onClose}>Cancel</button>
					<button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
				</div>
			</div>
		</Modal>
	);
}

