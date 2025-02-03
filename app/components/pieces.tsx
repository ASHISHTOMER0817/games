import React from "react";

export const Pieces = ({
	x_axis,
	y_axis,
	player,
}: {
	x_axis: number;
	y_axis: number;
	player: string;
}) => {
	return (
		<div
			style={{
				left: `${String(x_axis)}%`,
				bottom: `${String(y_axis)}%`,
			}}
			className={`absolute -translate-y-2/4 -translate-x-2/4 transition-all duration-200 z-20 ${
				player === "a" ? "bg-pink-500" : "bg-blue-500"
			} w-[5%] h-[5%] rounded-full`}
		></div>
	);
};

export function PointDisplay({turn, points, player}:{ turn:boolean, points:number, player:string}) {
	return (
		<div className="self-center text-center">
			<div className="text-[40px]">Player {player === 'a' ? 'A':'B'} </div>
			<div
				className={`text-[340px] ${
                              player === 'a' ? turn? 'text-pink-500': 'text-gray-500' : player === 'b' && turn ? "text-blue-500" : "text-gray-500"
					// !turn && player === 'b' ? "text-blue-500" : "text-gray-500"
				}`}
			>
				{points}{" "}
			</div>
		</div>
	);
}
