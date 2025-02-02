import { getDatabase, ref, update } from "firebase/database";


export default function writeUserData(
	userId:string,
	gameId: string,
	increment: string,
	progress: string,
	steps: number,
	intensity: string,
	total: number,
	x_axis: number,
	y_axis: number,
	// timeOut: number,
	opponentId?: string,
) {

	const db = getDatabase();
	const userRef = ref(db, `users/${gameId}/`)
	update(userRef,{[userId]: {
		// _id: userId,
		increment: increment,
		progress: progress,
		steps: steps,
		intensity: intensity,
		total: total,
		movement:{
			x:x_axis,
			y:y_axis,
		},
		// x_axis: x_axis,
		// y_axis: y_axis,
		// timeOut: timeOut,
		turn:false 
	}});
	if(opponentId){
		update(ref(db,`users/${gameId}/${opponentId}`), {
					turn: true
		})
	}
}


 
