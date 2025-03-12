/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QHBmmUQXciU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

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
    <div className="w-full items-center justify-center h-screen bg-gray-100 flex mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8 w-3/5 max-w-3xl p-2">
        <h1 className="text-2xl font-bold mb-4">Select Your Seats</h1>
        <div className="grid grid-cols-10 gap-2">
          {theater.map((row, rowIndex) =>
            row.map((seat, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                  seat
                    ? selectedSeats.some(([r, c]) => r === rowIndex && c === colIndex)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-300"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={() => handleSeatClick(rowIndex, colIndex)}
              >
                {rowIndex + 1}-{colIndex + 1}
              </div>
            )),
          )}
        </div>
      </div>
      <div className="w-2/5 max-w-3xl bg-white shadow-lg rounded-lg p-8 mt-4 m-5">
            <div className="mt-4">
                <p className="font-bold">Selected Seats:</p>
                <div className="flex flex-wrap gap-2">
                    {selectedSeats.map(([row, col], index) => (
                    <div key={index} className="bg-primary text-primary-foreground rounded-md px-2 py-1">
                        {row + 1}-{col + 1}
                    </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="font-bold">Selected Combo:</p>
                <div>
                    <div>a b c d  x y z</div>
                </div>
            </div>
            <div className="mt-4 flex justify-end">
            <Button size="lg" className="bg-primary text-primary-foreground">
                Tiếp tục
            </Button>
            </div>
        </div>
    </div>
  )
}