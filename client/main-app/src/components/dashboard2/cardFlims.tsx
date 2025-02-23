// "use client"

// import { MoreVertical } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardFooter } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import type { Teacher } from "@/types/Teacher"
// // import FormTeacherComponent from "./form.teacher"

// // interface FlimsCardProps {
// //   teacher: Teacher
// // }

// export function TeacherCard({ teacher }: TeacherCardProps) {
//   return (
//     <Card className="overflow-hidden p-4 max-w-sm">
//       <div className=" right-4 top-4">
//       {/* <FormTeacherComponent
//           mode="Edit"
//           initialData={teacher}
//         /> */}
//       </div>

//       <div className="flex flex-col items-center text-center space-y-3 pt-4">
//         <Avatar className="h-24 w-24">
//           <AvatarImage src={teacher.avartar} alt={teacher.lastName} />
//           <AvatarFallback>{teacher.lastName[0]}</AvatarFallback>
//         </Avatar>

//         <div className="space-y-1">
//           <h3 className="font-semibold text-lg text-[#1E2875]">{teacher.lastName}</h3>
//           <p className="text-sm text-muted-foreground">Teacher</p>
//         </div>

//         <div className="flex flex-wrap gap-2 justify-center">
//           {teacher.major.map((major) => (
//             <span
//               key={major.name}
//               className="rounded-full px-4 py-1 text-sm"
//               style={{
//                 backgroundColor:
//                   major.name === "Mathematics"
//                     ? major.color
//                     : major.name === "Science"
//                       ? major.color
//                       : major.name === "Art"
//                         ? major.color
//                         : major.color,
//                 color:
//                   major.name === "Mathematics"
//                     ? "#4CAF50"
//                     : major.name === "Science"
//                       ? "#FF7B5C"
//                       : major.name === "Art"
//                         ? "#FF4081"
//                         : "#ffffff",
//               }}
//             >
//               {major.name}
//             </span>
//           ))}
//         </div>
//       </div>

//       <CardFooter className="grid grid-cols-2 gap-4 mt-6">
//         <Button className="w-full bg-[#4338ca] hover:bg-[#4338ca]/90 text-white" size="lg">
//           Profile
//         </Button>
//         <Button className="w-full bg-[#FF7B5C] hover:bg-[#FF7B5C]/90 text-white" size="lg">
//           Chat
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }