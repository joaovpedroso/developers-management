import { screen } from "@testing-library/dom";
import { wrapperRender } from "../Table.test";
import { Header } from "./Header";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

export const MOCK_HEADER_COLUMNS = [
  {
    label: "First",
    order: "fírst_column",
  },
  {
    label: "Second",
  },
  {
    label: "Actions",
  },
];

describe("Header", () => {
  it("should render table header", () => {
    wrapperRender(
      <Header columns={MOCK_HEADER_COLUMNS} onChangeOrdenation={jest.fn} />
    );

    const tableHead = screen.getByRole("rowgroup");
    expect(tableHead).toBeInTheDocument();

    const columns = screen.getAllByRole("columnheader");
    expect(columns).toHaveLength(3);
  });

  it("should render ordenation icon when click in column name", async () => {
    const mockOnChangeOrder = jest.fn();

    wrapperRender(
      <Header
        columns={MOCK_HEADER_COLUMNS}
        onChangeOrdenation={mockOnChangeOrder}
      />
    );

    const tableHead = screen.getByRole("rowgroup");
    expect(tableHead).toBeInTheDocument();

    const columns = screen.getAllByRole("columnheader");
    expect(columns).toHaveLength(3);

    const firstColumn = screen.getByText("First");
    expect(firstColumn).toBeInTheDocument();

    await act(() => userEvent.click(firstColumn));

    expect(mockOnChangeOrder).toHaveBeenCalledWith("first_column", "desc");

    const descIcon = screen.getByTestId("ArrowDropDownIcon");
    expect(descIcon).toBeInTheDocument();

    await act(() => userEvent.click(firstColumn));

    expect(mockOnChangeOrder).toHaveBeenCalledWith("first_column", "asc");
    expect(descIcon).not.toBeInTheDocument();
  });

  it("should not call onChange order mock when option is disabled", async () => {
    const mockOnChangeOrder = jest.fn();

    wrapperRender(
      <Header
        columns={MOCK_HEADER_COLUMNS}
        onChangeOrdenation={mockOnChangeOrder}
      />
    );

    const tableHead = screen.getByRole("rowgroup");
    expect(tableHead).toBeInTheDocument();

    const columns = screen.getAllByRole("columnheader");
    expect(columns).toHaveLength(3);

    const secondColumn = screen.getByText("Second");
    expect(secondColumn).toBeInTheDocument();

    await act(() => userEvent.click(secondColumn));

    expect(mockOnChangeOrder).not.toHaveBeenCalled();
  });
});
