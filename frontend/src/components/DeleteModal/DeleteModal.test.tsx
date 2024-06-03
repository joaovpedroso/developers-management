import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DeleteModal } from "./DeleteModal";
import userEvent from "@testing-library/user-event";

describe("DeleteModal", () => {
  it("should render modal", () => {
    render(
      <DeleteModal
        isOpen
        isLoading={false}
        itemId={123}
        onConfirm={jest.fn()}
        onRefuse={jest.fn()}
      />
    );

    const modalTitle = screen.getByText("Você deseja realmente excluir?");
    expect(modalTitle).toBeInTheDocument();
  });

  it("should render skeleton in button confirm when isLoading is true", () => {
    render(
      <DeleteModal
        isOpen
        isLoading
        itemId={123}
        onConfirm={jest.fn()}
        onRefuse={jest.fn()}
      />
    );

    const modalTitle = screen.getByText("Você deseja realmente excluir?");
    expect(modalTitle).toBeInTheDocument();

    const confirmButton = screen.queryByText("Sim");
    expect(confirmButton).not.toBeInTheDocument();

    const skeleton = screen.getByTestId("confirm-button-skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("should callback methods on confirm and cancel", async () => {
    const mockConfirm = jest.fn();
    const mockCancel = jest.fn();

    render(
      <DeleteModal
        isOpen
        isLoading={false}
        itemId={123}
        onConfirm={mockConfirm}
        onRefuse={mockCancel}
      />
    );

    const confirmButton = screen.getByText("Sim");
    expect(confirmButton).toBeInTheDocument();

    userEvent.click(confirmButton);

    await waitFor(() => expect(mockConfirm).toHaveBeenCalled());

    const cancelButton = screen.getByText("Cancelar");
    expect(cancelButton).toBeInTheDocument();

    userEvent.click(cancelButton);
    await waitFor(() => expect(mockCancel).toHaveBeenCalled());
  });

  it("shoud call onRefuse on click outside modal", async () => {
    const mockCancel = jest.fn();

    render(
      <DeleteModal
        isOpen
        isLoading={false}
        itemId={123}
        onConfirm={jest.fn}
        onRefuse={mockCancel}
      />
    );

    const modalTitle = screen.getByText("Você deseja realmente excluir?");
    expect(modalTitle).toBeInTheDocument();

    fireEvent.keyDown(modalTitle, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });
    await waitFor(() => expect(mockCancel).toHaveBeenCalled());
  });
});
