export const tricketsApi = async (token) => {
    
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tricket`
,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",});
  
  
  const data = await res.json();
  return data || [];
};
