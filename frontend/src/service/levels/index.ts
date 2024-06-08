import { API_ROUTES } from "@/constants";
import { IFilters } from "@/types/Common";
import { getQueryFilters } from "@/utils";

const getLevels = async (params: IFilters) => {
  const urlParams = getQueryFilters(params);

  const route = API_ROUTES.level.list.replace(
    ":queryParams",
    urlParams.toString()
  );

  const response = await fetch(route);

  if (!response.ok && response.status !== 404) {
    throw new Error("Client error");
  }

  return response.json();
};

const updateLevel = (formData: any) => {
  const route = API_ROUTES.level.update.replace(":nivelID", formData.id);

  delete formData.id;

  return fetch(route, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

const createLevel = (formData: any) => {
  const route = API_ROUTES.level.create;

  return fetch(route, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

const deleteLevel = (levelId: number) => {
  const route = API_ROUTES.developer.delete.replace(
    ":nivelID",
    levelId.toString()
  );

  return fetch(route, {
    method: "DELETE",
  });
};

export { getLevels, updateLevel, createLevel, deleteLevel };
