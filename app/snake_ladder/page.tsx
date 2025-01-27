"use client";
import { useEffect, useState } from "react";
// import R from "../R.jpeg"\
import { io } from "socket.io-client";
import Image from "next/image";
export default function SnakeAndLadder() {
	// const [userA, setUserA] = useState(1);
	// const [userB, setUserB] = useState(1);
	const [movementOfA, setMovementOfA] = useState({ x: 5, y: 0 });
	const [movementOfB, setMovementOfB] = useState({ x: 5, y: 0 });
	const [userPoints, setUserPoints] = useState({ a: 0, b: 0 });
	const [stepsToTake, setstepsToTake] = useState({ a: 0, b: 0 });
	const [isUserATurn, setIsUserATurn] = useState(true);
	const [incrementType, setIncrementType] = useState({
		a: "right",
		b: "right",
	});

	const [user, setUser] = useState({
		a: {
			movement: { x: 5, y: 0 },
			points: 0,
			steps: 0,
			increment: "right",
			total: 0,
			progress: "forward",
		},
		b: {
			movement: { x: 5, y: 0 },
			points: 0,
			steps: 0,
			increment: "right",
			total: 0,
			progress: "forward",
		},
	});

	let snakeArr = [
		{ start: 17, end: 7 },
		{ start: 62, end: 19 },
		{ start: 54, end: 34 },
		{ start: 64, end: 60 },
		{ start: 87, end: 36 },
		{ start: 93, end: 73 },
		{ start: 95, end: 75 },
		{ start: 98, end: 79 },
	];
	let ladderArr = [
		{ start: 1, end: 38 },
		{ start: 4, end: 14 },
		{ start: 9, end: 31 },
		{ start: 21, end: 42 },
		{ start: 51, end: 67 },
		{ start: 26, end: 84 },
		{ start: 72, end: 91 },
		{ start: 80, end: 99 },
	];

	// const [incrementalType];
	// const [rowNo, setRowNo] = useState(0)

	// function playerA(stepsToTake: number) {
	// 	if (!stepsToTake) {
	// 		setIsUserATurn(!isUserATurn);
	// 		return;
	// 	}

	// 	if (movementOfA.x === 95 || movementOfA.x === 0) {
	// 		setTimeout(() => {
	// 			setMovementOfA((a) => ({
	// 				...a,
	// 				y: a.y + 10,
	// 			}));
	// 		}, 500);
	// 		if (movementOfA.x === 95) incrementType.a = "left";
	// 		if (movementOfA.x === 0) incrementType.a = "right";
	// 	} else
	// 		console.log(
	// 			"steps taken:",
	// 			stepsToTake,
	// 			"X_movement:",
	// 			movementOfA.x
	// 		);
	// 	setTimeout(() => {
	// 		setMovementOfA((a) => ({
	// 			...a,
	// 			x: incrementType === "left" ? a.x - 10 : a.x + 10,
	// 		}));
	// 	}, 500);
	// 	return playerA(stepsToTake - 10);
	// }

	// const currentPositions = io("/api/currentPosition", {
	// 	reconnectionDelayMax: 10000,
	// });
	// let stepsOfA = 0;
	useEffect(() => {
		if (user.a.steps) {
			console.log("equal");
			return;
		}
		console.log("and here we are ", user.a.steps, user.a.points);
		setTimeout(() => {
			console.log("movement count:", user.a.movement.x);
			if (
				(user.a.movement.x === 95 &&
					user.a.increment === "right") ||
				(user.a.movement.x === 5 && user.a.increment === "left")
			) {
				setUser((user) => ({
					...user,
					a: {
						...user.a,
						movement: {
							...user.a.movement,
							y:
								user.a.progress === "forward"
									? user.a.movement.y + 10
									: user.a.movement.y - 10,
						},
					},
				}));

				if (user.a.movement.x === 95)
					setUser((user) => ({
						...user,
						a: {
							...user.a,
							increment:
								user.a.progress === "forward"
									? "left"
									: "right",
						},
					}));
				if (user.a.movement.x === 5)
					setUser((user) => ({
						...user,
						a: {
							...user.a,
							increment:
								user.a.progress === "forward"
									? "right"
									: "left",
						},
					}));
			} else {
				console.log("this is else conition");
				let movement = user.a.movement.x;
				if (user.a.progress === "forward") {
					movement +=
						user.a.increment === "left" ? -10 : +10;
				} else {
					movement +=
						user.a.increment === "left" ? +10 : -10;
				}

				setUser((user) => ({
					...user,
					a: {
						...user.a,
						movement: {
							...user.a.movement,
							x: movement,
							// user.a.progress === 'forward' ? user.a.increment === "left"
							// 	?  user.a.movement.x - 10 : user.a.movement.x + 10
						},
					},
				}));
			}

			setUser((user) => ({
				...user,
				a: {
					...user.a,
					steps: user.a.steps - 1,
					total: user.a.progress === 'forward' ? user.a.total++ : user.a.total--,
				},
			}));
			const snake = snakeArr.find((obj)=>obj.start === user.a.total +1)
			if(snake){
				const pointsAteBySnake = snake?.start - snake?.end;
				// user.a.steps+= pointsAteBySnake;
				setUser((user)=> ({
					...user,
					a:{...user.a,
						steps:user.a.steps+= pointsAteBySnake,
						progress: 'backward'
						
					}
				}))

			}


			if (user.a.total + 1 === 100) console.log("A won");
		}, 400);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user.a.steps]);

	// function playerB(stepsToTake, incrementalType) {
	// 	if (!stepsToTake) return;
	// 	if (movementOfA.x === 95) {
	// 		setTimeout(() => {
	// 			setMovementOfA((a) => ({
	// 				...a,
	// 				y: a.y + 10,
	// 			}));
	// 			stepsToTake -= 10;
	// 			incrementType = "left";
	// 		}, 500);
	// 	}
	// 	setTimeout(() => {
	// 		setMovementOfA((a) => ({
	// 			...a,
	// 			x: incrementType === "left" ? a.x - 10 : a.x + 10,
	// 		}));
	// 	}, 500);
	// 	playerA(stepsToTake, incrementType);
	// }

	// const rollDice = () => {
	// 	// const randomNumber = (Math.floor(Math.random() * 6) + 1) ;
	// 	// let stepsToTake = (Math.floor(Math.random() * 6) + 1) * 10;
	// 	// console.log(stepsToTake);
	// 	// let incrementType = 'left';

	// 	if (isUserATurn) {
	// 		setUserPoints({ ...userPoints, a: randomNumber });

	// 		if (!(movementOfA.y % 20) || !movementOfA.y) {
	// 			const totalMovement = movementOfA.x + randomNumber * 10;
	// 			console.log("this total moves", totalMovement);
	// 			if (totalMovement > 95) {
	// 				console.log("inside if condition");
	// 				const turnPoint = totalMovement - 95;
	// 				setMovementOfA((a) => ({
	// 					...a,
	// 					x: 95,
	// 				}));
	// 				setTimeout(() => {
	// 					setMovementOfA((a) => ({
	// 						...a,
	// 						y: a.y + 10,
	// 					}));
	// 				}, 500);
	// 				setTimeout(() => {
	// 					setMovementOfA((a) => ({
	// 						...a,
	// 						x: a.x - turnPoint + 10,
	// 					}));
	// 				}, 500);
	// 			} else {
	// 				console.log("insdie else condition");
	// 				setMovementOfA({
	// 					...movementOfA,
	// 					x: movementOfA.x + randomNumber * 10,
	// 				});
	// 			}
	// 		} else {
	// 			console.log("what is this");
	// 			const totalMovement = randomNumber * 10 - movementOfA.x;
	// 			console.log(totalMovement);
	// 			if (totalMovement > 0) {
	// 				// turnPoint = totalMovement;
	// 				setMovementOfA((a) => ({
	// 					...a,
	// 					x: 0,
	// 				}));
	// 				setTimeout(() => {
	// 					setMovementOfA((a) => ({
	// 						...a,
	// 						y: a.y + 10,
	// 					}));
	// 				}, 500);
	// 				setTimeout(() => {
	// 					setMovementOfA((a) => ({
	// 						...a,
	// 						x: a.x + totalMovement - 10,
	// 					}));
	// 				}, 500);
	// 			} else {
	// 				console.log("frankly unexpected");
	// 				setMovementOfA({
	// 					...movementOfA,
	// 					x: movementOfA.x - randomNumber * 10,
	// 				});
	// 			}
	// 		}
	// 	} else {
	// 		setUserPoints({ ...userPoints, b: randomNumber });
	// 		setMovementOfB({
	// 			...movementOfB,
	// 			x: movementOfB.x + randomNumber * 10,
	// 		});
	// 	}
	// 	// setIsUserATurn((prev) => !prev);
	// };

	return (
		<>
			<div className="h-screen flex p-5 justify-evenly">
				<div className="self-center text-center">
					<div className="text-[40px]">Player A </div>
					<div className="text-[340px]">
						{user.a.points}{" "}
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
							left: `${String(user.a.movement.x)}%`,
							bottom: `${String(
								user.a.movement.y
							)}%`,
						}}
						className={`absolute -translate-y-2/4 -translate-x-2/4 transition-all duration-200 z-20 bg-pink-500 w-[5%] h-[5%] rounded-full`}
					></div>
					<div
						style={{
							left: `${String(user.b.movement.x)}%`,
							bottom: `${String(
								user.b.movement.y
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
					<div className="text-[340px]">
						{user.b.points}{" "}
					</div>
				</div>
				{/* <p>Current Turn: {isUserATurn ? "User A" : "User B"}</p> */}
			</div>
			<button
				className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
				onClick={() => {
					const count = Math.floor(Math.random() * 6) + 1;
					console.log("this is count:", count);
					setUser((user) => ({
						...user,
						a: {
							...user.a,
							points: count,
							steps: user.a.steps++,
						},
					}));

					// setUserPoints((points) => ({
					// 	...points,
					// 	a: count,
					// }));
					// setstepsToTake((steps) => ({
					// 	...steps,
					// 	a: count,
					// }));
				}}
			>
				Roll Dice
			</button>
		</>
	);
}
