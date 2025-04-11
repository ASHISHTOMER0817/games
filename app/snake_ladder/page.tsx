"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { child, get, onValue, ref, update } from "firebase/database";
import database from "@/database/firebase";
import { PointDisplay, Pieces } from "../components/pieces";
import {img} from "../lib/variables";
import { Timestamp } from "firebase/firestore";

export default function SnakeAndLadder() {
	const [user, setUser] = useState<"a" | "b">("a");
	const user_id = localStorage.getItem('user_id') || '';
	const opponent_id = localStorage.getItem('opponent_id') || '';
	const [opening_design, setOpening_design] = useState<{bottom:string, left:string, opacity:number}[]>([]);
	const [overview_done, setOverview_done] = useState(false);
	const [opening_design_count, setOpening_design_count] = useState(0);
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
			user:'a',
			movement: { x: -5, y: 0 },
			points: 0,
			steps: 0,
			increment: "right",
			total: 0,
			progress: "forward",
			intensity: "normal",
			all_moves:[],
		},
		b: {
			user:'b',
			movement: { x: -5, y: 0 },
			points: 0,
			steps: 0,
			increment: "right",
			total: 0,
			progress: "forward",
			intensity: "normal",
			all_moves:[],
		},
	});

	useEffect(()=>{
		const dbRef = ref(database);
		// console.log(user_id)
		async function getTurn(){
			try{
				await get(child(dbRef,`/players/${user_id}`)).then((snapshot)=>{
					// if(!isMounted) return;
					if(snapshot.exists() && snapshot.val()){
						console.log(snapshot.val())
						const turn_val = snapshot.val()?.turn; // Fallback
						console.log('Turn check:', turn_val);
						setUser(turn_val? "a":"b");
					}
				})
			}catch(error){
				console.error(error)
			}
		}
		getTurn();
	},[user_id])

	function turn(current_user:string){
		setUser(current_user == "a" ? "b" : "a");
	}
	
	// Updating opponent moves in the UI by fetching the latest data from backend
	useEffect(()=>{
		onValue(ref(database, `/players/${opponent_id}`), (snapshot)=>{
			// This function won't run when user is A because Turn would be true at that time.
			if(snapshot.exists() && user == 'b' && snapshot.val().steps > 0){
				console.log("opponent moves" ,snapshot.val().steps)

				// We are getting progress report of B
				setUsers((users)=>({
					...users,
					b:{
						...users.b,
						steps:snapshot.val().steps,
					}
				}))

				try{
					update(ref(database, `/players/${opponent_id}`), {['steps']:0})
				}catch(error){console.error(error)}
				// After fetching the latest data set it to  
				console.log('1st->OPPONENT_CONSOLE:-change in opponent')
			}
		})
	},[opponent_id,user])

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
		const timeOut = intensity === "normal" ? 300 : 0;

		if(steps > 0){
			setTimeout(async () => {
				// console.log("movement happening");

				if ( x_axis === 5 && increment === "left" && progress === "forward") {
					y_axis += 10;
					increment = 'right';

				} else if ( x_axis === 95 && increment === "right" && progress === "forward") {
					y_axis+= 10;
					increment = "left";

				} else if ( x_axis === 95 && increment === "right" && progress === "backward") {
					y_axis-= 10;
					increment = "left";

				} else if ( x_axis === 5 && increment === "left" && progress === "backward") {
					 y_axis-= 10;
					  increment = "right";

				} else {; x_axis +=increment === "left" ? -10 : 10; }
				
				function snake_ladder( snakeOrLadder: { start: number; end: number }[], whichOne: string ){
					let Did_stumple_upon_snake_ladder = false;
					const snake_ladder = snakeOrLadder.find(
						(obj) => obj.start === total
					);
					// console.log("good boy", snake_ladder);
					if (snake_ladder) {
						Did_stumple_upon_snake_ladder = true;
						const start = snake_ladder.start;
						const end = snake_ladder.end;

						steps+= whichOne === "ladder" ? end - start : start - end;
						progress = whichOne !== "ladder" ? "backward" : "forward";
						intensity = "speedy";
						increment = whichOne !== "ladder" ? increment === "left" ? "right" : increment === "right" ? "left" : increment : increment
					}
					return Did_stumple_upon_snake_ladder;
				}

				steps-= 1;  // Reduce steps at every iteration 
				total += progress === "forward"? +1 : -1  // Increase/decrease total on the basis of progress 

				// Some functionalities that we have to make sure of at the end of complete rotation of user chance.
				if(steps === 0){

					// Bring the movement back to normal
					intensity = "normal";
					increment = progress == "backward" ? increment == "left" ? "right" : "left": increment; //Wrote increment before progress because increment depends upon it
					progress = "forward";

					const snake = snake_ladder(snakeArr, "snake");
					const ladder = snake_ladder(ladderArr, "ladder");

					// Turn of opponent came
					if(!snake && !ladder){
						// setTurn(!turn);
						turn(user)
						console.log('opponent turn came')
					}
				}

				// At the end of useEffect update the state of the user/opponent
				setUsers((users) => ({
					...users,
					[user]: {
						...users[user],
						increment:increment,
						progress:progress,
						intensity:intensity,
						movement:{
							x:x_axis,
							y:y_axis
						},
						steps: steps,
						total: total
					},
				}));

				// Testing purpose
				console.log(`user ${user} needs to take ${users[user].steps} more` )
			}, timeOut);
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [users[user]?.steps]);

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

		// Adding steps to the user's steps arr
		setUsers((users)=>({
			...users,
			[user]:{
				...users[user],
				all_moves:[...users[user].all_moves, count]
			}
		}))

		// Sending steps to backend
		const updates:Record<string, string | number> = {};
		updates['/timestamp'] = Timestamp.now().seconds;
		updates['/steps'] = count;
		try{await update(ref(database, `/players/${user_id}`),updates); console.log('1st->updated success after ROLL')}catch(error){console.error(error)}
	}

	useEffect(()=>{
		if(!overview_done){
		const overview_arr = [];
		let squares = 0;
		for(let i = 0;i< 100;i+=10){
			// Increase bottom by 10;
			for(let j = 0;j< 100;j+=10){
				//  Increase left by 10
				overview_arr[squares] = {bottom:`${i}%`, left:`${j}%`, opacity:1}
				squares++;
			}
		}
		setOpening_design([...overview_arr])
		setOverview_done(true);
		}else if(opening_design_count < 100 && overview_done) {setTimeout(()=>{
			opening_design[opening_design_count].opacity = 0;
			setOpening_design_count(opening_design_count+1);
		},15)}
	}, [opening_design, opening_design_count, overview_done])


	console.log('this is turn',turn)
	return (
		<>
			<div className="h-screen flex p-5 justify-evenly">
				<PointDisplay
					turn={user == "a"?true:false}
					points={users.a.points}
					player={"a"}
					moves= {users.a.all_moves}
				/>
				<div className="relative">
					<Image
						alt="img"
						width={1000}
						height={1000}
						className="w-auto h-full"
						src={img}
					></Image>

					{opening_design.map(({bottom, left, opacity},index)=>{
						return <div key={index} style={{bottom:bottom, left:left, opacity:opacity}} className={`opacity w-[10%] h-[10%] bg-black absolute`}></div>
					})}

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
					turn={user == "a"?true:false}
					points={users.b.points}
					player={"b"}
					moves= {users.a.all_moves}
				/>
			</div>
			<button
				disabled={user == 'b'}
				className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
				onClick={roll_dice}
			>
				Roll Dice
			</button>
		</>
	);
}
