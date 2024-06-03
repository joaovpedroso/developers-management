import { IFilters } from "@/types/Common";

const getQueryFilters = (params: IFilters) => {
  const urlParams = new URLSearchParams();
  urlParams.append("order", params.order);
  urlParams.append("orderBy", params.orderBy ?? "");
  urlParams.append("page", params.page ? params.page.toString() : "");
  urlParams.append("perPage", params.perPage ? params.perPage.toString() : "");
  urlParams.append("query", params.query ?? "");

  return urlParams;
};

export { getQueryFilters };
