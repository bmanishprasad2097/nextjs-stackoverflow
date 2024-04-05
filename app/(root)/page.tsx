
import Navbar from "@/components/navbar";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div>
      <div className="h1-bold">Main Content</div>
      <div className="h2-bold">Main Content</div>
      <div className="h3-bold">Main Content</div>
      <UserButton afterSignOutUrl="/" />      
    </div>
  );
}
