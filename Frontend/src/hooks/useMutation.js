import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useHooksMutation(fn , queryKey=["authUser"]) {
  const queryClient = useQueryClient()

  const { mutate, error, isPending,isSuccess } = useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })

  return { mutate, error, isPending ,isSuccess}
}