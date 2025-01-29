"use client";
import { useEffect, useState } from "react";
// import R from "../R.jpeg"\
// import { io } from "socket.io-client";
import Image from "next/image";
export default function SnakeAndLadder() {
	const [user, setUser] = useState<"a" | "b">("a");
	const [turn, setTurn] = useState<boolean>(true);
	const [count, setCount] = useState(0);

	const [users, setUsers] = useState({
		a: {
			movement: { x: -5, y: 0 },
			points: 0,
			steps: 0,
			increment: "right",
			total: 0,
			progress: "forward",
			intensity: "normal",
			// snake:{start:0, end:0}
		},
		b: {
			movement: { x: -5, y: 0 },
			points: 0,
			steps: 0,
			increment: "right",
			total: 0,
			progress: "forward",
			intensity: "normal",
			// snake:{start:0, end:0}
		},
	});

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

	useEffect(() => {
		if (turn) setUser("a");
		else setUser("b");
		// console.log("first");
	}, [turn]);

	useEffect(() => {
		// console.log("second");
		setUsers((users) => ({
			...users,
			[user]: {
				...users?.[user],
				points: count,
				steps: count,
			},
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		const increment = users?.[user].increment;
		const progress = users?.[user].progress;
		const steps = users?.[user].steps;
		const intensity = users?.[user].intensity;
		const total = users?.[user].total;
		const x_axis = users?.[user].movement.x;
		const y_axis = users?.[user].movement.y;
		const movement = users?.[user].movement;
		const timeOut = intensity === "normal" ? 300 : 0;
		console.log(
			"-------",

			increment,
			intensity,
			progress,
			user,
			steps,
			total,
			y_axis,
			movement,
			"--------"
		);

		// console.log("this is timeout", timeOut);
		if (!steps || (total + 1 === 99 && steps > 1)) {
			console.log("close");

			setUsers((users) => ({
				...users,
				[user]: {
					...users?.[user],
					intensity: "normal",
					progress: "forward",
					increment: progress === "backward" ? (increment === 'left' ? 'right':increment === 'right' ? 'left': increment): increment
				},
			}));
			return;
		}
		console
			.log
			// "and here we are ",
			// users?.[user].steps,
			// users?.[user].points
			();

		setTimeout(() => {
			// console.log("movement count:", users?.[user].movement.x);

			if (
				x_axis === 5 &&
				increment === "left" &&
				progress === "forward"
			) {
				console.log("x:5,left,forward");
				setUsers((users) => ({
					...users,
					[user]: {
						...users?.[user],
						movement: {
							...movement,
							y: y_axis + 10,
						},
						increment: "right",
					},
				}));
			} else if (
				x_axis === 95 &&
				increment === "right" &&
				progress === "forward"
			) {
				console.log("x:105,right,forward");

				setUsers((users) => ({
					...users,
					[user]: {
						...users?.[user],
						movement: {
							...movement,
							y: y_axis + 10,
						},
						increment: "left",
					},
				}));
			} else if (
				x_axis === 95 &&
				increment === "right" &&
				progress === "backward"
			) {
				console.log("x:105,right,backward");

				setUsers((users) => ({
					...users,
					[user]: {
						...users?.[user],
						movement: {
							...movement,
							y: y_axis - 10,
						},
						increment: "left",
					},
				}));
			} else if (
				x_axis === 5 &&
				increment === "left" &&
				progress === "backward"
			) {
				console.log("x:5,left,backward");

				setUsers((users) => ({
					...users,
					[user]: {
						...users?.[user],
						movement: {
							...movement,
							y: y_axis - 10,
						},
						increment: "right",
					},
				}));
			} else {
				// console.log('normal condition')
				setUsers((users) => ({
					...users,
					[user]: {
						...users?.[user],
						movement: {
							...movement,
							x:
								increment === "left"
									? x_axis - 10
									: x_axis + 10,
						},
						// increment: 'right'
					},
				}));
			}

			// if (((increment === 'right' && x_axis === 105 && progress === 'forward') || (increment === 'left' && x_axis === 5 && progress === 'forward')) || ((increment === 'right' && x_axis === 5 && progress === "backward") || (increment === 'left' && x_axis === 105 && progress === 'backward')))  {
			// 	let y_axisChange = 0;
			// 	if (increment === "right") {
			// 		y_axisChange = progress === "forward" ? 10 : -10;
			// 	} else if (increment === "left") {
			// 		y_axisChange = progress === "forward" ? -10 : 10;
			// 	}

			// 	setUsers((users) => ({
			// 		...users,
			// 		[user]: {
			// 			...users?.[user],
			// 			movement: {
			// 				...movement,
			// 				y: y_axis +y_axisChange,
			// 			},
			// 		},
			// 	}));
			// 	function increments(
			// 		x_axis_turnPoint: number,
			// 		whenTrue: string,
			// 		whenFalse: string
			// 	) {
			// 		if (x_axis === x_axis_turnPoint)
			// 			setUsers((users) => ({
			// 				...users,
			// 				[user]: {
			// 					...users?.[user],
			// 					increment:
			// 						progress === "forward"
			// 							? whenTrue
			// 							: whenFalse,
			// 				},
			// 			}));
			// 	}
			// 	increments(105, "left", "right");
			// 	increments(5, "right", "left");
			// }
			// else {
			// 	console.log("this is else conition");

			// 	const inc_x_axis =
			// 		increment === "left"
			// 			? progress === "forward"
			// 				? -10
			// 				: +10
			// 			: progress === "forward"
			// 			? +10
			// 			: -10;
			// 	setUsers((users) => ({
			// 		...users,
			// 		[user]: {
			// 			...users?.[user],
			// 			movement: {
			// 				...movement,
			// 				x: x_axis + inc_x_axis,
			// 			},
			// 		},
			// 	}));
			// }

			function snake_ladder(
				snakeOrLadder: { start: number; end: number }[],
				whichOne: string
			) {
				const snake_ladder = snakeOrLadder.find(
					(obj) => obj.start === total + 1
				);
				console.log("good boy", snake_ladder);
				if (snake_ladder) {
					const start = snake_ladder.start;
					const end = snake_ladder.end;
					// if(increment !== 'ladder')
					setUsers((users) => ({
						...users,
						[user]: {
							...users?.[user],
							steps:
								whichOne === "ladder"
									? end - start
									: start - end,
							progress:
								whichOne !== "ladder"
									? "backward"
									: "forward",
							intensity: "speedy",
							increment: whichOne !== "ladder" ? (increment === 'left' ? 'right':increment === 'right' ? 'left': increment): increment
						},
					}));
				}
			}

			if (steps === 0 && intensity !== "normal") {
				console.log("why??");
			}

			setUsers((users) => ({
				...users,
				[user]: {
					...users?.[user],
					steps: steps - 1,
					total:
						progress === "forward"
							? total + 1
							: total - 1,
				},
			}));

			if (intensity === "normal" && steps - 1 === 0) {
				snake_ladder(snakeArr, "snake");
				snake_ladder(ladderArr, "ladder");
			}

			if (total + 1 === 100) console.log("A won");
		}, timeOut);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [users?.[user].steps]);

	return (
		<>
			<div className="h-screen flex p-5 justify-evenly">
				<div className="self-center text-center">
					<div className="text-[40px]">Player A </div>
					<div className={`text-[340px] ${user !== "a" ? 'text-pink-500': 'text-gray-500'}`}>
						{users.a.points}{" "}
					</div>
				</div>
				<div className="relative">
					<Image
						alt="img"
						width={1000}
						height={1000}
						className="w-auto h-full"
						src="https://th.bing.com/th/id/R.9815f360000e51b5fac089785b9616d5?rik=DVXP6lUTMK5JdQ&riu=http%3a%2f%2fst.depositphotos.com%2f1508955%2f4164%2fv%2f950%2fdepositphotos_41642213-stock-illustration-snakes-and-ladders-board-game.jpg&ehk=jPO0gAvEj6KjCZ0ZRist3DajdSdpkJduRczu86%2fyU4U%3d&risl=&pid=ImgRaw&r=0"
					></Image>
					{/* <div className="top-0 absolute grid grid-cols-10 grid-rows-10 w-full h-full">
						{[...Array(100)].map((_, index) => (
							<div
								key={index}
								className=" grid place-items-center "
							> */}
					<div
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
					></div>
					{/* </div>
						))}
					</div> */}
				</div>

				<div className="self-center text-center">
					<div className="text-[40px]">Player B </div>
					<div className={`text-[340px] ${user !== "b" ? 'text-blue-500': 'text-gray-500'}`}>
						{users.b.points}{" "}
					</div>
				</div>
				{/* <p>Current Turn: {isUserATurn ? "User A" : "User B"}</p> */}
			</div>
			<button
				className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
				onClick={() => {
					setTurn(!turn);
					setCount(Math.floor(Math.random() * 6) + 1);
				}}
			>
				Roll Dice
			</button>
		</>
	);
}
