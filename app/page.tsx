// "use client";

// import { useRouter } from "next/navigation";
// import {
// 	ref,
// 	query,
// 	orderByChild,
// 	equalTo,
// 	get,
// 	set,
// 	onValue,
// } from "firebase/database";
// import database from "@/database/firebase";
// import { useState } from "react";
// export default function Home() {
// 	const router = useRouter();
// 	const [suspense, setSuspense] = useState(false);
// 	console.log(process.env.NEXT_PUBLIC_DATABASE_URL)

// 	const findEmptyValues = async (url: string) => {
// 		const usersRef = ref(database, "users");
// 		const queryRef = query(
// 			usersRef,
// 			orderByChild("secondKey"),
// 			equalTo("")
// 		);

// 		try {
// 			const snapshot = await get(queryRef);
// 			if (snapshot.exists()) {
// 				console.log(snapshot.val());

// 				const userData = snapshot.val();
// 				for (const key in userData) {
// 					if (userData[key].secondKey === "") {
// 						await set(
// 							ref(
// 								database,
// 								`users/${key}/secondKey`
// 							),
// 							{
// 								player: "second",
// 								movement: { x: -5, y: 0 },
// 								points: 0,
// 								steps: 0,
// 								increment: "right",
// 								total: 0,
// 								progress: "forward",
// 								intensity: "normal",
// 								// game: "start",
// 								turn: false,
// 							}
// 						);
// 						console.log(
// 							"secondKey data set successfully!"
// 						);
// 						sessionStorage.setItem(
// 							"player",
// 							JSON.stringify({
// 								gameId: key,
// 								id: "secondKey",
// 							})
// 						);
// 						router.push(`${url}/${key}`);
// 						return;
// 					}
// 				}
// 			} else {
// 				console.log("No empty secondKey found");

// 				const gameId = Date.now().toString();
// 				await set(ref(database, `users/${gameId}`), {
// 					firstKey: {
// 						player: "first",
// 						movement: { x: -5, y: 0 },
// 						points: 0,
// 						steps: 0,
// 						increment: "right",
// 						total: 0,
// 						progress: "forward",
// 						intensity: "normal",
// 						// gamestage: "start",
// 						turn: true,
// 					},
// 					secondKey: "",
// 				});
// 				sessionStorage.setItem(
// 					"player",
// 					JSON.stringify({ gameId, id: "firstKey" })
// 				);

// 				console.log("firstKey and secondKey set successfully!");

// 				// Keep checking for secondKey
// 				onValue(ref(database, `users/${gameId}/secondKey`), (snapshot) => {
// 					const data = snapshot.val();
// 					if (data?.secondKey) {
// 						setSuspense(false);
// 						router.push(`${url}/${gameId}`); // Redirect both players
// 					}
// 				});

// 			}
// 		} catch (error) {
// 			console.error("Error processing data:", error);
// 		}
// 	};

// 	function searchOpponentsForTicTac(url: string) {
// 		router.push(url);
// 	}

// 	const games = [
// 		{ name: "Tic Tac Toe", url: "/tic_tac_toe" },
// 		{ name: "Snake & Ladder", url: "/snake_ladder" },
// 	];

// 	return (
// 		<div className="flex justify-center relative items-center h-screen bg-gray-900">
// 			{suspense && (
// 				<div className="absolute w-100 h-100 bg-gray-500 opacity-50 text-white text-center grid place-items-center">
// 					Loading...
// 				</div>
// 			)}
// 			<div className="bg-gray-800 p-10 rounded-lg shadow-lg text-white w-80">
// 				<h1 className="text-2xl font-bold text-center mb-6">
// 					Choose a Game
// 				</h1>
// 				<div className="flex flex-col space-y-4">
// 					{games.map((game, index) => (
// 						<button
// 							key={index}
// 							onClick={() => {
// 								if (index === 0)
// 									searchOpponentsForTicTac(
// 										game.url
// 									);
// 								else findEmptyValues(game.url);
// 							}}
// 							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// 						>
// 							{game.name}
// 						</button>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }


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
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [suspense, setSuspense] = useState(false);
  const [gameId, setGameId] = useState<string | null>(null); // Store game ID for listener

  const findEmptyValues = async (url: string) => {
    const usersRef = ref(database, "users");
    const queryRef = query(usersRef, orderByChild("secondKey"), equalTo(""));

    try {
      const snapshot = await get(queryRef);
      if (snapshot.exists()) {
        console.log(snapshot.val());

        const userData = snapshot.val();
        for (const key in userData) {
          if (userData[key].secondKey === "") {
            await set(ref(database, `users/${key}/secondKey`), {
              player: "second",
              movement: { x: -5, y: 0 },
              points: 0,
              steps: 0,
              increment: "right",
              total: 0,
              progress: "forward",
              intensity: "normal",
              turn: false,
            });

            console.log("secondKey data set successfully!");

            sessionStorage.setItem(
              "player",
              JSON.stringify({ gameId: key, id: "secondKey" })
            );
            router.push(url);
            return;
          }
        }
      } else {
        console.log("No empty secondKey found");

        const newGameId = Date.now().toString();
        await set(ref(database, `users/${newGameId}`), {
          firstKey: {
            player: "first",
            movement: { x: -5, y: 0 },
            points: 0,
            steps: 0,
            increment: "right",
            total: 0,
            progress: "forward",
            intensity: "normal",
            turn: true,
          },
          secondKey: "",
        });

        sessionStorage.setItem(
          "player",
          JSON.stringify({ gameId: newGameId, id: "firstKey" })
        );

        console.log("firstKey and secondKey set successfully!");
        setSuspense(true);
        setGameId(newGameId); // Store the gameId to listen for updates
      }
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  // Listen for changes in secondKey when gameId is set
  useEffect(() => {
    if (!gameId) return;

    const secondKeyRef = ref(database, `users/${gameId}/secondKey`);
    const unsubscribe = onValue(secondKeyRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === "object") {
        setSuspense(false);
        router.push(`/snake_ladder`);
      }
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, [gameId, router]);

  function searchOpponentsForTicTac(url: string) {
    router.push(url);
  }

  const games = [
    { name: "Tic Tac Toe", url: "/tic_tac_toe" },
    { name: "Snake & Ladder", url: "/snake_ladder" },
  ];

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
                if (index === 0) searchOpponentsForTicTac(game.url);
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

