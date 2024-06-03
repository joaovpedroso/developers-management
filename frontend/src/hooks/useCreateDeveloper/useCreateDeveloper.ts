import { DeveloperTypeForm } from "@/components/Forms/DeveloperForm/schema";
import { createDeveloper } from "@/service/developers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IManipulationCallbacks } from "@/types/Common";

const useCreateDeveloper = ({ onError, onSuccess }: IManipulationCallbacks) => {
  const { data, isSuccess, isError, isPending, mutate } = useMutation({
    mutationFn: createDeveloper,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  const create = (formData: DeveloperTypeForm) => {
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

export { useCreateDeveloper };
