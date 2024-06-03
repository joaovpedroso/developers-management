import { useMutation } from "@tanstack/react-query";
import { IManipulationCallbacks } from "@/types/Common";
import { updateLevel } from "@/service/levels";
import { LevelTypeForm } from "@/components/Forms/LevelForm/schema";

const useUpdateLevel = ({ onSuccess, onError }: IManipulationCallbacks) => {
  const { data, isSuccess, isError, isPending, mutate } = useMutation({
    mutationFn: updateLevel,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  const update = (formData: LevelTypeForm) => {
    mutate(formData);
  };

  return {
    update,
    data,
    isSuccess,
    isError,
    isPending,
  };
};

export { useUpdateLevel };
