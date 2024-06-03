import { deleteDeveloper } from "@/service/developers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IManipulationCallbacks } from "@/types/Common";

const useDeleteDeveloper = ({ onError, onSuccess }: IManipulationCallbacks) => {
  const { data, isSuccess, isError, isPending, mutate } = useMutation({
    mutationFn: deleteDeveloper,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  const deleteDev = (id: number) => {
    mutate(id);
  };

  return {
    delete: deleteDev,
    data,
    isSuccess,
    isError,
    isPending,
  };
};

export { useDeleteDeveloper };
