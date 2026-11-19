import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Booking } from "@/components/landing/Booking";
import { BOOKING_URL, CONTACT_EMAIL, booking, nav } from "@/content/landing";

describe("contact and booking rules", () => {
  it("uses qaveem.saeed@cloudpacer.com as the contact email", () => {
    expect(CONTACT_EMAIL).toBe("qaveem.saeed@cloudpacer.com");
  });

  it("BOOKING_URL is the Google Calendar appointment embed", () => {
    expect(BOOKING_URL).toMatch(/^https:\/\/calendar\.google\.com\/calendar\/appointments\/schedules\/.+\?gv=true$/);
  });

  it("the 'Open booking page' fallback links to the public booking page", () => {
    render(<Booking />);
    expect(screen.getByRole("link", { name: /open booking page/i })).toHaveAttribute(
      "href",
      "https://calendar.app.google/TyPTegBXqYcpaWxK8",
    );
  });

  it("the request email goes to CONTACT_EMAIL with subject '30-minute consultation'", () => {
    const url = new URL(booking.mailto);
    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe(CONTACT_EMAIL);
    expect(url.searchParams.get("subject")).toBe("30-minute consultation");
    expect(url.searchParams.get("body")).toMatch(/preferred days/i);
  });

  it("the main nav button scrolls to #book", () => {
    expect(nav.cta).toEqual({ label: "Book a 30-min call", href: "#book" });
  });

  it("with no booking link, shows the request card and no scheduler", () => {
    render(<Booking bookingUrl="" />);
    expect(screen.getByRole("heading", { name: "Request a 30-minute call" })).toBeInTheDocument();
    expect(screen.queryByTitle(booking.embed.title)).toBeNull();
  });

  it("with a booking link, embeds it and offers an 'Open booking page' fallback", () => {
    const link = "https://cal.com/example/30min";
    render(<Booking bookingUrl={link} bookingPageUrl="" />);
    expect(screen.getByTitle(booking.embed.title)).toHaveAttribute("src", link);
    expect(screen.getByRole("link", { name: /open booking page/i })).toHaveAttribute("href", link);
    expect(screen.queryByRole("heading", { name: "Request a 30-minute call" })).toBeNull();
  });
});
