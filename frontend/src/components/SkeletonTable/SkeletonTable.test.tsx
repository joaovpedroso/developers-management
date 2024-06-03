import { render } from "@testing-library/react";
import { SkeletonTable } from "./SkeletonTable";

describe("SkeletonTable", () => {
  it("should match snapshot", () => {
    const { container } = render(<SkeletonTable />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
