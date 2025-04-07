"use client";

import { useRouter } from "next/navigation";
import {
	ref,
	// query,
	// orderByChild,
	// equalTo,
	get,
	// set,
	onValue,
	push,
	child,
	update,
} from "firebase/database";
import database from "@/database/firebase";
import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { playerData } from "./lib/variables";

export default function Home() {
	const router = useRouter();
	const [suspense, setSuspense] = useState(false);
	const [player_key, setPlayer_key] = useState('')
	
	// An array of list of games we have
	const games = [
		{ name: "Tic Tac Toe", url: "/tic_tac_toe" },
		{ name: "Snake & Ladder", url: "/snake_ladder" },
	];

	// Run this function if the user chooses Snake and ladder game, this function finds empty spot in the Slots(the container where two players play)
	const findEmptyValues = async () => {
		try {
			// Check if the unmatched_player field is null;
				get(ref(database, "/unmatched_player")).then((snapshot)=>{
				const unmatched_player_uid = snapshot.exists() && snapshot.val();
				if (unmatched_player_uid == 'null') {
					const key = push(
						child(ref(database), "/unmatched_player")
					).key;
					setPlayer_key(key || '')
					// Write the new post's data simultaneously in the posts list and the user's post list.
					const updates: Record<string, string | playerData | null> = {};
					updates["/unmatched_player"] = key;
					updates["/players/" + key] = {
						steps: 0,
						progressOrIntensity: "normal",
						turn: true,
						timestamp: Timestamp.now().seconds,
						opponent: 'null',
					};
					update(ref(database), updates)
				}
				else{
					const updates: Record<string, string | playerData | null> = {};
					const key = push(child(ref(database), '/players')).key
					updates["/players/" + unmatched_player_uid + '/opponent'] = key;
					updates["/unmatched_player"] = "null"; // Reverse it back to null as we created a match
					updates["/players/" + key] = {
						steps: 0,
						progressOrIntensity: "normal",
						turn: false,
						timestamp: Timestamp.now().seconds,
						opponent: unmatched_player_uid || '',
					}
					update(ref(database), updates)

					// Updating local storage with user and its opponent IDs.
					localStorage.setItem('user_id',key || '')
					localStorage.setItem('opponent_id',unmatched_player_uid || '')
					router.push(games[1].url)
				}
			});
		} catch (error) {
			console.error("Error processing data:", error);
		}
	};

	// Listen for changes in current player in players object;
	// useEffect(() => {
	// 	if(player_key == "")return;
	// 	console.log('it is running')
	// 	const unsubscribe = onValue(ref(database, `/players/${player_key}`), (snapshot) => {
	// 		console.log('outside' + player_key)
	// 		if (snapshot.exists() && snapshot.val().opponent !== 'null') {
	// 			console.log('inside' + player_key)
	// 			setSuspense(false);
	// 			localStorage.setItem('user_id',player_key || '')
	// 			localStorage.setItem('opponent_id',snapshot.val().opponent || '')
	// 			router.push(games[1].url);
	// 		}
	// 	});
	// 	return () => unsubscribe(); // Cleanup the listener when component unmounts
	// }, [games, player_key, router]);


	useEffect(() => {
		if (!player_key) return; // Skip if no player_key
	    
		// console.log('Setting up listener for player:', player_key);
		
		const playerRef = ref(database, `/players/${player_key}`);
		const unsubscribe = onValue(playerRef, (snapshot) => {
		  const playerData = snapshot.val();
		//   console.log('Latest player data:', playerData);
	    
		  // Check if opponent exists and is not a "null" string
		  if (snapshot.exists() && playerData?.opponent && playerData.opponent !== "null") {
		    console.log('Opponent assigned:', playerData.opponent);
		    
		    setSuspense(false);
		    localStorage.setItem('user_id', player_key);
		    localStorage.setItem('opponent_id', playerData.opponent);
		    router.push(games[1].url);
		  }
		});
	    
		return () => unsubscribe(); // Cleanup on unmount
	    }, [player_key]); // Re-run if player_key changes

	// Search Opponent for tic-tac-toe game
	function searchOpponentsForTicTac() {
		router.push(games[0].url);
	}

	return (
		<div className="flex justify-center relative items-center h-screen bg-gray-900">
			{suspense && (
				<div className="absolute w-full h-full bg-gray-500 opacity-50 text-white text-center grid place-items-center">
					Loading...
				</div>
			)}
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
									searchOpponentsForTicTac();
								else findEmptyValues();
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
