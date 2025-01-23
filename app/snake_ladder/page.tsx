"use client";
import { useState } from "react";
// import R from "../R.jpeg"\
import Image from "next/image";
export default function SnakeAndLadder() {
	const [userA, setUserA] = useState(1);
	const [userB, setUserB] = useState(1);
	const [isUserATurn, setIsUserATurn] = useState(true);

	const rollDice = () => {
		const randomNumber = Math.floor(Math.random() * 6) + 1;

		if (isUserATurn) {
			setUserA((prev) => Math.min(prev + randomNumber, 100));
		} else {
			setUserB((prev) => Math.min(prev + randomNumber, 100));
		}

		setIsUserATurn((prev) => !prev);
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen w-full">
			<div
				className="relative w-full h-[100vh] bg-center bg-no-repeat bg-contain"
				// style={{
				// 	backgroundImage: "url('0')",
				// }}
			>
				<Image
					alt="img"
					width={1000}
					height={1000}
					className="absolute w-full h-full top-0 bottom-0 "
					src="https://th.bing.com/th/id/R.9815f360000e51b5fac089785b9616d5?rik=DVXP6lUTMK5JdQ&riu=http%3a%2f%2fst.depositphotos.com%2f1508955%2f4164%2fv%2f950%2fdepositphotos_41642213-stock-illustration-snakes-and-ladders-board-game.jpg&ehk=jPO0gAvEj6KjCZ0ZRist3DajdSdpkJduRczu86%2fyU4U%3d&risl=&pid=ImgRaw&r=0"
				></Image>
				<div className="grid grid-cols-10 grid-rows-10 w-full h-full">
					{[...Array(100)].map((_, index) => (
						<div
							key={index}
							className=" grid place-items-center "
						>	
						{/* {userA === userB ? } */}
							{userA === index && (
								<div className=" absolute top-5 left-0 hover:left-[10%] transition-all duration-300 z-20 bg-pink-500 w-[5%] h-[5%] rounded-full"></div>
							)}
							{userB === index && (
								<div className="bg-blue-500 w-2/5 h-2/5 rounded-full"></div>
							)}
							
						</div>
					))}
				</div>
			</div>
			<button
				className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
				onClick={rollDice}
			>
				Roll Dice
			</button>
			<p className="mt-2">User A Position: {userA}</p>
			<p>User B Position: {userB}</p>
			<p>Current Turn: {isUserATurn ? "User A" : "User B"}</p>
		</div>
	);
}
