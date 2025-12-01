import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertCircle } from 'lucide-react';

interface MenuItemEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  currentCategory: "Kitchen" | "Bar" | "Snack";
}

export function MenuItemEditDialog({
  open,
  onOpenChange,
  itemName,
  currentCategory,
}: MenuItemEditDialogProps) {
  const [newName, setNewName] = useState(itemName);
  const [newCategory, setNewCategory] = useState<"Kitchen" | "Bar" | "Snack">(currentCategory);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setNewName(itemName);
      setNewCategory(currentCategory);
    }
  }, [open, itemName, currentCategory]);

  const handleSave = () => {
    // Cosmetic only - show notification
    alert("This is cosmetic, it keeps crashing when I implement it T-T");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#3c044d] border-[#8b6dac] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-['Poppins',sans-serif]">Edit Menu Item</DialogTitle>
          <DialogDescription className="text-white/60">
            Make changes to the menu item. All existing orders will be updated.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Banner */}
          <div className="flex items-start gap-2 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
            <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-yellow-400 font-['Poppins',sans-serif]">
              Warning: This will update all existing orders containing this menu item.
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="item-name" className="text-white font-['Poppins',sans-serif]">
              Menu Item Name
            </Label>
            <Input
              id="item-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter menu item name"
              className="bg-[#2a0339] border-[#8b6dac] text-white placeholder:text-white/40"
            />
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-white font-['Poppins',sans-serif]">
              Category
            </Label>
            <Select value={newCategory} onValueChange={(value: "Kitchen" | "Bar" | "Snack") => setNewCategory(value)}>
              <SelectTrigger className="bg-[#2a0339] border-[#8b6dac] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#3c044d] border-[#8b6dac] text-white">
                <SelectItem value="Kitchen">Kitchen</SelectItem>
                <SelectItem value="Bar">Bar</SelectItem>
                <SelectItem value="Snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent border-[#8b6dac] text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            disabled={!newName.trim()}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
