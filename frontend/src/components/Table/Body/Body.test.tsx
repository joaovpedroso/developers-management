import { screen } from "@testing-library/react";
import { Body } from "./Body";
import { wrapperRender } from "../Table.test";

export const MOCK_ROWS = [
  <tr key="first">
    <td>First Row</td>
  </tr>,
  <tr key="second">
    <td>second Row</td>
  </tr>,
];

describe("Body", () => {
  it("should render table rows", () => {
    wrapperRender(<Body rows={MOCK_ROWS} />);

    const tableBody = screen.getByRole("rowgroup");
    expect(tableBody).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(2);
  });
});
