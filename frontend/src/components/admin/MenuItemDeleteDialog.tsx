import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { AlertCircle } from 'lucide-react';

interface MenuItemDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
}

export function MenuItemDeleteDialog({
  open,
  onOpenChange,
  itemName,
}: MenuItemDeleteDialogProps) {
  const handleConfirm = () => {
    // Cosmetic only - show notification
    alert("This is cosmetic, it keeps crashing when I implement it T-T");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#3c044d] border-[#8b6dac] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-['Poppins',sans-serif] text-red-400">
            Delete Menu Item
          </DialogTitle>
          <DialogDescription className="text-white/60">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Banner */}
          <div className="flex items-start gap-2 p-3 bg-red-400/10 border border-red-400/30 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm text-red-400 font-['Poppins',sans-serif]">
                This will remove <strong>"{itemName}"</strong> from ALL existing orders across ALL departments.
              </p>
              <p className="text-xs text-red-300 font-['Poppins',sans-serif]">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <p className="text-white/80 font-['Poppins',sans-serif]">
            Are you sure you want to delete this menu item?
          </p>
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
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete Permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
