'use client';
import uniqid from "uniqid";
import React, { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from "@/hooks/useUser";

import Modal from './Modal';
import Input from './Input';
import Button from './Button';


const UploadModal = () => {
    const uploadModal =useUploadModal();
    const [isLoading,setIsLoading]=useState(false);
    const {user}=useUser();
    const supabaseClient=useSupabaseClient();
    const router =useRouter();
    const { 
      register, 
      handleSubmit,
      reset
      }=useForm<FieldValues>({
        defaultValues:{
          author:'',
          title:'',
          song:null,
          image:null,
      }
    }) ;

    const onChange=(open:boolean)=>{
            if(!open){
                reset();
                uploadModal.onClose();
            }
    }
    const onSubmit:SubmitHandler<FieldValues>= async(values)=>{ 
          try {
            setIsLoading(true);
            const imageFile=values.image?.[0];
            const songFile=values.song?.[0];
          
           
            
            if(!imageFile || !songFile || !user){
              toast.error('Dữ liệu không được bỏ trống');
              return;
            }
              
              
            const uniqueID=uniqid();

    //Tải lên bài hát
            const {
              data:songData,
              error:songError,
            }=await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueID}`,songFile,{
              cacheControl:'3600',
              upsert:false
            });
            // Truy cập trường 'path' trong đối tượng JSON của 'imageData'
            const songPath = songData?.path;

            // Nếu không tìm thấy 'imagePath', hoặc 'user' không tồn tại, hiển thị thông báo lỗi
            if (!songPath || !user) {
              setIsLoading(false);
              return toast.error('Dữ liệu không hợp lệ');

            }
            console.log("SongPath",songPath);

            if(songError){
              setIsLoading(false);
              return toast.error('Tải bài hát lên thất bại ! vui lòng thử lại !')
            }

      // Tải lên hình ảnh bài hát
             const {
              data:imageData,
              error:imageError,
            }=await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueID}`,imageFile,{
              cacheControl:'3600',
              upsert:false
            });

            if(imageError){
              setIsLoading(false);
              return toast.error('Tải hình ảnh lên thất bại ! vui lòng thử lại !')
            }

             // Truy cập trường 'path' trong đối tượng JSON của 'imageData'
            const imagePath = imageData?.path;

            // Nếu không tìm thấy 'imagePath', hoặc 'user' không tồn tại, hiển thị thông báo lỗi
            if (!imagePath || !user) {
              setIsLoading(false);
              return toast.error('Dữ liệu không hợp lệ');

            }  

            const {
              error:supabaseError,
            }= await supabaseClient.from('songs').insert({
              user_id:user.id,
              title:values.title,
              author:values.author,
              image_path:imagePath,
              song_path:songPath,

            });
            
            if(supabaseError){
              setIsLoading(false);
              return toast.error(supabaseError.message)
            }
            router.refresh();
            setIsLoading(false);
            toast.success("Đã thêm bài hát thành công ")
            uploadModal.onClose();
          } catch (error) {
            toast.error("Hệ thống gặp vấn đề vui lòng thử lại sau")
          }finally{
            setIsLoading(false);
          }

    }
  return (
    <Modal
    title='Thêm bài hát '
    description='Tải lên file mp3 '
    isOpen={uploadModal.isOpen}
    onChange={onChange } >
     <form onSubmit={handleSubmit(onSubmit)}  
     className='flex flex-col gap-y-4'
     >
      <Input id="title" disabled={isLoading}
        {...register('title',{required:true})}
        placeholder='Tên bài hát' />

      <Input id="author" disabled={isLoading}
        {...register('author',{required:true})}
        placeholder='Tên tác giả' />

      <div>
        <div className='pb-1'>
            Chọn file bài hát
        </div>
      <Input id="song"
       type="file"
       disabled={isLoading}
       accept='.mp3'
        {...register('song',{required:true})}
       />
      </div>
      <div>
        <div className='pb-1'>
            Chọn hình ảnh cho bài hát
        </div>
      <Input id="image"
       type="file"
       disabled={isLoading}
       accept='image/*'
        {...register('image',{required:true})}
       />
      </div>
      <Button disabled={isLoading} type="submit">Thêm bài hát</Button>
     </form>
    </Modal>
  )
}

export default UploadModal;