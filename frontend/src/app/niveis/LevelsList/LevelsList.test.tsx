import { render, screen } from "@testing-library/react";
import { LevelsList } from "./LevelsList";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { ActionEnum } from "@/types/Common";

const mockMeta = {
  total: 4,
  per_page: 10,
  current_page: 1,
  last_page: 1,
};

const mockData = [
  {
    id: 1,
    nivel: "Nivel 1",
    developers_count: 2,
    created_at: "2024-05-14",
    updated_at: "2024-06-01",
  },
  {
    id: 2,
    nivel: "Nivel 2",
    developers_count: 0,
    created_at: "2024-06-01",
    updated_at: "2024-06-01",
  },
  {
    id: 3,
    nivel: "Nivel 3",
    developers_count: 0,
    created_at: "2024-06-02",
    updated_at: "2024-06-02",
  },
  {
    id: 4,
    nivel: "Nivel 4",
    developers_count: 0,
    created_at: "2024-06-03",
    updated_at: "2024-06-05",
  },
];

const tableHeadRowLength = 1;

describe("LevelsList", () => {
  it("should render populate table", () => {
    render(
      <LevelsList
        data={mockData}
        meta={mockMeta}
        onChangeOrdenation={jest.fn}
        onChangePage={jest.fn}
        onChangePerPage={jest.fn}
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockData.length + tableHeadRowLength);
  });

  it("should render empty table", () => {
    render(
      <LevelsList
        data={[]}
        meta={{
          current_page: 0,
          last_page: 0,
          per_page: 10,
          total: 0,
        }}
        onChangeOrdenation={jest.fn}
        onChangePage={jest.fn}
        onChangePerPage={jest.fn}
      />
    );

    const emptyMessage = screen.getByText("Nenhum dado encontrado...");
    expect(emptyMessage).toBeInTheDocument();
  });

  it("should handle callback on click in order column", async () => {
    const mockOnChangeOrdenation = jest.fn();
    render(
      <LevelsList
        data={mockData}
        meta={mockMeta}
        onChangeOrdenation={mockOnChangeOrdenation}
        onChangePage={jest.fn}
        onChangePerPage={jest.fn}
      />
    );

    const enableOrderColumn = screen.getByText("Dev. associados");
    expect(enableOrderColumn).toBeInTheDocument();

    await act(() => userEvent.click(enableOrderColumn));

    expect(mockOnChangeOrdenation).toHaveBeenCalledWith(
      "developers_count",
      "desc"
    );

    await act(() => userEvent.click(enableOrderColumn));

    expect(mockOnChangeOrdenation).toHaveBeenCalledWith(
      "developers_count",
      "asc"
    );
  });

  it("should handle callback on click in change page", async () => {
    const mockOnChangePage = jest.fn();
    render(
      <LevelsList
        data={mockData}
        meta={{ current_page: 1, last_page: 2, per_page: 10, total: 20 }}
        onChangeOrdenation={jest.fn}
        onChangePage={mockOnChangePage}
        onChangePerPage={jest.fn}
      />
    );

    const nextPageButton = screen.getByRole("button", {
      description: "Go to next page",
    });

    expect(nextPageButton).toBeInTheDocument();

    await act(() => userEvent.click(nextPageButton));

    expect(mockOnChangePage).toHaveBeenCalledWith(2);
  });

  it("should handle callback on click in change per page registers", async () => {
    const mockOnChangePerPage = jest.fn();
    render(
      <LevelsList
        data={mockData}
        meta={{ current_page: 1, last_page: 2, per_page: 10, total: 20 }}
        onChangeOrdenation={jest.fn}
        onChangePage={jest.fn}
        onChangePerPage={mockOnChangePerPage}
      />
    );

    const currentResults = await screen.findByText("1–10 de 20");
    expect(currentResults).toBeInTheDocument();

    const perPageButton = screen.getByText("10");
    expect(perPageButton).toBeInTheDocument();

    userEvent.click(perPageButton);

    const perPageOption = await screen.findByText("100");
    expect(perPageOption).toBeInTheDocument();

    await act(() => userEvent.click(perPageOption));

    expect(mockOnChangePerPage).toHaveBeenCalledWith(100);
  });

  it("should handle callback on click in edit or delete icon", async () => {
    const mockOnSelectItem = jest.fn();
    render(
      <LevelsList
        data={mockData}
        meta={{ current_page: 1, last_page: 2, per_page: 10, total: 20 }}
        onChangeOrdenation={jest.fn}
        onChangePage={jest.fn}
        onChangePerPage={jest.fn}
        onSelectItem={mockOnSelectItem}
      />
    );

    const firstEditRowButton = screen.getAllByLabelText("edit")[0];
    expect(firstEditRowButton).toBeInTheDocument();

    await act(() => userEvent.click(firstEditRowButton));
    expect(mockOnSelectItem).toHaveBeenCalledWith(1, ActionEnum.EDIT);

    const secondDeleteRowButton = screen.getAllByLabelText("delete")[1];
    expect(secondDeleteRowButton).toBeInTheDocument();

    await act(() => userEvent.click(secondDeleteRowButton));
    expect(mockOnSelectItem).toHaveBeenCalledWith(2, ActionEnum.DELETE);
  });

  it("should render disabled delete button when associate developers", async () => {
    render(
      <LevelsList
        data={mockData}
        meta={{ current_page: 1, last_page: 2, per_page: 10, total: 20 }}
        onChangeOrdenation={jest.fn}
        onChangePage={jest.fn}
        onChangePerPage={jest.fn}
        onSelectItem={jest.fn}
      />
    );

    const firstDeleteRowButton = screen.getAllByLabelText("delete")[0];

    expect(firstDeleteRowButton).toBeInTheDocument();
    expect(firstDeleteRowButton).toBeDisabled();

    const tooltip = screen.getByLabelText(
      "Não é possivel excluir, desenvolvedores associados a esse nível."
    );

    expect(tooltip).toBeInTheDocument();
  });
});
