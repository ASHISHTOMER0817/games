"use client";

import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	const games = [
		{ name: "Tic Tac Toe", url: "/tic_tac_toe" },
		{ name: "Ludo", url: "/snake_ladder" },
		{ name: "Space Invaders", url: "/space_invaders" },
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
							onClick={() => router.push(game.url)}
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
