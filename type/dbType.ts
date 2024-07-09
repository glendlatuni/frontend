export default interface FamilyMemberType {
  id: string;
  nama_lengkap: String;
  jenis_kelamin: String;
  tempat_lahir: String;
  tanggal_lahir: Date;
  posisiDalamKeluarga: String;
  kategoriIbadah: String;
  lingkungan: number;
  ksp: String;
  kategori: String;
  alamat: String;
  nomor_hp: String;
}

// types.ts
export interface FamilyType {
  id: string;
  nama_keluarga: string;
  anggota_keluarga: FamilyMemberType[];
}
