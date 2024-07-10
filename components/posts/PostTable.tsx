'use client'

import React,{ useCallback, useEffect, useState} from "react";

import { findallkeluarga, updateUser } from '@/api/api';

import Family from '@/components/datafetch/Family';



import { FamilyType } from '@/type/dbType';

const PostTable = () => {

  const [data, setData] = useState<FamilyType[]>([]);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null);


  const fetchData = useCallback(async () => {

    setLoading(true);

    try {
      const result = await findallkeluarga();
      setData(result);
      setLoading(false);
    } catch (error:any) {
      setError(error);
      setLoading(false);
    }finally{
      setLoading(false);
    }

  }, []);


  useEffect(() => {

    fetchData();

  }, [fetchData])


  const handleRefresh = useCallback(async () => {
fetchData();
  }, [fetchData]);


  const handleEdit = useCallback((id: string) => {
    setEditingId(id);
  }, []);


  const handleUpdate = useCallback(async(updateFamily: FamilyType) => {
    try {
      await updateUser(updateFamily.id, updateFamily);
      handleRefresh();
    } catch (error) {
      
    }
  }, [handleRefresh])

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
  },[])



  if(loading) return <div>Loading</div>
  if(error) return <div>Error: {error}</div>

  return  <div>
  <h1>Data Keluarga</h1>
  {data.map(family => (
    <Family 
    key={family.id} 
    family={family} 
    onRefresh={handleRefresh}
    onEdit={handleEdit}
    onUpdate={handleUpdate}
    onCancelEdit={handleCancelEdit}
    isEditing={family.id === editingId}
    
    />
  ))}
</div>
  
};

export default PostTable;
