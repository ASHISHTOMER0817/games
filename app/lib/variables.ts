export const img = "https://th.bing.com/th/id/R.9815f360000e51b5fac089785b9616d5?rik=DVXP6lUTMK5JdQ&riu=http%3a%2f%2fst.depositphotos.com%2f1508955%2f4164%2fv%2f950%2fdepositphotos_41642213-stock-illustration-snakes-and-ladders-board-game.jpg&ehk=jPO0gAvEj6KjCZ0ZRist3DajdSdpkJduRczu86%2fyU4U%3d&risl=&pid=ImgRaw&r=0"

// Interface of Player data
 export interface playerData{
      steps: number,
      // progressOrIntensity: string,
      turn: boolean,
      timestamp: number | string,
      opponent: null | string | number,

}


// useEffect(() => {
	// 	if (!id || !gameId) return;

	// 	const userRef = ref(database, `users/${gameId}/${id}`);
	// 	if (gameProgress === "end") {
	// 		update(userRef, {
	// 			increment: users.a.increment,
	// 			progress: users.a.progress,
	// 			steps: users.a.steps,
	// 			intensity: users.a.intensity,
	// 			total: users.a.total,
	// 			turn: users.a.steps === 0 ? false : true,
	// 			movement: {
	// 				x: users.a.movement.x,
	// 				y: users.a.movement.y,
	// 			},
	// 		})
	// 			.then(() =>
	// 				console.log("User data updated successfully!")
	// 			)
	// 			.catch((error) =>
	// 				console.error("Error updating user data:", error)
	// 			);
	// 	}
	// }, [
	// 	gameId,
	// 	gameProgress,
	// 	id,
	// 	users.a.increment,
	// 	users.a.intensity,
	// 	users.a.movement.x,
	// 	users.a.movement.y,
	// 	users.a.progress,
	// 	users.a.steps,
	// 	users.a.total,
	// ]);

	// useEffect(() => {
	// 	if (!id || !gameId) return;

	// 	const userRef = ref(
	// 		database,
	// 		`users/${gameId}/${
	// 			id === "firstKey" ? "secondKey" : "firstKey"
	// 		}`
	// 	);
	// 	if (turn && !users.a.steps && gameProgress === "end") {
	// 		console.log("how could you 2nd");
	// 		update(userRef, {
	// 			turn: true,
	// 		})
	// 			.then(() =>
	// 				console.log("User data updated successfully!")
	// 			)
	// 			.catch((error) =>
	// 				console.error("Error updating user data:", error)
	// 			);
	// 	}
	// }, [gameId, gameProgress, id, turn, users.a.steps]);