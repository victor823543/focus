import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoriesStep from "../../src/components/configuration/steps/CategoriesStep/CategoriesStep";
import styles from "../../src/components/configuration/steps/CategoriesStep/CategoriesStep.module.css";
import { renderWithProviders } from "../../src/utils/test-utils";
import { mockCategories, mockColors } from "../mocks/mockData";

describe("CategoriesStep Component", () => {
  const renderComponent = () => {
    renderWithProviders(
      <QueryClientProvider client={new QueryClient()}>
        <CategoriesStep />
      </QueryClientProvider>,
    );
  };

  describe("Basic Rendering", () => {
    it("renders correctly with default props", async () => {
      renderComponent();
      const button = await screen.findByRole("button", {
        name: /add category/i,
      });
      const header = await screen.findByRole("heading", {
        name: /Now choose your categories/i,
      });
      expect(button).toBeInTheDocument();
      expect(header).toBeInTheDocument();
    });

    it("renders mock categories correctly", async () => {
      renderComponent();
      expect(await screen.findByText("Category 1")).toBeInTheDocument();
      expect(await screen.findByText("Category 2")).toBeInTheDocument();
    });

    it("renders add category form correctly", async () => {
      renderComponent();
      expect(await screen.findByTestId("input")).toBeInTheDocument();
      expect(await screen.findByTestId("placeholder")).toHaveTextContent(
        /choose a name/i,
      );
      expect(await screen.findByTestId("color-box")).toBeInTheDocument();
    });
  });

  describe("Color Picker Functionality", () => {
    it("toggles color picker visibility", async () => {
      renderComponent();

      const colorBox = await screen.findByTestId("color-box");
      fireEvent.click(colorBox);

      const colorPicker = await screen.findByTestId("color-picker");

      expect(colorPicker).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("modal-wrapper"));
      expect(screen.queryByTestId("color-picker")).not.toBeInTheDocument();
    });

    it("contains correct color options", async () => {
      renderComponent();

      const colorBox = await screen.findByTestId("color-box");
      fireEvent.click(colorBox);

      const colorOptions = await screen.findAllByTestId("color-option");

      const mockColorsLength = mockColors.length;

      expect(colorOptions).toHaveLength(mockColorsLength);

      mockColors.forEach((color, index) => {
        expect(colorOptions[index]).toHaveTextContent(color.name);
      });
    });

    it("selects a color", async () => {
      renderComponent();

      const colorBox = await screen.findByTestId("color-box");
      fireEvent.click(colorBox);

      const mockColor = mockColors[0];

      const colorOption = await screen.findByText(mockColor.name);

      fireEvent.click(colorOption);

      expect(colorBox).toHaveStyle(`background-color: ${mockColor.main}`);
    });
  });

  describe("Category Addition", () => {
    it("adds a category with correct name and color", async () => {
      renderComponent();

      const input = await screen.findByTestId("input");
      const colorBox = await screen.findByTestId("color-box");
      const addButton = await screen.findByRole("button", {
        name: /add category/i,
      });

      fireEvent.change(input, { target: { value: "New" } });
      fireEvent.click(colorBox);

      const mockColor = mockColors[0];
      const colorOption = await screen.findByText(mockColor.name);

      fireEvent.click(colorOption);
      fireEvent.click(addButton);

      const newCategory = await screen.findByText("New");

      expect(newCategory).toBeVisible();
      expect(newCategory).toHaveStyle(`--category-color: ${mockColor.main}`);
    });

    it("selects category by default on creation", async () => {
      renderComponent();

      const input = await screen.findByTestId("input");
      const colorBox = await screen.findByTestId("color-box");
      const addButton = await screen.findByRole("button", {
        name: /add category/i,
      });

      fireEvent.change(input, { target: { value: "New" } });
      fireEvent.click(colorBox);

      const mockColor = mockColors[0];
      const colorOption = await screen.findByText(mockColor.name);

      fireEvent.click(colorOption);
      fireEvent.click(addButton);

      const newCategory = await screen.findByText("New");

      expect(newCategory).toHaveClass(styles.selected);
    });

    it("does not add category with empty name", async () => {
      renderComponent();

      const addButton = await screen.findByRole("button", {
        name: /add category/i,
      });

      fireEvent.click(addButton);

      const numberOfGlobalCategories = mockCategories.length;
      const categories = await screen.findAllByTestId("category");
      const numberOfCategories = categories.length;

      expect(numberOfCategories).toBe(numberOfGlobalCategories);
    });

    it("does not add category with too long name", async () => {
      renderComponent();

      const input = await screen.findByTestId("input");
      const addButton = await screen.findByRole("button", {
        name: /add category/i,
      });

      fireEvent.change(input, {
        target: { value: "This is too long a name for a category" },
      });
      fireEvent.click(addButton);

      const numberOfGlobalCategories = mockCategories.length;
      const categories = await screen.findAllByTestId("category");
      const numberOfCategories = categories.length;

      expect(numberOfCategories).toBe(numberOfGlobalCategories);
    });

    it("does add categoy without picking a color", async () => {
      renderComponent();

      const input = await screen.findByTestId("input");
      const addButton = await screen.findByRole("button", {
        name: /add category/i,
      });

      fireEvent.change(input, { target: { value: "New" } });
      fireEvent.click(addButton);

      const newCategory = await screen.findByText("New");

      expect(newCategory).toBeVisible();
    });

    it("adds multiple categories", async () => {
      renderComponent();

      const input = await screen.findByTestId("input");
      const addButton = await screen.findByRole("button", {
        name: /add category/i,
      });

      fireEvent.change(input, { target: { value: "Cat One" } });
      fireEvent.click(addButton);

      const firstCategory = await screen.findByText("Cat One");

      fireEvent.change(input, { target: { value: "Cat Two" } });
      fireEvent.click(addButton);

      const secondCategory = await screen.findByText("Cat Two");

      expect(firstCategory).toBeVisible();
      expect(secondCategory).toBeVisible();
    });
  });

  describe("Category Selection", () => {
    it("selects category on click", async () => {
      renderComponent();

      const category = await screen.findByText("Category 1");

      fireEvent.click(category);

      expect(category).toHaveClass(styles.selected);
    });

    it("deselects category on second click", async () => {
      renderComponent();

      const category = await screen.findByText("Category 1");

      fireEvent.click(category);
      fireEvent.click(category);

      expect(category).not.toHaveClass(styles.selected);
    });

    it("selects multiple categories", async () => {
      renderComponent();

      const categoryOne = await screen.findByText("Category 1");
      const categoryTwo = await screen.findByText("Category 2");

      fireEvent.click(categoryOne);
      fireEvent.click(categoryTwo);

      expect(categoryOne).toHaveClass(styles.selected);
      expect(categoryTwo).toHaveClass(styles.selected);
    });

    it("selects and deselects custom category", async () => {
      renderComponent();

      const input = await screen.findByTestId("input");
      const addButton = await screen.findByRole("button", {
        name: /add category/i,
      });

      fireEvent.change(input, { target: { value: "New" } });
      fireEvent.click(addButton);

      const newCategory = await screen.findByText("New");
      expect(newCategory).toHaveClass(styles.selected);

      fireEvent.click(newCategory);
      expect(newCategory).not.toHaveClass(styles.selected);

      fireEvent.click(newCategory);
      expect(newCategory).toHaveClass(styles.selected);
    });
  });
});
