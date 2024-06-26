import { INivel } from "@/app/desenvolvedores/Developers.types";
import { getLevels } from "@/service/levels";
import { IFilters, IResponseData, OrdenationEnum } from "@/types/Common";
import { useQuery } from "@tanstack/react-query";

const useLevels = (filters?: IFilters) => {
  const defaultFilters = {
    order: OrdenationEnum.asc,
  };

  const { isError, isSuccess, data, isLoading, refetch } = useQuery<
    IResponseData<INivel>
  >({
    queryKey: ["levels"],
    queryFn: () => getLevels(filters ?? defaultFilters),
  });

  return {
    data: data,
    isLoading,
    isSuccess,
    isError,
    refetch,
  };
};

export { useLevels };
