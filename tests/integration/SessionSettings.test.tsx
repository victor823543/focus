import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import { describe, expect } from "vitest";
import SessionSettings from "../../src/components/settings/SessionSettings/SessionSettings";
import AuthProvider from "../../src/provider/authProvider";
import { renderWithProviders } from "../../src/utils/test-utils";
import { mockSession, mockSessions } from "../mocks/mockData";

describe("SessionSettings Component", () => {
  const mockPushAlert = vi.fn();

  const renderComponent = () => {
    renderWithProviders(
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <BrowserRouter>
            <SessionSettings pushAlert={mockPushAlert} />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>,
      {
        preloadedState: {
          session: { sessions: mockSessions, selected: mockSession },
        },
      },
    );
  };

  describe("Basic Rendering", () => {
    it("renders correctly with default props", async () => {
      renderComponent();

      const header = await screen.findAllByRole("heading", {
        name: /session/i,
      });
      expect(header[0]).toBeInTheDocument();
    });

    it("renders session information correctly", async () => {
      renderComponent();

      expect(
        await screen.findByDisplayValue(mockSession.title),
      ).toBeInTheDocument();
      expect(
        await screen.findByDisplayValue(mockSession.start),
      ).toBeInTheDocument();
    });
  });

  describe("Session Update Functionality", () => {
    it("updates sessiontitle correctly", async () => {
      renderComponent();
      const titleInput = await screen.findByDisplayValue(mockSession.title);
      fireEvent.change(titleInput, { target: { value: "New Title" } });
      await waitFor(() =>
        fireEvent.click(
          screen.getByRole("button", { name: /update session/i }),
        ),
      );
      expect(mockPushAlert).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Session updated",
          type: "success",
        }),
      );

      expect(await screen.findByDisplayValue("New Title")).toBeInTheDocument();
    });

    it("updates session start date correctly", async () => {
      renderComponent();
      const dateInput = await screen.findByDisplayValue(mockSession.start);
      fireEvent.change(dateInput, { target: { value: "2022-01-01" } });
      await waitFor(() =>
        fireEvent.click(
          screen.getByRole("button", { name: /update session/i }),
        ),
      );
      expect(mockPushAlert).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Session updated",
          type: "success",
        }),
      );

      expect(await screen.findByDisplayValue("2022-01-01")).toBeInTheDocument();
    });

    it("updates session end date correctly", async () => {
      renderComponent();
      const dateInput = await screen.findByDisplayValue(
        mockSession.end as string,
      );
      fireEvent.change(dateInput, { target: { value: "2022-01-01" } });
      await waitFor(() =>
        fireEvent.click(
          screen.getByRole("button", { name: /update session/i }),
        ),
      );
      expect(mockPushAlert).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Session updated",
          type: "success",
        }),
      );

      expect(await screen.findByDisplayValue("2022-01-01")).toBeInTheDocument();
    });
  });

  describe("Session Deletion Functionality", () => {
    it("should show warning before deleting session", async () => {
      renderComponent();
      fireEvent.click(await screen.findByRole("button", { name: /delete/i }));
      expect(
        await screen.findByRole("heading", { name: /delete your session/i }),
      ).toBeInTheDocument();
      fireEvent.click(await screen.findByRole("button", { name: /cancel/i }));
      expect(
        screen.queryByRole("heading", { name: /delete your session/i }),
      ).not.toBeInTheDocument();
    });

    it("should delete the session and navigate to dashboard", async () => {
      renderComponent();
      fireEvent.click(await screen.findByRole("button", { name: /delete/i }));
      fireEvent.click(await screen.findByTestId("confirm-delete"));
      await waitFor(() => {
        expect(window.location.pathname).toBe("/dashboard");
      });
    });
  });
});
