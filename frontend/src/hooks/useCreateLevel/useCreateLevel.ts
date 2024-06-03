import { useMutation, useQuery } from "@tanstack/react-query";
import { IManipulationCallbacks } from "@/types/Common";
import { createLevel } from "@/service/levels";
import { LevelTypeForm } from "@/components/Forms/LevelForm/schema";

const useCreateLevel = ({ onError, onSuccess }: IManipulationCallbacks) => {
  const { data, isSuccess, isError, isPending, mutate } = useMutation({
    mutationFn: createLevel,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  const create = (formData: LevelTypeForm) => {
    mutate(formData);
  };

  return {
    create,
    data,
    isSuccess,
    isError,
    isPending,
  };
};

export { useCreateLevel };
