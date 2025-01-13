'use client'
import { useState } from "react";

export default function Home() {
	const [playerA, setPlayerA] = useState<string[]>([]);
	const [playerB, setPlayerB] = useState<string[]>([]);
	const [turn, setTurn] = useState(true);
	const [warning, setWarning] = useState(false);

	function myTurn(tileId: string) {
		if (playerA.includes(tileId) || playerB.includes(tileId)) {
			return setWarning(true);
		}
		if (turn) {
			setPlayerA([...playerA, tileId]);
			setTurn(!turn);
			setWarning(false);
		} else {
			setPlayerB([...playerB, tileId]);
			setTurn(!turn);
			setWarning(false);
		}
	}

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
						myTurn("1a");
					}}
					className=""
				></div>
				<div
					onClick={() => {
						myTurn("1b");
					}}
					className="border border-t-0"
				></div>
				<div
					onClick={() => {
						myTurn("1c");
					}}
				></div>
			</div>
			<div className="row flex">
				<div
					onClick={() => {
						myTurn("2a");
					}}
					className="border border-l-0"
				></div>
				<div
					onClick={() => {
						myTurn("2b");
					}}
					className=""
				></div>
				<div
					onClick={() => {
						myTurn("2c");
					}}
					className="border border-r-0"
				></div>
			</div>
			<div className="row flex">
				<div
					onClick={() => {
						myTurn("3a");
					}}
					className=""
				></div>
				<div
					onClick={() => {
						myTurn("3b");
					}}
					className="border border-b-0"
				></div>
				<div
					onClick={() => {
						myTurn("3c");
					}}
				></div>
			</div>
		</div>
	);
}
