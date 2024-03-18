import { render, screen } from "@testing-library/react";
import { Accordion } from "./accordion";
import styles from "./style.module.css";

describe("Accordion", () => {
  const items = [
    { title: "test-title1", content: <p>test1-content</p> },
    { title: "test-title2", content: <p>test2-content</p> },
  ];

  it("should render", () => {
    const component = render(<Accordion items={[]} />);
    expect(component.container).toBeInTheDocument();
  });

  it("should render accordion", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("test1-content")).toBeInTheDocument();
    expect(screen.getByText("test2-content")).toBeInTheDocument();
  });

  it("should render accordion with title", () => {
    const component = render(<Accordion items={items} />);
    expect(component.getByText("test-title1")).toBeInTheDocument();
    expect(component.getByText("test-title2")).toBeInTheDocument();
  });
  it("should render with optionally opened", () => {
    const component = render(
      <Accordion
        items={[
          { title: "test-title1", content: <p>test1-content</p>, initiallyOpened: true },
          { title: "test-title2", content: <p>test2-content</p>, initiallyOpened: true },
        ]}
      />,
    );
    expect(component.getByText("test-title1")).toHaveClass(styles.active);
    expect(component.getByText("test-title2")).toHaveClass(styles.active);
  });

  it("should handle click on title", () => {
    const component = render(
      <Accordion
        items={[
          { title: "test-title1", content: <p>test1-content</p>, initiallyOpened: true },
          { title: "test-title2", content: <p>test2-content</p>, initiallyOpened: true },
        ]}
      />,
    );
    const item1 = component.getByText("test-title1");
    const item2 = component.getByText("test-title2");
    expect(item1).toHaveClass(styles.active);
    expect(item2).toHaveClass(styles.active);

    item1.click();
    expect(item1).not.toHaveClass(styles.active);
    expect(item2).toHaveClass(styles.active);

    item2.click();
    expect(item1).not.toHaveClass(styles.active);
    expect(item2).not.toHaveClass(styles.active);

    item2.click();
    expect(item1).not.toHaveClass(styles.active);
    expect(item2).toHaveClass(styles.active);
  });
});
