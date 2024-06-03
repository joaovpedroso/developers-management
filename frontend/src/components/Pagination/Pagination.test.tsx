import { render, screen, waitFor, act } from "@testing-library/react";
import { Pagination } from "./Pagination";
import userEvent from "@testing-library/user-event";

describe("Pagination", () => {
  it("should render pagination", async () => {
    const currentPage = 1;
    const perPage = 10;
    const totalResults = 30;

    render(
      <Pagination
        handleChangePage={jest.fn}
        page={currentPage}
        perPage={perPage}
        total={totalResults}
      />
    );

    const currentResults = await screen.findByText("1–10 de 30");
    expect(currentResults).toBeInTheDocument();

    const perPageButton = screen.getByText("10");
    expect(perPageButton).toBeInTheDocument();

    const perPageLabel = screen.getByText("Por pagina");
    expect(perPageLabel).toBeInTheDocument();
  });

  it("should render per page value when param total is negative", async () => {
    const currentPage = 1;
    const perPage = 10;
    const totalResults = -1;

    render(
      <Pagination
        handleChangePage={jest.fn}
        page={currentPage}
        perPage={perPage}
        total={totalResults}
      />
    );

    const currentResults = await screen.findByText("1–10 de 10");
    expect(currentResults).toBeInTheDocument();
  });

  it("should callback on change per page", async () => {
    const currentPage = 1;
    const perPage = 10;
    const totalResults = 30;

    const mockPerPageChange = jest.fn();

    render(
      <Pagination
        handleChangePage={jest.fn}
        handleChangePerPage={mockPerPageChange}
        page={currentPage}
        perPage={perPage}
        total={totalResults}
      />
    );

    const currentResults = await screen.findByText("1–10 de 30");
    expect(currentResults).toBeInTheDocument();

    const perPageButton = screen.getByText("10");
    expect(perPageButton).toBeInTheDocument();

    const perPageLabel = screen.getByText("Por pagina");
    expect(perPageLabel).toBeInTheDocument();

    userEvent.click(perPageButton);

    const perPageOption = await screen.findByText("100");
    expect(perPageOption).toBeInTheDocument();

    await act(() => userEvent.click(perPageOption));

    expect(mockPerPageChange).toHaveBeenCalled();
  });

  it("should callback on change page", async () => {
    const currentPage = 1;
    const perPage = 10;
    const totalResults = 100;
    const mockPageChange = jest.fn();

    render(
      <Pagination
        handleChangePage={mockPageChange}
        handleChangePerPage={jest.fn}
        page={currentPage}
        perPage={perPage}
        total={totalResults}
      />
    );

    const currentResults = await screen.findByText("1–10 de 100");
    expect(currentResults).toBeInTheDocument();

    const nextPageButton = screen.getByRole("button", {
      description: "Go to next page",
    });

    expect(nextPageButton).toBeInTheDocument();

    await act(() => userEvent.click(nextPageButton));

    expect(mockPageChange).toHaveBeenCalled();
  });
});
