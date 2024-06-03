import { IDeveloper } from "@/app/desenvolvedores/Developers.types";
import { getDevelopers } from "@/service/developers";
import { IFilters, IResponseData, OrdenationEnum } from "@/types/Common";
import { useQuery } from "@tanstack/react-query";

const useDevelopers = (filters: IFilters) => {
  const defaultFilters = {
    order: OrdenationEnum.asc,
  };

  const { isError, isSuccess, data, isLoading, refetch } = useQuery<
    IResponseData<IDeveloper>
  >({
    queryKey: ["developers"],
    queryFn: () => getDevelopers(filters ?? defaultFilters),
    refetchOnMount: false,
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch,
  };
};

export { useDevelopers };
