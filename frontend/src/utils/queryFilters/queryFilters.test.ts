import { OrdenationEnum } from "@/types/Common";
import { getQueryFilters } from "./queryFilters";

describe("queryFilters", () => {
  it("return url search params with object value", () => {
    const result = getQueryFilters({
      order: OrdenationEnum.asc,
      orderBy: "id",
      page: 1,
      perPage: 10,
      query: "search",
    });

    expect(result.toString()).toBe(
      "order=asc&orderBy=id&page=1&perPage=10&query=search"
    );
  });

  it("return url search params with empty values when params is undefined", () => {
    const result = getQueryFilters({
      order: OrdenationEnum.asc,
      orderBy: undefined,
      page: undefined,
      perPage: undefined,
      query: undefined,
    });

    expect(result.toString()).toBe("order=asc&orderBy=&page=&perPage=&query=");
  });
});
