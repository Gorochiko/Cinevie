"use client";
import HeadFooter from "@/components/headFooter"
import Line from "@/components/Line"
import BodyFooter from "@/components/bodyFooter"
import EndFooter from "@/components/endFooter"
export default function Footer(){
    return (
        <div className="bg-gradient-to-r from-white via-blue-100 to-red-100 w-full flex justify-center">
      <div className="w-[1351.47px] bg-[#0D1E4C] md:mb-6 md:rounded-2xl">
        <HeadFooter />
        <Line />
        <BodyFooter />
        <Line />
        <EndFooter />
      </div>
    </div>
    )
}