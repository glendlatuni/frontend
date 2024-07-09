// Family.tsx
import React from 'react';
import FamilyMember from './FamilyMember';
import { FamilyType } from '@/type/dbType';

interface FamilyProps {
  family: FamilyType;
}

const Family: React.FC<FamilyProps> = ({ family }) => {
  return (
    <div style={{ border: '2px solid #333', margin: '20px', padding: '20px', borderRadius: '10px' }}>
      <h2>{family.nama_keluarga}</h2>
      <div>
        {family.anggota_keluarga.map(member => (
          <FamilyMember key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Family;
