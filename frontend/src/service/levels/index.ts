import { API_URL } from "@/constants";
import { IFilters } from "@/types/Common";

const BASE_URL = "http://localhost:8000/api/niveis";

const getLevels = async (params: IFilters) => {
  const urlParams = new URLSearchParams(params);

  const route = API_URL.level.list.replace(
    ":queryParams",
    urlParams.toString()
  );

  const response = await fetch(route);

  if (!response.ok && response.status !== 404) {
    throw new Error("Client error");
  }

  return response.json();
};

const updateLevel = (formData) => {
  const route = API_URL.level.update.replace(":nivelID", formData.id);

  delete formData.id;

  return fetch(route, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

const createLevel = (formData) => {
  const route = API_URL.level.create;

  return fetch(route, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

const deleteLevel = (levelId: number) => {
  const route = API_URL.developer.delete.replace(
    ":nivelID",
    levelId.toString()
  );

  return fetch(route, {
    method: "DELETE",
  });
};

export { getLevels, updateLevel, createLevel, deleteLevel };
