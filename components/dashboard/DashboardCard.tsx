import CardProps from "../props/CardProps";
import { AmpersandIcon, Eye, User2, View } from "lucide-react";
import Count from "@/components/props/Fetching";

const DashboardCard: React.FC = () => {
  return (
    <div className="gap-7 md:grid-cols-4 lg:grid grid-cols-4 grid-rows-[auto_auto_auto]">
      <CardProps
        title="Jumlah keluarga"
        footer={<Count type="familyCount" />}
        icon={<View />}
      />
      <CardProps title="Viwers" footer="4" icon={<Eye />} />
      <CardProps
        title="Jumlah Anggota Jemaat"
        footer={<Count type="memberCount" />}
        icon={<User2 />}
      />
      <CardProps title="Admin" footer="3" icon={<AmpersandIcon />} />
    </div>
  );
};

export default DashboardCard;
