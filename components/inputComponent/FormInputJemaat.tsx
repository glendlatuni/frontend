"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUser, findallkeluarga } from "@/api/api";

import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";


// interfce untuk menyimpan data keluarga dari API
interface Keluarga {
  id: string;
  nama_keluarga: string;
}

const API_URL = "http://localhost:4000";

// menyimpan data array kedalam variable
const jenis_kelamin = ["Pria", "Wanita"] as const;
const posisiDalamKeluargaOptions = ["Ayah", "Ibu", "Anak"] as const;
const kategoriIbadahOptions = ["PKB", "PW", "PAM", "PAR"] as const;
const lingkunganValues = ["1", "2", "3", "4", "5", "6", "7"] as const;
const kspValues = ["KSP-001", "KSP-002", "KSP-003", "KSP-004"] as const;


// deklarasi skema dari zod untuk validasi
const FormSchema = z.object({
  // nama
  nama_lengkap: z.string().min(2, {
    message: "Name harus diisi.",
  }),
// tempat lahir
  tempat_lahir: z.string().min(2, {
    message: "Tempat lahir harus diisi.",
  }),
// tanggal lahir
tanggal_lahir: z
  .string()
  .refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Tanggal lahir harus valid.",
  }),

// jenis kelamin
  jenis_kelamin: z.enum(jenis_kelamin, {
    required_error: "Jenis kelamin harus dipilih.",
  }),

// posisi dalam keluarga
  posisiDalamKeluarga: z.enum(posisiDalamKeluargaOptions, {
    required_error: "Posisi dalam keluarga harus dipilih.",
  }),
// lingkungan
  lingkungan: z
    .enum(lingkunganValues, {
      required_error: "Lingkungan harus dipilih.",
    })
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(1).max(7)),
// kategori ibadah
  kategoriIbadah: z.enum(kategoriIbadahOptions, {
    required_error: "Kategori ibadah harus dipilih.",
  }),
// keluarga
  keluarga: z.string().min(1, "Keluarga harus dipilih."),
// ksp
  ksp: z.enum(kspValues, {
    required_error: "Wajib memilih KSP",
  }),
// alamat
  alamat: z.string().min(2, {
    message: "Tempat lahir harus diisi.",
  }),
  // nomor hp
  nomor_hp: z.string().min(2, {
    message: "Tempat lahir harus diisi.",
  }),
// Majelis atau bukan
  isMajelis: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === true || val === "true")
    .pipe(z.boolean()),
// bisa lturgi atau tidak
  liturgis: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === true || val === "true")
    .pipe(z.boolean()),
});



const InputAnggota = () => {
  // state untuk menimpa data keluarga dari backend
  const [keluargaOptions, SetKeluargaOptions] = useState<Keluarga[]>([]);

  // fetch data keluarga dari backend untuk ditampilkan di dropdown
  useEffect(() => {
    const fetchData = async () => {
      const response = await findallkeluarga();
      const datas: Keluarga[] = response;
      SetKeluargaOptions(datas);
    };
    fetchData();
  }, []);

  // deklarasi form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // function untuk mengirimkan data
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
    // Block kode untuk  mengirimkan data ke server
    try {
      const formattedValues = {
        ...values,
        tanggal_lahir: values.tanggal_lahir 
          ? new Date(values.tanggal_lahir + 'T00:00:00Z').toISOString()
          : null,
        lingkungan: Number(values.lingkungan),
        // Pastikan keluarga adalah string ID
        keluarga: values.keluarga, // Ini harus berupa string ID
      };

      const newUser = await createUser({ user: formattedValues });
      console.log("User created successfully:", newUser);
      form.reset();
      toast.success("Data berhasil disubmit!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="nama_lengkap"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NAMA</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tempat_lahir"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TEMPAT LAHIR</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tanggal_lahir"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TANGGAL LAHIR</FormLabel>
                <FormControl>
                  <Input type="date" {...field} 
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alamat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nomor_hp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor HP</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jenis_kelamin"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>JENIS KELAMIN</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Pria" />
                      </FormControl>
                      <FormLabel className="font-normal">Pria</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Wanita" />
                      </FormControl>
                      <FormLabel className="font-normal">Wanita</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="posisiDalamKeluarga"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Posisi dalam keluarga</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="_" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {posisiDalamKeluargaOptions.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lingkungan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lingkungan</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lingkungan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lingkunganValues.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kategoriIbadah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori Ibadah</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kategoriIbadahOptions.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="keluarga"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keluarga</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih keluarga" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {keluargaOptions.map((keluarga) => (
                      <SelectItem key={keluarga.id} value={keluarga.id}>
                        {keluarga.nama_keluarga}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ksp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>KSP</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih KSP" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kspValues.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isMajelis"
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Majelis</SelectItem>
                    <SelectItem value="false">Non Majelis</SelectItem>
                  </SelectContent>
                </FormItem>
              </Select>
            )}
          />

          <FormField
            control={form.control}
            name="liturgis"
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <FormItem>
                  <FormLabel>Liturgos</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Liturgos</SelectItem>
                    <SelectItem value="false">Non Liturgos</SelectItem>
                  </SelectContent>
                </FormItem>
              </Select>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default InputAnggota;
