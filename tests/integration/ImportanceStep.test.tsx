import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, screen } from "@testing-library/dom";
import { useForm } from "react-hook-form";
import { describe, expect } from "vitest";
import ImportanceStep from "../../src/components/configuration/steps/ImportanceStep/ImportanceStep";
import { renderWithProviders } from "../../src/utils/test-utils";
import { ConfigureFormFields } from "../../src/views/Configuration";
import {
  mockColors,
  mockConfigurationState,
  mockEmptyConfigurationForm,
} from "../mocks/mockData";

describe("ImportanceStep Component", () => {
  const Component = () => {
    const form = useForm<ConfigureFormFields>({
      defaultValues: mockEmptyConfigurationForm,
    });
    return <ImportanceStep form={form} />;
  };
  const renderComponent = () => {
    renderWithProviders(
      <QueryClientProvider client={new QueryClient()}>
        <Component />
      </QueryClientProvider>,
      { preloadedState: { configuration: mockConfigurationState } },
    );
  };

  describe("Basic Rendering", () => {
    it("renders correctly with default props", async () => {
      renderComponent();
      expect(
        await screen.findByRole("heading", { name: /configure importance/i }),
      ).toBeInTheDocument();
    });

    it("renders all categories correctly", async () => {
      renderComponent();
      const categoriesLength = mockConfigurationState.categories.length;
      const categories = await screen.findAllByTestId(
        "category-importance-form",
      );
      expect(categories).toHaveLength(categoriesLength);
    });

    it("renders category name correctly", async () => {
      renderComponent();
      const categories = await screen.findAllByTestId(
        "category-importance-form",
      );
      categories.forEach((category, index) => {
        expect(category).toHaveTextContent(
          mockConfigurationState.categories[index].name,
        );
      });
    });

    it("renders color correctly", async () => {
      renderComponent();
      const colors = await screen.findAllByTestId("color-box");
      colors.forEach((color, index) => {
        expect(color).toHaveStyle({
          backgroundColor: mockConfigurationState.categories[index].color.main,
        });
      });
    });
  });

  describe("Update Color Functionality", () => {
    it("toggles color picker visibility", async () => {
      renderComponent();
      const colorBoxes = await screen.findAllByTestId("color-box");
      const colorBox = colorBoxes[0];
      fireEvent.click(colorBox);
      const colorPicker = await screen.findByTestId("color-picker");
      expect(colorPicker).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("modal-wrapper"));
      expect(screen.queryByTestId("color-picker")).not.toBeInTheDocument();
    });

    it("contains correct color options", async () => {
      renderComponent();
      const colorBoxes = await screen.findAllByTestId("color-box");
      const colorBox = colorBoxes[0];
      fireEvent.click(colorBox);
      const colorOptions = await screen.findAllByTestId("color-option");

      const mockColorsLength = mockColors.length;

      expect(colorOptions).toHaveLength(mockColorsLength);

      mockColors.forEach((color, index) => {
        expect(colorOptions[index]).toHaveTextContent(color.name);
      });
    });

    it("updates color correctly", async () => {
      renderComponent();
      const firstCategory = mockConfigurationState.categories[0];
      const colorBoxes = await screen.findAllByTestId("color-box");
      const colorBox = colorBoxes[0];
      expect(colorBox).toHaveStyle({
        "background-color": firstCategory.color.main,
      });

      fireEvent.click(colorBox);
      const mockColor = mockColors[1];
      const colorOption = await screen.findByText(mockColor.name);
      fireEvent.click(colorOption);

      const colorBoxesAfterUpdate = await screen.findAllByTestId("color-box");
      const updatedColorBox = colorBoxesAfterUpdate[0];
      expect(updatedColorBox).toHaveStyle({
        "background-color": mockColor.main,
      });
    });

    it("updates multiple categories color correctly", async () => {
      renderComponent();
      const updateCategoryColor = async (
        categoryIndex: number,
        colorIndex: number,
      ) => {
        const colorBoxes = await screen.findAllByTestId("color-box");
        const colorBox = colorBoxes[categoryIndex];
        fireEvent.click(colorBox);
        const colorOption = await screen.findByText(
          mockColors[colorIndex].name,
        );
        fireEvent.click(colorOption);
      };

      await updateCategoryColor(0, 0);
      await updateCategoryColor(1, 1);
      await updateCategoryColor(2, 2);
      const updatedColorBoxes = await screen.findAllByTestId("color-box");
      expect(updatedColorBoxes[0]).toHaveStyle({
        "background-color": mockColors[0].main,
      });
      expect(updatedColorBoxes[1]).toHaveStyle({
        "background-color": mockColors[1].main,
      });
      expect(updatedColorBoxes[2]).toHaveStyle({
        "background-color": mockColors[2].main,
      });
    });
  });
});
