
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@/types/wedding";

const uploadImage = async (file: File, user: User | null, fileName: string): Promise<string> => {
  if (!user) {
    throw new Error("User must be logged in to upload images");
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${user.id}/${fileName}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('wedding-images')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('wedding-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

export default uploadImage;
