"use client";

import { useRouter } from "next/navigation";
import {
	ref,
	query,
	orderByChild,
	equalTo,
	get,
	set,
	onValue,
} from "firebase/database";
import database from "@/database/firebase";
import { useState } from "react";
export default function Home() {
	const router = useRouter();
	const [suspense, setSuspense] = useState(false);
	// const findEmptyValues = async (url: string) => {
	// 	const usersRef = ref(database, "users");
	// 	const queryRef = query(
	// 		usersRef,
	// 		orderByChild("secondKey"),
	// 		equalTo("")
	// 	);

	// 	try {
	// 		const snapshot = await get(queryRef); // ✅ Wait for the database response
	// 		if (snapshot.exists()) {
	// 			console.log(snapshot.val()); // ✅ Process data after it's fully fetched
	// 		} else {
	// 			console.log("No empty values found");
	// 			try{

	// 			  await set(usersRef, {
	// 					firstPlayer: {
	// 						movement: { x: -5, y: 0 },
	// 						points: 0,
	// 						steps: 0,
	// 						increment: "right",
	// 						total: 0,
	// 						progress: "forward",
	// 						intensity: "normal",
	// 					},
	// 				});
	// 				console.log("Data set successfully!"); // Success confirmation
	// 				router.push(url); // Navigate to next page
	// 			    } catch (error) {
	// 				console.error("Error setting data:", error); // Error handling
	// 			    }
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching data:", error);
	// 	}
	// };

	const findEmptyValues = async (url: string) => {
		const usersRef = ref(database, "users");
		const queryRef = query(
			usersRef,
			orderByChild("secondKey"),
			equalTo("")
		);

		try {
			const snapshot = await get(queryRef);
			if (snapshot.exists()) {
				console.log(snapshot.val());

				const userData = snapshot.val();
				for (const key in userData) {
					if (userData[key].secondKey === "") {
						await set(
							ref(
								database,
								`users/${key}/secondKey`
							),
							{
								player: "second",
								movement: { x: -5, y: 0 },
								points: 0,
								steps: 0,
								increment: "right",
								total: 0,
								progress: "forward",
								intensity: "normal",
								game: "start",
								turn: false,
							}
						);
						console.log(
							"secondKey data set successfully!"
						); 

						router.push(`game/${key}`);
						return;
					}
				}
			} else {
				console.log("No empty secondKey found");

				const gameId = Date.now().toString();
				const gameRef = ref(database, `users/${gameId}`);

				await set(ref(database, `users/${gameRef}`), {
					firstKey: {
						player: "first",
						movement: { x: -5, y: 0 },
						points: 0,
						steps: 0,
						increment: "right",
						total: 0,
						progress: "forward",
						intensity: "normal",
						gamestage: "start",
						turn: false,
					},
					secondKey: "",
				});

				console.log("firstKey and secondKey set successfully!");

				// Keep checking for secondKey
				onValue(gameRef, (snapshot) => {
					const data = snapshot.val();
					if (data?.secondKey) {
						setSuspense(false);
						router.push(`/game/${gameId}`); // Redirect both players
					}
				});

				// router.push(url);
			}
		} catch (error) {
			console.error("Error processing data:", error);
		}
	};

	// const findEmptyValues = async (url: string) => {
	// 	const usersRef = ref(database, "users");
	// 	const queryRef = query(
	// 		usersRef,
	// 		orderByChild("secondKey"),
	// 		equalTo("")
	// 	);

	// 	try {
	// 		const snapshot = await get(queryRef); // Wait for the database response
	// 		if (snapshot.exists()) {
	// 			console.log(snapshot.val()); // Process data after it's fully fetched

	// 			await set(usersRef, {
	// 				firstPlayer: {
	// 					movement: { x: -5, y: 0 },
	// 					points: 0,
	// 					steps: 0,
	// 					increment: "right",
	// 					total: 0,
	// 					progress: "forward",
	// 					intensity: "normal",
	// 				},
	// 				secondPlayer: "",
	// 			});
	// 		} else {
	// 			console.log("No empty values found");

	// 			try {
	// 				// Setting data for the first player
	// 				await set(usersRef, {
	// 					firstPlayer: {
	// 						movement: { x: -5, y: 0 },
	// 						points: 0,
	// 						steps: 0,
	// 						increment: "right",
	// 						total: 0,
	// 						progress: "forward",
	// 						intensity: "normal",
	// 					},
	// 					secondPlayer: "",
	// 				});

	// 				console.log("Data set successfully!"); // Success confirmation

	// 				// Redirect after data is set
	// 				router.push(url); // Navigate to the next page
	// 			} catch (error) {
	// 				console.error("Error setting data:", error); // Error handling for set()
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching data:", error); // Error handling for get()
	// 	}
	// };

	function searchOpponentsForTicTac(url: string) {
		router.push(url);
	}

	const games = [
		{ name: "Tic Tac Toe", url: "/tic_tac_toe" },
		{ name: "Snake & Ladder", url: "/snake_ladder" },
		// { name: "Space Invaders", url: "/space_invaders" },
	];

	return (
		<div className="flex justify-center items-center h-screen bg-gray-900">
			<div className="bg-gray-800 p-10 rounded-lg shadow-lg text-white w-80">
				<h1 className="text-2xl font-bold text-center mb-6">
					Choose a Game
				</h1>
				<div className="flex flex-col space-y-4">
					{games.map((game, index) => (
						<button
							key={index}
							onClick={() => {
								if (index === 0)
									searchOpponentsForTicTac(
										game.url
									);
								else findEmptyValues(game.url);
							}}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							{game.name}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
