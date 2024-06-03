import { API_URL } from "@/constants";
import { IFilters } from "@/types/Common";
import { getQueryFilters } from "@/utils";

const getDevelopers = async (params: IFilters) => {
  const urlParams = getQueryFilters(params);

  const route = API_URL.developer.list.replace(
    ":queryParams",
    urlParams.toString()
  );

  const response = await fetch(route);

  if (!response.ok && response.status !== 404) {
    throw new Error("Client error");
  }
  return response.json();
};

const updateDevelopers = (formData) => {
  const route = API_URL.developer.update.replace(":devID", formData.id);

  delete formData.id;

  return fetch(route, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

const createDeveloper = (formData) => {
  const route = API_URL.developer.create;

  return fetch(route, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

const deleteDeveloper = (devId: number) => {
  const route = API_URL.developer.delete.replace(":devID", devId.toString());

  return fetch(route, {
    method: "DELETE",
  });
};

export { getDevelopers, updateDevelopers, createDeveloper, deleteDeveloper };
