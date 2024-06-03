import { DeveloperTypeForm } from "@/components/Forms/DeveloperForm/schema";
import { updateDevelopers } from "@/service/developers";
import { useMutation } from "@tanstack/react-query";
import { IManipulationCallbacks } from "@/types/Common";

const useUpdateDevelopers = ({
  onSuccess,
  onError,
}: IManipulationCallbacks) => {
  const { data, isSuccess, isError, isPending, mutate } = useMutation({
    mutationFn: updateDevelopers,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    },
  });

  const update = (formData: DeveloperTypeForm) => {
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

export { useUpdateDevelopers };
