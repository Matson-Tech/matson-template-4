import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWedding } from "@/contexts/WeddingContext";

interface EditableTextProps {
    value: string;
    onSave: (value: string) => Promise<void> | void;
    multiline?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const EditableText = ({
    value,
    onSave,
    multiline = false,
    className = "",
    children,
}: EditableTextProps) => {
    const { isLoggedIn } = useWedding();
    const [isOpen, setIsOpen] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave(editValue);
            setIsOpen(false);
        } catch (error) {
            console.error("Error saving:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsOpen(false);
    };

    const editableClassName = isLoggedIn
        ? "bg-red-100 hover:bg-red-200 cursor-pointer transition-colors border border-1 border-red-600"
        : "";

    return (
        <>
            <div
                className={`${className} ${editableClassName}`}
                onClick={() => isLoggedIn && setIsOpen(true)}
                onKeyDown={() => isLoggedIn && setIsOpen(true)}
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
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isSaving}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
