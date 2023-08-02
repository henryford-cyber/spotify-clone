import Header from "@/components/Header";
import Image from "next/image";
import AccountContent from "./components/AccountContent";

const Account = () => {
  return (
    <div className="bg-neutral-900 rounded-lg h-fit w-full overflow-hidden overflow-y-auto bg-gradient-to-b from-emerald-800">
      
      <AccountContent />
    </div>
  )
}

export default Account;
