import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Admin from "../src/pages/admin/index"; // replace with the path to your Admin component
import React from "react";

describe("Admin component", () => {
  it("renders ADMIN PAGE text", () => {
    render(<Admin articles={[]} />); // pass an empty array for articles prop
    const adminPageText = screen.getByText("ADMIN");
    expect(adminPageText).toBeInTheDocument();
  });
});
