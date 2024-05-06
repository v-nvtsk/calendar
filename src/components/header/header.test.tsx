import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./header";

describe("Header", () => {
  const mockSignOut = jest.fn();
  let component: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;

  it("should render Header", () => {
    component = render(
      <BrowserRouter>
        <Header isAuthenticated={false} onSignOut={mockSignOut} />
      </BrowserRouter>,
    );

    expect(component.container).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /calendar/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /profile/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /sign out/i })).not.toBeInTheDocument();
  });

  it("should re-render Header on props change", () => {
    component = render(
      <BrowserRouter>
        <Header isAuthenticated={true} onSignOut={mockSignOut} />
      </BrowserRouter>,
    );
    expect(screen.queryByRole("link", { name: /profile/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /sign in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /sign up/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /sign out/i })).toBeInTheDocument();

    const header = screen.queryByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("should handle sign out", async () => {
    component = render(
      <BrowserRouter>
        <Header isAuthenticated={true} onSignOut={mockSignOut} />
      </BrowserRouter>,
    );
    await userEvent.click(screen.getByRole("link", { name: /sign out/i }));
    expect(mockSignOut).toHaveBeenCalled();
  });
});
