// FamilyMember.tsx
import React from 'react';
import  FamilyMemberType  from '@/type/dbType';

interface FamilyMemberProps {
  member: FamilyMemberType;
}

const FamilyMember: React.FC<FamilyMemberProps> = ({ member }) => {
  return (
    <div style={{ border: '1px solid #ddd', margin: '10px', padding: '10px', borderRadius: '5px' }}>
      <h3>{member.nama_lengkap}</h3>
      <p>Jenis Kelamin: {member.jenis_kelamin}</p>
      <p>Tempat Lahir: {member.tempat_lahir}</p>
      <p>Tanggal Lahir: {new Date(member.tanggal_lahir).toLocaleDateString()}</p>
      <p>Posisi dalam Keluarga: {member.posisiDalamKeluarga}</p>
      <p>Kategori Ibadah: {member.kategoriIbadah}</p>
      <p>Alamat: {member.alamat}</p>
      <p>Nomor HP: {member.nomor_hp}</p>
    </div>
  );
};

export default FamilyMember;
