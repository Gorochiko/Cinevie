"use client"

import { useState } from "react"
import { Plus, MapPin, Film, Building2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface ScreeningRoom {
  id: string
  name: string
  capacity: number
  type: string
}

interface CinemaBranch {
  id: string
  name: string
  address: string
  description: string
  rooms: ScreeningRoom[]
}


export default function CinemaBranchManagement() {
  const [branches, setBranches] = useState<CinemaBranch[]>([])

  const [selectedBranch, setSelectedBranch] = useState<CinemaBranch | null>(null)
  const [newBranch, setNewBranch] = useState({
    name: "",
    address: "",
    description: "",
  })
  const [newRoom, setNewRoom] = useState({
    name: "",
    seat: 0,
    type: "",
  })

  const [addBranchOpen, setAddBranchOpen] = useState(false)
  const [addRoomOpen, setAddRoomOpen] = useState(false)
  const [branchDetailsOpen, setBranchDetailsOpen] = useState(false)

  const handleAddBranch = () => {
    const branch: CinemaBranch = {
      id: Date.now().toString(),
      name: newBranch.name,
      address: newBranch.address,
      description: newBranch.description,
      rooms: [],
    }
    setBranches([...branches, branch])
    setNewBranch({ name: "", address: "", description: "" })
    setAddBranchOpen(false)
  }

  const handleAddRoom = () => {
    if (!selectedBranch) return

    const room: ScreeningRoom = {
      id: `${selectedBranch.id}-${Date.now()}`,
      name: newRoom.name,
      capacity: newRoom.seat,
      type: newRoom.type,
    }

    const updatedBranches = branches.map((branch) => {
      if (branch.id === selectedBranch.id) {
        return {
          ...branch,
          rooms: [...branch.rooms, room],
        }
      }
      return branch
    })

    setBranches(updatedBranches)
    setNewRoom({ name: "", seat: 0, type: "" })
    setAddRoomOpen(false)
  }

  const openAddRoomDialog = (branch: CinemaBranch) => {
    setSelectedBranch(branch)
    setAddRoomOpen(true)
  }

  const openBranchDetails = (branch: CinemaBranch) => {
    setSelectedBranch(branch)
    setBranchDetailsOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Danh sách chi nhánh</h2>
        <Dialog open={addBranchOpen} onOpenChange={setAddBranchOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Thêm chi nhánh
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm chi nhánh mới</DialogTitle>
              <DialogDescription>Nhập thông tin chi nhánh rạp chiếu phim mới</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên chi nhánh</Label>
                <Input
                  id="name"
                  value={newBranch.name}
                  onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                  placeholder="Nhập tên chi nhánh"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Textarea
                  id="address"
                  value={newBranch.address}
                  onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                  placeholder="Nhập địa chỉ chi nhánh"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={newBranch.description}
                  onChange={(e) => setNewBranch({ ...newBranch, description: e.target.value })}
                  placeholder="Nhập mô tả chi nhánh"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddBranchOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleAddBranch}>Thêm chi nhánh</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <Card key={branch.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{branch.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openBranchDetails(branch)}>Xem chi tiết</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openAddRoomDialog(branch)}>Thêm phòng chiếu</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="flex items-start mt-1">
                <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{branch.address}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <div className="flex items-center mb-2">
                  <Film className="h-4 w-4 mr-2" />
                  <span className="font-medium">Phòng chiếu: {branch.rooms.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {branch.rooms.slice(0, 3).map((room) => (
                    <Badge key={room.id} variant="outline">
                      {room.name} ({room.type})
                    </Badge>
                  ))}
                  {branch.rooms.length > 3 && <Badge variant="outline">+{branch.rooms.length - 3}</Badge>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-1">
              <Button variant="outline" className="w-full" onClick={() => openBranchDetails(branch)}>
                Xem chi tiết
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add Room Dialog */}
      <Dialog open={addRoomOpen} onOpenChange={setAddRoomOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm phòng chiếu mới</DialogTitle>
            <DialogDescription>Thêm phòng chiếu mới cho chi nhánh {selectedBranch?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="roomName">Tên phòng</Label>
              <Input
                id="roomName"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                placeholder="Nhập tên phòng chiếu"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="capacity">Sức chứa</Label>
              <Input
                id="capacity"
                type="number"
                value={newRoom.seat || ""}
                onChange={(e) => setNewRoom({ ...newRoom, seat: Number.parseInt(e.target.value) || 0 })}
                placeholder="Nhập sức chứa"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Loại phòng</Label>
              <Input
                id="type"
                value={newRoom.type}
                onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                placeholder="Ví dụ: 2D, 3D, IMAX, 4DX..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddRoomOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddRoom}>Thêm phòng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Branch Details Dialog */}
      <Dialog open={branchDetailsOpen} onOpenChange={setBranchDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedBranch && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBranch.name}</DialogTitle>
                <DialogDescription className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedBranch.address}
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="info" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Thông tin</TabsTrigger>
                  <TabsTrigger value="rooms">Phòng chiếu ({selectedBranch.rooms.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium mb-2">Mô tả</h3>
                    <p>{selectedBranch.description}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Tổng số phòng chiếu</h3>
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      <span>{selectedBranch.rooms.length} phòng</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => openAddRoomDialog(selectedBranch)}>
                      <Plus className="mr-2 h-4 w-4" /> Thêm phòng chiếu
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="rooms" className="mt-4">
                  <div className="space-y-4">
                    {selectedBranch.rooms.length === 0 ? (
                      <div className="text-center py-8">
                        <Film className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Chưa có phòng chiếu nào</p>
                        <Button className="mt-4" onClick={() => openAddRoomDialog(selectedBranch)}>
                          <Plus className="mr-2 h-4 w-4" /> Thêm phòng chiếu
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedBranch.rooms.map((room) => (
                            <Card key={room.id}>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">{room.name}</CardTitle>
                                <CardDescription>Loại: {room.type}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2"
                                  >
                                    <path d="M19 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
                                    <path d="M2 12h20" />
                                    <path d="M7 12v7" />
                                    <path d="M17 12v7" />
                                  </svg>
                                  <span>Sức chứa: {room.capacity} ghế</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => openAddRoomDialog(selectedBranch)}>
                            <Plus className="mr-2 h-4 w-4" /> Thêm phòng chiếu
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

