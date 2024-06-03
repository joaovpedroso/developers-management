import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";

jest.mock("next/navigation", () => ({
  ...(jest.requireActual("next/navigation") as any),
  useRouter: jest.fn(),
}));

describe("Layout", () => {
  it("render complete layout with sidebar and content", () => {
    render(
      <Layout>
        <h1>Is a children of Layout</h1>
      </Layout>
    );

    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toBeInTheDocument();

    const mainComponent = screen.getByRole("main");
    expect(mainComponent).toBeInTheDocument();

    const childrenElement = screen.getByText("Is a children of Layout");
    expect(childrenElement).toBeInTheDocument();
  });
});
