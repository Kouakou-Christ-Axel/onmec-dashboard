export function formatDateTime(date: Date | string) {
	const goodDate = new Date(date);
	return goodDate.toLocaleDateString();
}