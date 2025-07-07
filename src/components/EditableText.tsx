
import { useState } from "react";
import { useWedding } from "@/contexts/WeddingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface EditableTextProps {
  value: string;
  path: string;
  multiline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const EditableText = ({ 
  value, 
  path, 
  multiline = false, 
  className = "",
  children 
}: EditableTextProps) => {
  const { isLoggedIn, updateWeddingData } = useWedding();
  const [isOpen, setIsOpen] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = async () => {
    const pathArray = path.split('.');
    const updateObj: any = {};
    
    let current = updateObj;
    for (let i = 0; i < pathArray.length - 1; i++) {
      current[pathArray[i]] = {};
      current = current[pathArray[i]];
    }
    current[pathArray[pathArray.length - 1]] = editValue;

    await updateWeddingData(updateObj);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsOpen(false);
  };

  const editableClassName = isLoggedIn ? "bg-red-100 hover:bg-red-200 cursor-pointer transition-colors" : "";

  return (
    <>
      <div
        className={`${className} ${editableClassName}`}
        onClick={() => isLoggedIn && setIsOpen(true)}
      >
        {children || value}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {multiline ? (
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={5}
              />
            ) : (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
