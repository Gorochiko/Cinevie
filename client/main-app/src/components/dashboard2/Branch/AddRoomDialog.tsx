import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {createRoom} from "@/lib/actions";
const AddRoomDialog = ({ addRoomOpen, setAddRoomOpen, selectedBranch, newRoom, setNewRoom, handleAddRoom }:any) => {
  handleAddRoom = () => {
    const roomdata = createRoom(newRoom);
    console.log("Thêm phòng thành công:", roomdata);
  }
  return (
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
              type=""
              value={newRoom.seats || ""}
              onChange={(e) => setNewRoom({ ...newRoom, seats: Number.parseInt(e.target.value) || 0 })}
              placeholder="Nhập sức chứa"
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
  );
};

export default AddRoomDialog;
