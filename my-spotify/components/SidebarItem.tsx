import Link from "next/link";
import {IconType} from "react-icons"
import { twMerge } from "tailwind-merge"; 

interface SidebarItemProps{
    icon:IconType;
    label:string;
    active?:boolean;
    href:string;
} 
const SidebarItem :React.FC<SidebarItemProps>= (
    {
        icon:Icon,
        label,
        href,
        active,
    }
) => {
    return ( 
        <Link href={href}
        className={
            twMerge(`flex flex-row items-center w-full gap-x-4 text-md font-bold cursor-pointer hover:text-white text-neutral-400 transition `,active && "text-white")}
        >
           <Icon size={32}/> <p className="truncate w-full">{label}</p>
        </Link>
     );
}
 
export default SidebarItem;