import { formatDateToLocale, parseDate } from "./date";

jest.useFakeTimers().setSystemTime(new Date("2024-06-03 00:00:00"));

describe("date", () => {
  it("returns correct date time", () => {
    const date = new Date();
    const result = parseDate("2024-06-03");

    expect(result).toEqual(date);
  });

  it("parse date to locale BR", () => {
    const result = formatDateToLocale("2024-06-03");

    expect(result).toBe("03/06/2024");
  });
});
