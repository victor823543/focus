import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect } from "vitest";
import AccountSettings from "../../src/components/settings/AccountSettings/AccountSettings";
import * as useLogout from "../../src/hooks/useLogout";
import * as authProvider from "../../src/provider/authProvider";
import { renderWithProviders } from "../../src/utils/test-utils";
import { mockUser } from "../mocks/mockData";

vi.mock("../../../provider/authProvider", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../../../hooks/useLogout", () => ({
  default: vi.fn(),
}));

describe("AccountSettings Component", () => {
  const mockSetToken = vi.fn();
  const mockPushAlert = vi.fn();
  const mockLogout = vi.fn();

  beforeEach(() => {
    // Set the initial return values for useAuth
    vi.spyOn(authProvider, "useAuth").mockReturnValue({
      user: mockUser,
      token: "mockToken",
      setToken: mockSetToken,
      userStatus: authProvider.UserStatus.Configured,
      reloadUserStatus: vi.fn(),
      setStatus: vi.fn(),
      signNewToken: vi.fn(),
    });

    vi.spyOn(useLogout, "default").mockReturnValue(mockLogout);
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test
  });

  const renderComponent = () => {
    renderWithProviders(
      <QueryClientProvider client={new QueryClient()}>
        <authProvider.default>
          <BrowserRouter>
            <AccountSettings pushAlert={mockPushAlert} />
          </BrowserRouter>
        </authProvider.default>
      </QueryClientProvider>,
    );
  };

  describe("Basic Rendering", () => {
    it("renders correctly with default props", () => {
      renderComponent();
      expect(
        screen.getAllByRole("heading", { name: /account/i })[0],
      ).toBeInTheDocument();
    });

    it("renders user information correctly", async () => {
      renderComponent();
      expect(
        await screen.findByText(`Email: ${mockUser.email}`),
      ).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(mockUser.username),
      ).toBeInTheDocument();
    });
  });

  describe("Submit button functionality", () => {
    it("should be disabled on start", async () => {
      renderComponent();
      expect(
        await screen.findByRole("button", { name: /save/i }),
      ).toBeDisabled();
    });

    it("should be enabled when username is changed", async () => {
      renderComponent();
      const usernameInput = await screen.findByDisplayValue(mockUser.username);
      fireEvent.change(usernameInput, { target: { value: "newUsername" } });
      expect(
        await screen.findByRole("button", { name: /save/i }),
      ).toBeEnabled();
    });

    it("should be disabled when password is not reentered", async () => {
      renderComponent();
      const passwordInput = await screen.findByTestId("password-input");
      fireEvent.change(passwordInput, { target: { value: "newPassword123" } });
      expect(
        await screen.findByRole("button", { name: /save/i }),
      ).toBeDisabled();
    });

    it("should be enabled when password is reentered", async () => {
      renderComponent();
      const passwordInput = await screen.findByTestId("password-input");
      const rePasswordInput = await screen.findByTestId("re-password-input");
      fireEvent.change(passwordInput, { target: { value: "newPassword123" } });
      fireEvent.change(rePasswordInput, {
        target: { value: "newPassword123" },
      });
      const submitButton = await screen.findByRole("button", { name: /save/i });
      expect(submitButton).toBeEnabled();
    });

    it("should be disabled when password is too short or does not contain a number", async () => {
      renderComponent();
      const passwordInput = await screen.findByTestId("password-input");
      const rePasswordInput = await screen.findByTestId("re-password-input");
      fireEvent.change(passwordInput, { target: { value: "short" } });
      fireEvent.change(rePasswordInput, { target: { value: "short" } });
      expect(
        await screen.findByRole("button", { name: /save/i }),
      ).toBeDisabled();
      fireEvent.change(passwordInput, { target: { value: "noNumber" } });
      fireEvent.change(rePasswordInput, { target: { value: "noNumber" } });
      expect(
        await screen.findByRole("button", { name: /save/i }),
      ).toBeDisabled();
    });
  });

  describe("Account Update And Deletion", () => {
    it("should update the username", async () => {
      renderComponent();
      const usernameInput = await screen.findByDisplayValue(mockUser.username);
      await waitFor(() =>
        fireEvent.change(usernameInput, { target: { value: "newUsername" } }),
      );
      await waitFor(() =>
        fireEvent.click(screen.getByRole("button", { name: /save/i })),
      );
      await waitFor(() =>
        expect(mockPushAlert).toHaveBeenCalledWith(
          expect.objectContaining({ message: "Account updated successfully" }),
        ),
      );
      await waitFor(() => expect(mockSetToken).toHaveBeenCalled());
    });

    it("should update the password", async () => {
      renderComponent();
      const passwordInput = await screen.findByTestId("password-input");
      const rePasswordInput = await screen.findByTestId("re-password-input");
      await waitFor(() =>
        fireEvent.change(passwordInput, {
          target: { value: "newPassword123" },
        }),
      );
      await waitFor(() =>
        fireEvent.change(rePasswordInput, {
          target: { value: "newPassword123" },
        }),
      );
      await waitFor(() =>
        fireEvent.click(screen.getByRole("button", { name: /save/i })),
      );
      await waitFor(() =>
        expect(mockPushAlert).toHaveBeenCalledWith(
          expect.objectContaining({ message: "Account updated successfully" }),
        ),
      );
      await waitFor(() => expect(mockSetToken).toHaveBeenCalled());
    });

    it("should show warning before deleting account", async () => {
      renderComponent();
      fireEvent.click(await screen.findByRole("button", { name: /delete/i }));
      expect(
        await screen.findByRole("heading", { name: /are you sure/i }),
      ).toBeInTheDocument();
      fireEvent.click(await screen.findByRole("button", { name: /cancel/i }));
      expect(
        screen.queryByRole("heading", { name: /are you sure/i }),
      ).not.toBeInTheDocument();
    });

    it("should delete the account", async () => {
      renderComponent();
      fireEvent.click(await screen.findByRole("button", { name: /delete/i }));
      fireEvent.click(await screen.findByTestId("confirm-delete"));
      await waitFor(() => expect(mockLogout).toHaveBeenCalled());
    });
  });
});
