import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/test-utils";
import LoginContainer from "@/container/login/LoginComponent";

describe("LoginContainer", () => {
  it("shows error if fields are empty", () => {
    renderWithProviders(<LoginContainer />);
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(screen.getByText(/please enter both email and password/i)).toBeInTheDocument();
  });
});
