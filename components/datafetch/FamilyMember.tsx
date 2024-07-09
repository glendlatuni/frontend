// FamilyMember.tsx
import React from "react";
import FamilyMemberType from "@/type/dbType";
import { Button } from "../ui/button";

interface FamilyMemberProps {
  member: FamilyMemberType;
  onDelete: (id: string) => void;
}

const FamilyMember: React.FC<FamilyMemberProps> = ({ member, onDelete }) => {
  




  const handleDelete = () => {
    onDelete(member.id);
  };
  
  return (
    <div className="border border-gray-300 p-4 m-2 rounded-md">
      <div>
        <h3>{member.nama_lengkap}</h3>
        <p>Jenis Kelamin: {member.jenis_kelamin}</p>
        <p>Tempat Lahir: {member.tempat_lahir}</p>
        <p>
          Tanggal Lahir: {new Date(member.tanggal_lahir).toLocaleDateString()}
        </p>
        <p>Posisi dalam Keluarga: {member.posisiDalamKeluarga}</p>
        <p>Kategori Ibadah: {member.kategoriIbadah}</p>
        <p>Alamat: {member.alamat}</p>
        <p>Nomor HP: {member.nomor_hp}</p>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <Button>Edit</Button>
        <Button variant={"destructive"} onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default FamilyMember;
