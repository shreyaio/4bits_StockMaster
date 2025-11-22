import React from "react";

const mapClass = (status) => {
	if (!status) return "status-draft";
	const s = String(status).toLowerCase();
	if (s.includes("draft")) return "status-draft";
	if (s.includes("waiting")) return "status-waiting";
	if (s.includes("ready")) return "status-ready";
	if (s.includes("done")) return "status-done";
	if (s.includes("cancel")) return "status-cancelled";
	return "status-draft";
};

export default function StatusPill({ status }) {
	return <span className={`status-pill ${mapClass(status)}`}>{status}</span>;
}
