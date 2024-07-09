'use client'

import React,{ useCallback, useEffect, useState} from "react";

import { findallkeluarga } from '@/api/api';

import Family from '@/components/datafetch/Family';



import { FamilyType } from '@/type/dbType';

const PostTable = () => {

  const [data, setData] = useState<FamilyType[]>([]);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)


  const fetchData = useCallback(async () => {

    setLoading(true);

    try {
      const result = await findallkeluarga();
      setData(result);
      setLoading(false);
    } catch (error:any) {
      setError(error);
      setLoading(false);
    }

  }, []);


  useEffect(() => {

    fetchData();

  }, [fetchData])


  const handleRefresh = useCallback(async () => {
fetchData();
  }, [fetchData]);


  if(loading) return <div>Loading</div>
  if(error) return <div>Error: {error}</div>

  return  <div>
  <h1>Data Keluarga</h1>
  {data.map(family => (
    <Family key={family.id} family={family} onRefresh={handleRefresh}/>
  ))}
</div>
  
};

export default PostTable;
