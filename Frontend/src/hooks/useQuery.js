import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from 'react';

export default function useQueryHooks(fn, queryKey = "friends") {
  const queryClient = useQueryClient(); 
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: fn,
    
  });

  return { data, isLoading, queryClient };
}
