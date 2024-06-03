import { act, render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import userEvent from "@testing-library/user-event";

const mockRouterPush = jest.fn();

jest.mock("next/navigation", () => ({
  ...(jest.requireActual("next/navigation") as any),
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe("Sidebar", () => {
  it("should render nav options", () => {
    render(<Sidebar />);

    const sideBar = screen.getByRole("complementary");
    expect(sideBar).toBeInTheDocument();

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });

  it("should navigate on click in nav options", async () => {
    render(<Sidebar />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    const developersLink = screen.getByText("Desenvolvedores");
    expect(developersLink).toBeInTheDocument();

    await act(() => userEvent.click(developersLink));

    expect(mockRouterPush).toHaveBeenCalledWith("/desenvolvedores");
  });

  it("should minimize sidebar on click in arrow button", async () => {
    render(<Sidebar />);

    const openedDrawerIconTestId = "ChevronLeftIcon";
    const closedDrawerIconTestId = "ChevronRightIcon";

    const actionButtonClose = screen.getByTestId(openedDrawerIconTestId);
    expect(actionButtonClose).toBeInTheDocument();

    await act(() => userEvent.click(actionButtonClose));

    expect(
      screen.queryByTestId(openedDrawerIconTestId)
    ).not.toBeInTheDocument();

    const actionButtonOpen = screen.getByTestId(closedDrawerIconTestId);
    expect(actionButtonOpen).toBeInTheDocument();
  });
});
