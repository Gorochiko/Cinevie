import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { createTheater } from "@/lib/actions";
const AddBranchDialog = ({ addBranchOpen, setAddBranchOpen,onBranchAdded  }:any) => {
  const [newBranch, setNewBranch] = useState({
    name: "",
    address: ""
   
  });
  const handleAddBranch = async () => {
    try {
      const response = await createTheater(newBranch);
      console.log("Thêm rạp thành công:", response);
      onBranchAdded(response); 
      setAddBranchOpen(false); 
    } catch (error) {
      console.error("Lỗi khi thêm chi nhánh:", error);
    }
  };
  return (
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
         
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAddBranchOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleAddBranch}>Thêm chi nhánh</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBranchDialog;
