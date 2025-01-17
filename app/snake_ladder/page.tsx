'use client';
import { useState } from 'react';
// import R from "../R.jpeg"
export default function SnakeAndLadder() {
  const [userA, setUserA] = useState(1);
  const [userB, setUserB] = useState(1);
  const [isUserATurn, setIsUserATurn] = useState(true);


  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    
    if (isUserATurn) {
      setUserA(prev => Math.min(prev + randomNumber, 100));
    } else {
      setUserB(prev => Math.min(prev + randomNumber, 100));
    }
    
    setIsUserATurn(prev => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div 
        className="relative w-auto h-[98vh] bg-center bg-no-repeat bg-contain" 
        style={{ backgroundImage: "url('https://th.bing.com/th/id/R.9815f360000e51b5fac089785b9616d5?rik=DVXP6lUTMK5JdQ&riu=http%3a%2f%2fst.depositphotos.com%2f1508955%2f4164%2fv%2f950%2fdepositphotos_41642213-stock-illustration-snakes-and-ladders-board-game.jpg&ehk=jPO0gAvEj6KjCZ0ZRist3DajdSdpkJduRczu86%2fyU4U%3d&risl=&pid=ImgRaw&r=0')" }}
      >
        <div className="grid grid-cols-10 grid-rows-10 w-full h-full">
          {[...Array(100)].map((_, index) => (
            <div key={index} className="border border-gray-300 opacity-0">
              {/* Invisible Cells */}
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
      <p>Current Turn: {isUserATurn ? 'User A' : 'User B'}</p>
    </div>
  );
}