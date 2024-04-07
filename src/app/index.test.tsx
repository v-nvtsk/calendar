import { act, render, screen } from "@testing-library/react";
import { Root } from ".";

jest.mock("../api/firebase/firebase.ts");

describe("App", () => {
  it("should render root", async () => {
    await act(async () => render(<Root />));

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    const linkSignIn = screen.getByText(/sign in/i);
    expect(header).toContainElement(linkSignIn);

    await act(async () => linkSignIn.click());
    expect(screen.getAllByText(/sign in/i)).toHaveLength(3);
  });
});
