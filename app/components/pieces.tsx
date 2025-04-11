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

export function PointDisplay({player, moves}:{ turn:boolean, points:number, player:string, moves:number[]}) {
	return (
		<div className="self-center text-center">
			<div className="text-[40px]">Player {player === 'a' ? 'A':'B'} </div>
			<div
				className="h-auto w-full overflow-y-scroll"
			>
				{moves.toReversed().map((move, index)=>{
					return <div key={index}>{index}. moved{" "}{move}{" "}steps</div>
				})}
			</div>
		</div>
	);
}
