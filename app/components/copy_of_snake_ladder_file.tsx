"use client";
import { useEffect, useState } from "react";
// import R from "../R.jpeg"\
// import { io } from "socket.io-client";
import Image from "next/image";
// import { io } from "socket.io-client";
// import writeUserData from "../components/writeUserData";
import { onValue, ref, update } from "firebase/database";
import database from "@/database/firebase";
import { PointDisplay, Pieces } from "../components/pieces";
import {img} from "../lib/variables";
import { Timestamp } from "firebase/firestore";

export default function SnakeAndLadder() {
	const [user, setUser] = useState<"a" | "b">("a");
	const [turn, setTurn] = useState(false);
	// const [movesProgress, setmovesProgress] = useState("end");
	const [user_id, setUserId] = useState('')
	const [opponent_id, setOpponent_id] = useState('')
	// const [temp_hold_of_turn_changes_in_middle_of_game, setTemp_hold_of_turn_changes_in_middle_of_game] = useState(false)
	useEffect(()=>{
		setUserId(localStorage.getItem('user_id') || '')
		setOpponent_id(localStorage.getItem('opponent_id') || '')
	},[])

	const snakeArr = [
		{ start: 17, end: 7 },
		{ start: 62, end: 19 },
		{ start: 54, end: 34 },
		{ start: 64, end: 60 },
		{ start: 87, end: 36 },
		{ start: 93, end: 73 },
		{ start: 95, end: 75 },
		{ start: 98, end: 79 },
	];
	const ladderArr = [
		{ start: 1, end: 38 },
		{ start: 4, end: 14 },
		{ start: 9, end: 31 },
		{ start: 21, end: 42 },
		{ start: 51, end: 67 },
		{ start: 26, end: 84 },
		{ start: 72, end: 91 },
		{ start: 80, end: 99 },
	];

	const [users, setUsers] = useState({
		a: {
			movement: { x: -5, y: 0 },
			points: 0,
			steps: 0,
			increment: "right",
			total: 0,
			progress: "forward",
			intensity: "normal",
		},
		b: {
			movement: { x: -5, y: 0 },
			points: 0,
			steps: 0,
			increment: "right",
			total: 0,
			progress: "forward",
			intensity: "normal",
		},
	});

	// Update users state with this reusable function
	function updateUsers(x:number = users[user].movement.x, y:number = users[user].movement.y, points:number, steps:number, increment:string = "a", total:number, progress:string, intensity:string){
		
	}

	// // Check user's turn and toggle based on it
	// useEffect(() => {
	// 	onValue(ref(database, `players/${user_id}`), (snapshot) => {
	// 		if (snapshot.exists() && snapshot.val()) {
	// 			const turn_val = snapshot.val().turn;
	// 			console.log('1st-> turn check', turn_val)
	// 			setTurn(turn_val);
	// 			// setUser(turn_val ? 'a' : 'b');
	// 		}
	// 	});
	// },[user_id]);


	useEffect(() => {
		const dbRef = ref(database, `players/${user_id}`);
		const unsubscribe = onValue(dbRef, (snapshot) => {
		  if (snapshot.exists()) {
		    const turn_val = snapshot.val()?.turn; // Fallback
		    console.log('Turn check:', turn_val);
		    setTurn(turn_val);
		  }
		});
	    
		return unsubscribe; // Cleanup
	    }, [user_id]);

	// Based on turn the user will change.
	useEffect(()=>{
		setUser(turn ? "a" : "b")
	}, [turn])


	


	// Updating opponent moves in the UI by fetching the latest data from backend
	useEffect(()=>{
		onValue(ref(database, `/players/${opponent_id}`), (snapshot)=>{

			// This function won't run when user is A because Turn would be true at that time.
			if(snapshot.exists() && !turn && snapshot.val().steps > 0){
				const prgrs_or_intens = snapshot.val().progressOrIntensity
				let intensity = '', progress = '';
				
				switch(prgrs_or_intens){
					case 'jump_forward':
						intensity = 'fast';
						progress = 'forward';
					 	break;
					case 'jump_backward':
						intensity = 'fast';
						progress = 'backward';
						break;
					default: break;
				}

				// // We are seeting B as user because it is B's turn
				// setUser("b");

				// We are getting progress report of B
				setUsers((users)=>({
					...users,
					b:{
						...users.b,
						steps:snapshot.val().steps,
						intensity:intensity || users.b.intensity,
						progress: progress || users.b.progress
					}
				}))
				console.log('1st->OPPONENT_CONSOLE:-change in opponent')
			}
		})
	},[opponent_id, turn])

	useEffect(() => {
		// console.log('3rd-> checking the biggest one')

		// Creating interface-like variables to not right common keywords again.
		let increment = users?.[user].increment;
		let progress = users?.[user].progress;
		let steps = users?.[user].steps;
		let intensity = users?.[user].intensity;
		let total = users?.[user].total;
		let x_axis = users?.[user].movement.x;
		let y_axis = users?.[user].movement.y;
		// const movement = users?.[user].movement;
		const timeOut = intensity === "normal" ? 300 : 0;

		if(steps > 0){
			setTimeout(async () => {
				console.log("movement happening");
				// function change_user_state(movement_axis:'x' | 'y',movement_point:number, increment_param?:'left' | 'right' ){
				// 	setUsers((users) => ({
				// 		...users,
				// 		[user]: {
				// 			...users?.[user],
				// 			movement: {
				// 				...movement,
				// 				[movement_axis]: movement_point,
				// 			},
				// 			increment: increment_param || increment,
				// 		},
				// 	}));
				// }

				if (
					x_axis === 5 &&
					increment === "left" &&
					progress === "forward"
				) {
					console.log("x:5,left,forward");
					// change_user_state('y', y_axis + 10, 'right')
					// setUsers((users) => ({
					// 	...users,
					// 	[user]: {
					// 		...users?.[user],
					// 		movement: {
					// 			...movement,
					// 			y: y_axis + 10,
					// 		},
					// 		increment: "right",
					// 	},
					// }));

					// new way start
					y_axis+= 10;
					increment = 'right';
					// new way end
				} else if (
					x_axis === 95 &&
					increment === "right" &&
					progress === "forward"
				) {
					console.log("x:105,right,forward");
					// change_user_state('y', y_axis+10, 'left')
					// setUsers((users) => ({
					// 	...users,
					// 	[user]: {
					// 		...users?.[user],
					// 		movement: {
					// 			...movement,
					// 			y: y_axis + 10,
					// 		},
					// 		increment: "left",
					// 	},
					// }));

					// new way start
					y_axis+= 10;
					increment = "left";
					// new way end

				} else if (
					x_axis === 95 &&
					increment === "right" &&
					progress === "backward"
				) {
					console.log("x:105,right,backward");
					// change_user_state('y', y_axis - 10, 'left')
					// setUsers((users) => ({
					// 	...users,
					// 	[user]: {
					// 		...users?.[user],
					// 		movement: {
					// 			...movement,
					// 			y: y_axis - 10,
					// 		},
					// 		increment: "left",
					// 	},
					// }));

					// new way start
					y_axis-= 10;
					increment = "left";
					// new way end
				} else if (
					x_axis === 5 &&
					increment === "left" &&
					progress === "backward"
				) {
					console.log("x:5,left,backward");
					// change_user_state('y', y_axis - 10, 'right')
					// setUsers((users) => ({
					// 	...users,
					// 	[user]: {
					// 		...users?.[user],
					// 		movement: {
					// 			...movement,
					// 			y: y_axis - 10,
					// 		},
					// 		increment: "right",
					// 	},
					// }));

					// new way start
					y_axis-= 10;
					increment = "right";
					// new way end
				} else {
					console.log('normal condition')
					// change_user_state('x', x_axis_based_on_increment)
					// setUsers((users) => ({
					// 	...users,
					// 	[user]: {
					// 		...users?.[user],
					// 		movement: {
					// 			...movement,
					// 			x:
					// 				increment === "left"
					// 					? x_axis - 10
					// 					: x_axis + 10,
					// 		},
							// increment: 'right'
					// 	},
					// }));

					// new way start
					x_axis +=increment === "left" ? -10 : 10;
					// new way end
				}
				
				function snake_ladder(
					snakeOrLadder: { start: number; end: number }[],
					whichOne: string
				) {
					let Did_stumple_upon_snake_ladder = false;
					const snake_ladder = snakeOrLadder.find(
						(obj) => obj.start === total + 1
					);
					console.log("good boy", snake_ladder);
					if (snake_ladder) {
						Did_stumple_upon_snake_ladder = true;
						const start = snake_ladder.start;
						const end = snake_ladder.end;
						
						// setUsers((users) => ({
						// 	...users,
						// 	[user]: {
						// 		...users?.[user],
						// 		steps:
						// 			whichOne === "ladder"
						// 				? end - start
						// 				: start - end,
						// 		progress:
						// 			whichOne !== "ladder"
						// 				? "backward"
						// 				: "forward",
						// 		intensity: "speedy",
						// 		increment:
						// 			whichOne !== "ladder"
						// 				? increment === "left"
						// 					? "right"
						// 					: increment ===
						// 					  "right"
						// 					? "left"
						// 					: increment
						// 				: increment,
						// 	},
						// }));

						// new way start
						steps+= whichOne === "ladder" ? end - start : start - end;
						progress = whichOne !== "ladder" ? "backward" : "forward";
						intensity = "speedy";
						increment = whichOne !== "ladder" ? increment === "left" ? "right" : increment === "right" ? "left" : increment : increment
						// new way end
					}
					return Did_stumple_upon_snake_ladder;
				}
	
				// Some functionalities that we have to make sure of at the end of complete rotation of user chance.
				if(steps -1 == 0){
					// setUsers((users) => ({
					// 			...users,
					// 			[user]: {
					// 				...users?.[user],
					// 				intensity: "normal",
					// 				progress: "forward",
					// 				increment:
					// 					progress === "backward"
					// 						? increment === "left"
					// 							? "right"
					// 							: increment === "right"
					// 							? "left"
					// 							: increment
					// 						: increment,
					// 			},
					// })); 

					// new way start
					intensity = "normal";
					progress = "forward";
					increment = progress === "backward" ? increment === "left" ? "right" : increment === "right" ? "left" : increment : increment;
					// new way end

					const snake = snake_ladder(snakeArr, "snake");
					const ladder = snake_ladder(ladderArr, "ladder");

					// // If this is the last movement of A's piece, we change the turn.
					// if(!snake && !ladder && user == 'a'){
					// 	const updates:Record<string, boolean> = {};
					// 	updates[`/players/${user_id}/turn`] = false;
					// 	updates[`/players/${opponent_id}/turn`] = true;
					// 	try{
					// 		await update(ref(database), updates);
					// 		 setTurn(!turn)
					// 		console.log('tables turned successfully')
					// 	}catch(error){
					// 		console.log(error)
					// 	}
					// 	// setmovesProgress('end')
					// }

					// Turn of opponent came
					if(!snake && !ladder){
						 setTurn(!turn);
						 console.log('turn of opponent')
						}
				}

				// At every iteration reduce the steps as they are the sole reason of iteration and also maintain total after every iteration.
				// setUsers((users) => ({
				// 	...users,
				// 	[user]: {
				// 		...users?.[user],
				// 		steps: steps - 1,
				// 		total:
				// 			progress === "forward"
				// 				? total + 1
				// 				: total - 1,
				// 	},
				// }));

				// new way start
				steps-= 1;  // Reduce steps at every iteration 
				total += progress === "forward"? +1 : -1  // Increase/   decrease total on the basis of progress 
				setUsers((users) => ({
					...users,
					[user]: {
						increment:increment,
						progress:progress,
						intensity:intensity,
						movement:{
							x_axis:x_axis,
							y_axis:y_axis
						},
						steps: steps,
						total: total
							// progress === "forward"
							// 	? total + 1
							// 	: total - 1,
					},
				})); 
				// new way end

				// Testing purpose
				console.log(users[user])

				if (total + 1 === 100) console.log("A won");
			}, timeOut);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [users?.[user].steps]);

	// console.log("A's turn complete:-turn-> " +turn)

	// This function is reponsible for updating the turn state only when opponent/user has completed his moves and we have turn state stored in temp_hold_of_turn_changes_in_middle_of_game state variable.
	// useEffect(()=>{
	// 	console.log('2nd-> checking movesProgress')
	// 	if(movesProgress == 'end' && user == 'b')setTurn(temp_hold_of_turn_changes_in_middle_of_game);
	// },[temp_hold_of_turn_changes_in_middle_of_game, movesProgress])

	async function roll_dice(){
		const count = Math.floor(Math.random() * 6) + 1;
		setUsers((users) => ({
			...users,
			a: {
				...users?.a,
				points: count,
				steps: count,
			},
		}));
		const updates:Record<string, string | number> = {};
		updates['/timestamp'] = Timestamp.now().seconds;
		updates['/steps'] = count;
		// setmovesProgress('start')
		try{await update(ref(database, `/players/${user_id}`),updates); console.log('1st->updated success after ROLL')}catch(error){console.error(error)}
	}
	return (
		<>
			<div className="h-screen flex p-5 justify-evenly">
				<PointDisplay
					turn={turn}
					points={users.a.points}
					player={"a"}
				/>
				<div className="relative">
					<Image
						alt="img"
						width={1000}
						height={1000}
						className="w-auto h-full"
						src={img}
					></Image>

					<Pieces
						x_axis={users?.a.movement.x}
						y_axis={users?.a.movement.y}
						player={"a"}
					/>
					<Pieces
						x_axis={users?.b.movement.x}
						y_axis={users?.b.movement.y}
						player={"b"}
					/>
					{/* <div
						style={{
							left: `${String(
								users?.a.movement.x
							)}%`,
							bottom: `${String(
								users?.a.movement.y
							)}%`,
						}}
						className={`absolute -translate-y-2/4 -translate-x-2/4 transition-all duration-200 z-20 bg-pink-500 w-[5%] h-[5%] rounded-full`}
					></div>
					<div
						style={{
							left: `${String(
								users.b.movement.x
							)}%`,
							bottom: `${String(
								users.b.movement.y
							)}%`,
						}}
						className={` absolute -translate-y-2/4 -translate-x-2/4 transition-all duration-200 z-20 bg-blue-500 w-[5%] h-[5%] rounded-full`}
					></div> */}
					{/* </div>
						))}
					</div> */}
				</div>

				<PointDisplay
					turn={turn}
					points={users.b.points}
					player={"b"}
				/>
			</div>
			<button
				disabled={!turn}
				className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
				onClick={roll_dice}
			>
				Roll Dice
			</button>
		</>
	);
}
