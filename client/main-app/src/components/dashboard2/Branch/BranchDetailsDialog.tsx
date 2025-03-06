// "use client";
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
// import { Film, Building2, MapPin, Plus } from "lucide-react"
// import { ScreeningRoom, CinemaBranch } from "@/types"

// interface BranchDetailsDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   selectedBranch: CinemaBranch | null
//   onOpenAddRoomDialog: (branch: CinemaBranch) => void
//   onAddRoom: (branch: CinemaBranch) => void
// }

// const BranchDetailsDialog: React.FC<BranchDetailsDialogProps> = ({ open, onOpenChange, selectedBranch, onAddRoom }) => {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[700px]">
//         {selectedBranch && (
//           <>
//             <DialogHeader>
//               <DialogTitle>{selectedBranch.name}</DialogTitle>
//               <DialogDescription className="flex items-center mt-1">
//                 <MapPin className="h-4 w-4 mr-1" />
//                 {selectedBranch.address}
//               </DialogDescription>
//             </DialogHeader>
//             <Tabs defaultValue="info" className="mt-4">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="info">Thông tin</TabsTrigger>
//                 <TabsTrigger value="rooms">Phòng chiếu ({selectedBranch.rooms?.length})</TabsTrigger>
//               </TabsList>
//               <TabsContent value="info" className="space-y-3 mt-4">
               
//                 <div>
//                   <h3 className="font-medium mb-2">Tổng số phòng chiếu</h3>
//                   <div className="flex items-center">
//                     <Building2 className="h-5 w-5 mr-2" />
//                     <span>{selectedBranch.rooms?.length} phòng</span>
//                   </div>
//                 </div>
//                 <div className="flex justify-end">
//                   <Button onClick={() => onAddRoom(selectedBranch)}>
//                     <Plus className="mr-2 h-4 w-4" /> Thêm phòng chiếu
//                   </Button>
//                 </div>
//               </TabsContent>
//               <TabsContent value="rooms" className="mt-4">
//                 <div className="space-y-4">
//                   {selectedBranch.rooms?.length === 0 ? (
//                     <div className="text-center py-8">
//                       <Film className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
//                       <p className="text-muted-foreground">Chưa có phòng chiếu nào</p>
//                       <Button className="mt-4" onClick={() => onAddRoom(selectedBranch)}>
//                         <Plus className="mr-2 h-4 w-4" /> Thêm phòng chiếu
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {selectedBranch.rooms?.map((room: ScreeningRoom) => (
//                         <Card key={room.id}>
//                           <CardHeader className="pb-2">
//                             <CardTitle className="text-lg">{room.name}</CardTitle>
//                             <CardDescription>Loại: {room.type}</CardDescription>
//                           </CardHeader>
//                           <CardContent>
//                             <div className="flex items-center">
//                               <span>Sức chứa: {room.capacity} ghế</span>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </>
//         )}
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default BranchDetailsDialog