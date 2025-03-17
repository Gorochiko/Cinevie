"use client"
import { useState } from "react"

export default function Component() {
  const [selectedSeats, setSelectedSeats] = useState([])
  const theater = [
    [true, false, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
  ]
  
  const rowLabels = "ABCDEFGH".split("")
  
  const handleSeatClick = (row, col) => {
    if (theater[row][col]) {
      if (selectedSeats.some(([r, c]) => r === row && c === col)) {
        setSelectedSeats(selectedSeats.filter(([r, c]) => !(r === row && c === col)))
      } else {
        setSelectedSeats([...selectedSeats, [row, col]])
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-3/5 max-w-3xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Select Your Seats</h1>
        <div className="grid grid-cols-10 gap-3 p-4 bg-gray-200 rounded-lg">
          {theater.map((row, rowIndex) =>
            row.map((seat, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-semibold transition-all duration-300 cursor-pointer shadow-md ${
                  seat
                    ? selectedSeats.some(([r, c]) => r === rowIndex && c === colIndex)
                      ? "bg-blue-500 text-white scale-110"
                      : "bg-white hover:bg-blue-300"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={() => handleSeatClick(rowIndex, colIndex)}
              >
                {rowLabels[rowIndex]}{colIndex + 1}
              </div>
            ))
          )}
        </div>
        <p className="mt-4 text-gray-600">Click on available seats to select.</p>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex justify-center items-center gap-2">
            <div className="w-[20px] h-[20px] bg-gray-600 rounded-2xl border-solid border-2 border-black"></div>
            <p className="mt-4 text-gray-600">Booked.</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="w-[20px] h-[20px] bg-blue-500 rounded-2xl border-solid border-2 border-black "></div>
            <p className="mt-4 text-gray-600">Selected.</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="w-[20px] h-[20px] bg-white rounded-2xl border-solid border-2 border-black"></div>
            <p className="mt-4 text-gray-600">Free.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
