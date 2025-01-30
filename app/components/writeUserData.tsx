import { getDatabase, ref, set } from "firebase/database";

export default function writeUserData(
	userId: string,
	increment: string,
	progress: string,
	steps: number,
	intensity: string,
	total: number,
	x_axis: number,
	y_axis: number,
	timeOut: number
) {
	const db = getDatabase();
	set(ref(db, "users/" + userId), {
		_id: userId,
		increment: increment,
		progress: progress,
		steps: steps,
		intensity: intensity,
		total: total,
		x_axis: x_axis,
		y_axis: y_axis,
		timeOut: timeOut,
	});
}
