import { useMutation, useQuery } from "@tanstack/react-query";
import { IManipulationCallbacks } from "@/types/Common";
import { deleteLevel } from "@/service/levels";

const useDeleteLevel = ({ onError, onSuccess }: IManipulationCallbacks) => {
  const { data, isSuccess, isError, isPending, mutate } = useMutation({
    mutationFn: deleteLevel,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  const deleteLevelItem = (id: number) => {
    mutate(id);
  };

  return {
    delete: deleteLevelItem,
    data,
    isSuccess,
    isError,
    isPending,
  };
};

export { useDeleteLevel };
