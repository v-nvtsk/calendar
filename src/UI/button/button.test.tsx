import { render, screen } from "@testing-library/react";
import { Button, ImageType } from "./button";

describe("Button", () => {
  it("should render", () => {
    const component = render(<Button />);
    expect(component.getByRole("button")).toBeInTheDocument();
    component.unmount();
  });

  it("should render button with text title", () => {
    const testData: string[] = ["search", "prevArrow", "nextArrow"];
    testData.forEach((title) => {
      const component = render(<Button className={title} title={title} />);
      expect(screen.getByRole("button")).toHaveClass(title);
      expect(component.getByText(title)).toBeInTheDocument();
      component.unmount();
    });
  });

  it("should contain an svg as title", () => {
    const testData: ImageType[] = ["search", "prevArrow", "nextArrow"];
    testData.forEach((imageType) => {
      const component = render(<Button className={imageType} imageType={imageType} />);
      expect(screen.getByRole("button")).toHaveClass(imageType);
      expect(component.container.querySelector("svg")).toBeInTheDocument();
      expect(component.container.querySelector("svg")!.dataset.name).toBe(imageType);
      component.unmount();
    });
  });

  it("should call callback on click", () => {
    const clickHandler = jest.fn();
    const component = render(<Button onClick={clickHandler} />);
    component.getByRole("button").click();
    expect(clickHandler).toHaveBeenCalled();
    component.unmount();
  });
});
