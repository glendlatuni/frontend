// Family.tsx
import React, { useState } from 'react';
import FamilyMember from './FamilyMember';
import { FamilyType } from '@/type/dbType';
import { deleteUser, findallkeluarga } from '@/api/api';
import { toast } from 'react-toastify';

interface FamilyProps {
  family: FamilyType;
  onRefresh: () => void;
}

const Family: React.FC<FamilyProps> = ({ family, onRefresh }) => {
const [familyMember, setFamilyMember] = useState<FamilyType[]>([]);





const deleteFamilyMember = async (id: string) => {
  try {
    
    await deleteUser(id);
    setFamilyMember(familyMember.filter(member => member.id !== id));

    onRefresh();

    toast.success("Data berhasil disubmit!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  } catch (error) {
    console.error('Gagal menghapus anggota keluarga:', error);
  }

}

  return (
    <div style={{ border: '2px solid #333', margin: '20px', padding: '20px', borderRadius: '10px' }}>
      <h2>{family.nama_keluarga}</h2>
      <div>
        {family.anggota_keluarga.map(member => (
          <FamilyMember key={member.id} member={member}
          onDelete={deleteFamilyMember}
          />
        ))}
      </div>
    </div>
  );
};

export default Family;
