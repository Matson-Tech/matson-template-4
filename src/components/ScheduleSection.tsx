
import { useState } from "react";
import { useWedding } from "@/contexts/WeddingContext";
import { EditableText } from "./EditableText";
import { WeddingSection } from "./WeddingSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Clock, Plus, Trash2 } from "lucide-react";
import type { ScheduleItem } from "@/types/wedding";

export const ScheduleSection = () => {
  const { weddingData, updateWeddingData, isLoggedIn } = useWedding();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ScheduleItem>>({
    time: "",
    event: "",
    description: ""
  });

  const addScheduleItem = async () => {
    if (!newItem.time || !newItem.event) return;
    
    const newScheduleItem: ScheduleItem = {
      id: Date.now().toString(),
      time: newItem.time,
      event: newItem.event,
      description: newItem.description || ""
    };

    const updatedSchedule = [...weddingData.schedule, newScheduleItem];
    await updateWeddingData({ schedule: updatedSchedule });
    
    setNewItem({ time: "", event: "", description: "" });
    setIsAddingNew(false);
  };

  const removeScheduleItem = async (id: string) => {
    const updatedSchedule = weddingData.schedule.filter(item => item.id !== id);
    await updateWeddingData({ schedule: updatedSchedule });
  };

  return (
    <WeddingSection id="schedule" className="bg-gradient-to-br from-purple-100 to-pink-200">
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-4">
            Wedding Schedule
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for a day filled with love, laughter, and celebration
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {weddingData.schedule.map((item, index) => (
            <Card key={item.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex items-center justify-center w-12 h-12 bg-pink-500 text-white rounded-full font-bold">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-4">
                        <EditableText
                          value={item.time}
                          path={`schedule.${index}.time`}
                          className="text-lg font-semibold text-pink-600"
                        />
                        <EditableText
                          value={item.event}
                          path={`schedule.${index}.event`}
                          className="text-xl font-bold text-gray-800"
                        />
                      </div>
                      <EditableText
                        value={item.description}
                        path={`schedule.${index}.description`}
                        className="text-gray-600"
                      />
                    </div>
                  </div>
                  {isLoggedIn && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeScheduleItem(item.id)}
                      className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {isLoggedIn && (
            <Card className="bg-white/60 backdrop-blur-sm border-dashed border-2 border-pink-300">
              <CardContent className="p-6">
                <Button
                  onClick={() => setIsAddingNew(true)}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Schedule Item
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Schedule Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <Input
                  value={newItem.time || ""}
                  onChange={(e) => setNewItem({...newItem, time: e.target.value})}
                  placeholder="e.g., 5:00 PM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Event</label>
                <Input
                  value={newItem.event || ""}
                  onChange={(e) => setNewItem({...newItem, event: e.target.value})}
                  placeholder="e.g., Ceremony"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newItem.description || ""}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  placeholder="e.g., Wedding ceremony begins"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                Cancel
              </Button>
              <Button onClick={addScheduleItem}>
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </WeddingSection>
  );
};
