
import Navbar from "@/components/navbar";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />      
    </div>
  );
}
