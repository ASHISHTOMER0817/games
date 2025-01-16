"use client";
import { useState } from "react";

export default function Home() {
	const [playerA, setPlayerA] = useState<number[]>([]);
	const [playerB, setPlayerB] = useState<number[]>([]);
	const [turn, setTurn] = useState(true);
	const [warning, setWarning] = useState(false);
	
	function checking(turns: number[]) {
		console.log("running baby", turns);
		const player: Set<number> = new Set([...turns]);

		for (let i = 0; i < turns.length; i++) {
			if (
				(turns[i] &&
					player.has(turns[i] + 1) &&
					player.has(turns[i] + 2)) ||
				(turns[i] &&
					player.has(turns[i] + 11) &&
					player.has(turns[i] + 22)) ||
				(turns[i] &&
					player.has(turns[i] + 9) &&
					player.has(turns[i] + 18))
			) {
				return 1;
			}
		}
	}

	function myTurn(tileId: number) {
		if (playerA.includes(tileId) || playerB.includes(tileId)) {
			return setWarning(true);
		}
		if (turn) {
			setPlayerA([...playerA, tileId]);
			setTurn(!turn);
			setWarning(false);
			console.log(playerA.length);
			if (playerA.length >= 2 && checking([...playerA, tileId])) {
				console.log("A won");
			}
		} else {
			setPlayerB([...playerB, tileId]);
			setTurn(!turn);
			setWarning(false);
			if (playerB.length >= 2 && checking([...playerB, tileId])) {
				console.log("B won");
			}
		}
	}
	console.log("playerA-", playerA, "///", "playerB", playerB);

	return (
		<div className="h-screen flex flex-col items-center relative justify-center w-screen">
			<div
				className={`absolute top-10 text-red-500 ${
					!warning && "hidden"
				}`}
			>
				wrong move!
			</div>
			<div className="row flex">
				<div
					onClick={() => {
						myTurn(11);
					}}
					// className={`${}`}
				>
					11
				</div>
				<div
					onClick={() => {
						myTurn(12);
					}}
					className="border border-t-0"
				>
					12
				</div>
				<div
					onClick={() => {
						myTurn(13);
					}}
				>
					13
				</div>
			</div>
			<div className="row flex">
				<div
					onClick={() => {
						myTurn(21);
					}}
					className="border border-l-0"
				>
					21
				</div>
				<div
					onClick={() => {
						myTurn(22);
					}}
					className=""
				>
					22
				</div>
				<div
					onClick={() => {
						myTurn(23);
					}}
					className="border border-r-0"
				>
					23
				</div>
			</div>
			<div className="row flex">
				<div
					onClick={() => {
						myTurn(31);
					}}
					className=""
				>
					31
				</div>
				<div
					onClick={() => {
						myTurn(32);
					}}
					className="border border-b-0"
				>
					32
				</div>
				<div
					onClick={() => {
						myTurn(33);
					}}
				>
					33
				</div>
			</div>
		</div>
	);
}
