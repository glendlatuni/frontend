import DashboardCard from "@/components/dashboard/DashboardCard";
import PostTable from "@/components/posts/PostTable";
import { Separator } from "@/components/ui/separator";


export default function Home() {
  return (
    <>
      <div>
        <DashboardCard />

        <Separator className="my-4" />
        
      </div>
    </>
  );
}
