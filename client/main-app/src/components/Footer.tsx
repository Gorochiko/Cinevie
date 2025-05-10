"use client"

import HeadFooter from "./headFooter"
import Line from "./Line"
import BodyFooter from "./bodyFooter"
import EndFooter from "./endFooter"

export default function Footer() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black w-full flex justify-center pt-8">
      <div className="w-full max-w-7xl bg-gray-900 md:mb-6 md:rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-gray-800">
        <HeadFooter />
        <Line />
        <BodyFooter />
        <Line />
        <EndFooter />
      </div>
    </div>
  )
}
