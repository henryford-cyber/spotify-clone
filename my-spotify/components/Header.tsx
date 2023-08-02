"use client";

 
import { twMerge } from "tailwind-merge";
import {RxCaretLeft, RxCaretRight}from "react-icons/rx"
import { useRouter } from "next/navigation";
import { GoHome } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";  
import { toast } from "react-hot-toast";
import {useSupabaseClient } from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import usePlayer from "@/hooks/usePlayer";

// material UI
import ButtonMa from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MouseEvent, useState } from 'react';
import { Divider } from "@mui/material";
//  materal UI
interface HeaderProps {
    children:React.ReactNode;
    className?:string
} 
const Header:React.FC<HeaderProps> = (
    {
        children,
        className 
    }
) => { const player = usePlayer();
    const authModal=useAuthModal();
    const router =useRouter();
    const supabaseClient=useSupabaseClient();
    const {user}=useUser(); 
    // dropdown btn
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const handleLogout=async()=>{
        const {error}=await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();

        if(error){  
            toast.error(error.message);
        }
        else{  
            toast.success('Đăng xuất thành công')
        }
    }
    return ( 
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6 `,className)}>

            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button onClick={() => router.back()}  className="rounded-full bg-black items-center justify-center hover:opacity-75 transition"><RxCaretLeft className="text-white" size={35} /></button>
                    <button onClick={()=>router.forward()} className="rounded-full bg-black items-center justify-center hover:opacity-75 transition"><RxCaretRight className="text-white" size={35} /></button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center ">
                    <button  
                        onClick={() => router.push('/')} 
                        className="rounded-full p-2 bg-white justify-center hover:opacity-75 transition ">
                        <GoHome className="text-black " size={20}/>
                    </button> 
                    <button  onClick={() => router.push('/search')}  className="rounded-full p-2 bg-white justify-center hover:opacity-75 transition ">
                        <BiSearch className="text-black " size={20}/>
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {user?(
                        <div 
                        className="flex gap-x-4 items-center"> 
                            <Button  className="bg-white w-[43px] " 
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <FaUserAlt/>
                            </Button>
                            <Menu id="basic-menu"
                                className="w-[200px] top-[80px] left-[775px]"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                                PaperProps={{
                                    style: {
                                        padding:'0 5px',
                                        background: '#000',
                                        width: '200px', // Set the width here
                                        height: 'auto', // Set the height here (you can adjust this value as needed)
                                        top: '90px',
                                        left: '775px',
                                    },
                                  }}
                            >
                                <MenuItem className="menu-item-hover"  onClick={()=>{ router.push('/account'); handleClose}} style={{ color: 'white' }}>
                                    Hồ sơ
                                </MenuItem>
                                <MenuItem className="menu-item-hover"  onClick={handleClose} style={{ color: 'white' }}>
                                    Cài đặt
                                </MenuItem>
                                <Divider style={{ backgroundColor: '#ffffff47' }} />
                                <MenuItem className="menu-item-hover"  onClick={()=>{handleLogout();handleClose()}} style={{ color: 'white' }}>
                                    Đăng xuất
                                </MenuItem>
                            </Menu>
                             
                        </div>  
                    ):( 
                    <>
                     <div>
                        <Button 
                        onClick={authModal.onOpen}
                        className="bg-transparent text-neutral-300 font-medium"
                        >Đăng ký
                        </Button>
                    </div>
                    <div>
                        <Button 
                        onClick={authModal.onOpen}
                        className="bg-white px-6 py-2"
                        >Đăng nhập
                        </Button>
                    </div>
                    
                    </>
                    )}
                </div>
            </div>
            {children}
        </div>
     );
}
 
export default Header;