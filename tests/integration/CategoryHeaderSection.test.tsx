import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import { describe, expect } from "vitest";
import CategoryHeaderSection from "../../src/components/categories/CategoryHeaderSection/CategoryHeaderSection";
import { formatDate } from "../../src/utils/functions";
import { renderWithProviders } from "../../src/utils/test-utils";
import { mockGetCategoryResponse } from "../mocks/mockData";

describe("CategoryHeaderSection Component", () => {
  const renderComponent = (description?: string) => {
    renderWithProviders(
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <CategoryHeaderSection
            title={mockGetCategoryResponse.category.name}
            color={mockGetCategoryResponse.category.color}
            importance={mockGetCategoryResponse.category.importance}
            createdAt={
              new Date(mockGetCategoryResponse.category.timestamp * 1000)
            }
            id={mockGetCategoryResponse.category.id}
            description={description}
          />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  };

  describe("Basic Rendering", () => {
    it("renders correctly with default props", () => {
      renderComponent();
      expect(
        screen.getByRole("heading", {
          name: mockGetCategoryResponse.category.name,
        }),
      ).toBeInTheDocument();
    });

    it("renders with correct category information", async () => {
      renderComponent();
      const importance = await screen
        .findByText("Importance:")
        .then((el) => el.nextSibling);
      const createdAt = await screen
        .findByText("Created:")
        .then((el) => el.nextSibling);
      expect(importance).toHaveTextContent(
        mockGetCategoryResponse.category.importance.toString(),
      );
      expect(createdAt).toHaveTextContent(
        formatDate(
          new Date(mockGetCategoryResponse.category.timestamp * 1000),
          "medium",
        ),
      );
    });

    it("renders with correct color palette", async () => {
      renderComponent();
      const colorPalette = await screen.findByTestId("color-palette");
      const colorBoxes = Array.from(colorPalette.children);

      colorBoxes.forEach((colorBox, index) => {
        expect(colorBox).toHaveStyle({
          backgroundColor:
            mockGetCategoryResponse.category.color[
              ["light", "main", "dark"][
                index
              ] as keyof typeof mockGetCategoryResponse.category.color
            ],
        });
      });
    });

    it("renders with description if provided", async () => {
      renderComponent("This is a description");
      expect(
        await screen.findByText("This is a description"),
      ).toBeInTheDocument();
    });
  });

  describe("Description Functionality", () => {
    it("should render description input with correct value if description is provided", async () => {
      renderComponent("This is a description");
      expect(
        await screen.findByText("This is a description"),
      ).toBeInTheDocument();
    });

    it("should render description placeholder if no description is provided", async () => {
      renderComponent();
      expect(
        await screen.findByText(/click to add description/i),
      ).toBeInTheDocument();
    });

    it("should show description modal when clicked when no description is provided", async () => {
      renderComponent();
      const description = await screen.findByTestId("description");
      description.click();
      expect(
        await screen.findByPlaceholderText(/add a description/i),
      ).toBeInTheDocument();
    });

    it("should show descripton modal with correct value when clicked when description is provided", async () => {
      renderComponent("This is a description");
      const description = await screen.findByTestId("description");
      description.click();
      expect(
        await screen.findByDisplayValue("This is a description"),
      ).toBeInTheDocument();
    });

    it("should close description modal when clicked outside", async () => {
      renderComponent("This is a description");
      const description = await screen.findByTestId("description");
      description.click();
      const modal = await screen.findByTestId("description-modal-wrapper");
      modal.click();
      expect(screen.queryByTestId("description-modal")).not.toBeInTheDocument();
    });

    it("should submit updated description correctly", async () => {
      renderComponent("This is a description");
      const description = await screen.findByTestId("description");
      description.click();
      const submitButton = await screen.findByRole("button", { name: /save/i });
      await waitFor(() => fireEvent.click(submitButton));

      // Should close modal
      expect(
        screen.queryByTestId("description-modal-wrapper"),
      ).not.toBeInTheDocument();

      // Should show success alert
      const alert = await screen.findByText(/category updated/i);
      expect(alert).toBeVisible();
    });
  });

  describe("Color Functionality", () => {
    it("should show color modal when clicked", async () => {
      renderComponent();
      const colorPalette = await screen.findByTestId("color-palette");
      fireEvent.click(colorPalette);
      expect(await screen.findByTestId("color-picker")).toBeInTheDocument();
    });

    it("should close color modal when clicked outside", async () => {
      renderComponent();
      const colorPalette = await screen.findByTestId("color-palette");
      fireEvent.click(colorPalette);
      const modal = await screen.findByTestId("color-modal-wrapper");
      fireEvent.click(modal);
      expect(screen.queryByTestId("color-modal")).not.toBeInTheDocument();
    });

    it("should submit updated color correctly", async () => {
      renderComponent();
      const colorPalette = await screen.findByTestId("color-palette");
      fireEvent.click(colorPalette);
      // Select a color
      const colorOptions = await screen.findAllByTestId("color-option");
      const selectedColor = colorOptions[1];
      waitFor(() => fireEvent.click(selectedColor));

      const submitButton = await screen.findByRole("button", { name: /save/i });
      await waitFor(() => fireEvent.click(submitButton));

      // Should close modal
      expect(
        screen.queryByTestId("color-modal-wrapper"),
      ).not.toBeInTheDocument();

      // Should show success alert
      const alert = await screen.findByText(/category updated/i);
      expect(alert).toBeVisible();
    });
  });
});
