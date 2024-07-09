"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { createKeluarga } from "../../api/api";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  nama_keluarga: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const FormKeluarga = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_keluarga: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createKeluarga(values);

      toast.success("Data berhasil disubmit!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      form.reset();
    } catch (error: any) {
      console.error("Error submitting form", error);
      toast.error("Terjadi kesalahan saat submit data", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nama_keluarga"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Keluarga</FormLabel>
                <FormControl>
                  <Input placeholder="Masukan nama keluarga" {...field} />
                </FormControl>
                <FormDescription>
                  {`Masukan nama keluarga diikuti dengan nama marga/kepala keluarga`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <ToastContainer />
    </>
  );
};

export default FormKeluarga;
