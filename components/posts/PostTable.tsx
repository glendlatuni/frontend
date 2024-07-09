'use client'

import React,{ useEffect, useState} from "react";

import { findallkeluarga } from '@/api/api';

import Family from '@/components/datafetch/Family';



import { FamilyType } from '@/type/dbType';


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";





const PostTable = () => {

  const [data, setData] = useState<FamilyType[]>([]);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
const fetching = async () => {

  try {
    const result = await findallkeluarga();
    setData(result);
    setLoading(false);
  } catch (error:any) {
    setError(error);
    setLoading(false);
  }
};
fetching();

  }, [])


  if(loading) return <div>Loading</div>
  if(error) return <div>Error: {error}</div>

  return  <div>
  <h1>Data Keluarga</h1>
  {data.map(family => (
    <Family key={family.id} family={family} />
  ))}
</div>
  
};

export default PostTable;
