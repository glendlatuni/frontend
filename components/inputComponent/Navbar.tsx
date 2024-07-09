import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormKeluarga from "./FormKeluarga";
import FormInputJemaat from "./FormInputJemaat";

const Navbar = () => {
  return (
    <div >
      <Tabs defaultValue="Keluarga" className="flex flex-col">
        <TabsList className="flex gap-10 p-6">
          <TabsTrigger value="Keluarga">Input Keluarga</TabsTrigger>
          <TabsTrigger value="Jemaat">Input Jemaat</TabsTrigger>
          <TabsTrigger value="Jadwal">Buat Jadwal</TabsTrigger>
        </TabsList>
        <TabsContent value="Keluarga">
            <FormKeluarga/>
        </TabsContent>
        <TabsContent value="Jemaat">
          <FormInputJemaat/>
        </TabsContent>
        <TabsContent value="Jadwal">form input jadwal</TabsContent>
      </Tabs>
    </div>
  );
};

export default Navbar;
