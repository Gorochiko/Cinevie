// "use client"

// import { Button } from "@/components/ui/button"
// import Image from "next/image"

// export default function SelectMovie() {
//   return (
//     <div className="bg-white p-6 rounded-lg border">
//       <h1 className="text-2xl font-bold mb-6">Chọn phim / Rạp / Suất</h1>

//       <div className="mb-8">
//         <h2 className="text-lg font-medium mb-4">Phim đang chiếu</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="border rounded-lg p-2 cursor-pointer bg-blue-50 border-blue-500">
//             <Image
//               src="/placeholder.svg?height=300&width=200"
//               alt="Mickey 17"
//               width={200}
//               height={300}
//               className="rounded-md w-full h-auto"
//             />
//             <h3 className="mt-2 font-medium text-center">Mickey 17</h3>
//           </div>
//           {/* More movies would go here */}
//           <div className="border rounded-lg p-2 cursor-pointer">
//             <Image
//               src="/placeholder.svg?height=300&width=200"
//               alt="Movie 2"
//               width={200}
//               height={300}
//               className="rounded-md w-full h-auto"
//             />
//             <h3 className="mt-2 font-medium text-center">Dune: Part Two</h3>
//           </div>
//           <div className="border rounded-lg p-2 cursor-pointer">
//             <Image
//               src="/placeholder.svg?height=300&width=200"
//               alt="Movie 3"
//               width={200}
//               height={300}
//               className="rounded-md w-full h-auto"
//             />
//             <h3 className="mt-2 font-medium text-center">Godzilla x Kong</h3>
//           </div>
//         </div>
//       </div>

//       <div className="mb-8">
//         <h2 className="text-lg font-medium mb-4">Rạp chiếu</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           <div className="border rounded-lg p-3 cursor-pointer bg-blue-50 border-blue-500">
//             <h3 className="font-medium">Galaxy Tân Bình</h3>
//             <p className="text-sm text-gray-500">RAP 4</p>
//           </div>
//           <div className="border rounded-lg p-3 cursor-pointer">
//             <h3 className="font-medium">Galaxy Nguyễn Du</h3>
//             <p className="text-sm text-gray-500">RAP 2</p>
//           </div>
//           <div className="border rounded-lg p-3 cursor-pointer">
//             <h3 className="font-medium">CGV Aeon Mall</h3>
//             <p className="text-sm text-gray-500">RAP 3</p>
//           </div>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-lg font-medium mb-4">Suất chiếu - Thứ Hai, 17/03/2025</h2>
//         <div className="flex flex-wrap gap-3">
//           <Button className="bg-blue-600 hover:bg-blue-700">14:30</Button>
//           <Button variant="outline">16:45</Button>
//           <Button variant="outline">19:00</Button>
//           <Button variant="outline">21:15</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

