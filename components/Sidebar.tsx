import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { FileText, LineChart, FilePlus, Settings, Search } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Command className="bg-slate-300 rounded-none">
      <CommandInput placeholder="Ketik untuk mencari" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <FileText className="h-4 w-4 mr-3" />
            <Link href={"/inputdata"}>Input Data</Link>
          </CommandItem>
          <CommandItem>
            {" "}
            <FilePlus className="h-4 w-4 mr-3" />
            <Link href={"/input"}>Create & Edit Schedule</Link>
          </CommandItem>
          <CommandItem>
            {" "}
            <LineChart className="h-4 w-4 mr-3" />
            <Link href={"/input"}>Create Info</Link>
          </CommandItem>
          <CommandItem>
            {" "}
            <Search className="h-4 w-4 mr-3" />
            <Link href={"/searchdata"}>Search Data</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            {" "}
            <Settings className="h-4 w-4 mr-3" />
            <Link href={"/input"}>Setting</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
