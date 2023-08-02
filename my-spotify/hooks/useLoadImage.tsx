import { Song } from "@/type";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
 

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();
  
  if (!song) {
    return null;
  }

  // Mã hoá đường dẫn hình ảnh trước khi sử dụng nó trong hàm getPublicUrl
  const encodedImagePath = encodeURIComponent(song.image_path);

  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(encodedImagePath); 
 
  return imageData.publicUrl;
}; 

export default useLoadImage;