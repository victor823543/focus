import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Breadcrumbs from "../../../src/components/common/Breadcrumbs/Breadcrumbs";

describe("Breadcrumbs Component", () => {
  type BreadcrumbItem = {
    name: string;
    href: string;
  };
  const items: BreadcrumbItem[] = [
    { name: "Page 1", href: "/page1" },
    { name: "Page 2", href: "/page2" },
  ];

  const renderComponent = (items: BreadcrumbItem[]) =>
    render(
      <BrowserRouter>
        <Breadcrumbs items={items} />
      </BrowserRouter>,
    );

  it("renders the home link correctly", () => {
    renderComponent(items);

    const homeLink = screen.getByTestId("link-home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/dashboard");
  });

  it("renders all breadcrumb items correctly", () => {
    renderComponent(items);

    items.forEach((item) => {
      const linkElement = screen.getByRole("link", { name: item.name });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", item.href);
    });
  });

  it("renders the correct name for each breadcrumb item", () => {
    renderComponent(items);

    items.forEach((item) => {
      const linkElement = screen.getByText(item.name);
      expect(linkElement).toBeInTheDocument();
    });
  });

  it("renders the correct href for each breadcrumb item", () => {
    renderComponent(items);

    items.forEach((item) => {
      const linkElement = screen.getByRole("link", { name: item.name });
      expect(linkElement).toHaveAttribute("href", item.href);
    });
  });
});
