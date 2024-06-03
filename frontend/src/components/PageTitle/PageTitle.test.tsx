import { render, screen } from "@testing-library/react";
import { PageTitle } from "./PageTitle";

describe("PageTitle", () => {
  it("should render page title", () => {
    render(
      <PageTitle
        title="Here a page title"
        subtitle="page subtitle"
        icon={<p>icon here</p>}
      />
    );

    const title = screen.getByText("Here a page title");
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByText("page subtitle");
    expect(subtitle).toBeInTheDocument();

    const icon = screen.getByText("page subtitle");
    expect(icon).toBeInTheDocument();
  });

  it("should render only title", () => {
    render(<PageTitle title="Here a page title" />);

    const title = screen.getByText("Here a page title");
    expect(title).toBeInTheDocument();

    const subtitle = screen.queryByText("page subtitle");
    expect(subtitle).not.toBeInTheDocument();

    const icon = screen.queryByText("page subtitle");
    expect(icon).not.toBeInTheDocument();
  });
});
