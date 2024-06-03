import { render, screen } from "@testing-library/react";
import { Table } from "./Table";
import { MOCK_HEADER_COLUMNS } from "./Header/Header.test";
import { MOCK_ROWS } from "./Body/Body.test";

export const wrapperRender = (children: React.ReactElement) =>
  render(<table>{children}</table>);

describe("Table", () => {
  it("should render table", () => {
    render(
      <Table.default label="table-test">
        <Table.header
          columns={MOCK_HEADER_COLUMNS}
          onChangeOrdenation={jest.fn}
        />
        <Table.body rows={MOCK_ROWS} />
      </Table.default>
    );

    const tableElement = screen.getByRole("table", {
      name: "table-test",
    });

    const tableHeaderColumn = screen.getAllByRole("columnheader");
    const tableBodyRows = screen.getAllByRole("row");

    expect(tableElement).toBeInTheDocument();
    expect(tableHeaderColumn).toHaveLength(3);

    const headerLengthRow = 1;
    const bodyLengthRows = 2;

    expect(tableBodyRows).toHaveLength(headerLengthRow + bodyLengthRows);
  });
});
