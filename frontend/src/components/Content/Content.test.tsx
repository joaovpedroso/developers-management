import { render, screen } from "@testing-library/react";
import { Content } from "./Content";

describe("Content", () => {
  it("render children in component", () => {
    render(
      <Content>
        <h1>Is a children</h1>
      </Content>
    );

    const childrenElement = screen.getByRole("heading");
    expect(childrenElement).toBeInTheDocument();
  });
});
