import { expect, test } from "@playwright/test";
import { manageAndDeliverCommunityLogin } from "../../steps/auth/login";
import {
  goToCaseListPageViaCard,
  goToCaseListPageViaNavLink,
  goToGroupsListPageViaCard,
  goToGroupsListPageViaNavLink,
} from "../../steps/homepage/homePage";

test.describe("Homepage", () => {
  test("shows the expected homepage content", async ({ page }) => {
    await manageAndDeliverCommunityLogin(page);

    const skipToMainContent = page.getByRole("link", {
      name: "Skip to main content",
    });
    await expect(skipToMainContent).toBeVisible();
    await expect(skipToMainContent).toHaveAttribute("href", "#main-content");

    await expect(page.getByRole("link", { name: "HMPPS" })).toHaveAttribute(
      "href",
      "/"
    );
    await expect(
      page.getByRole("link", { name: "Accredited Programmes" })
    ).toHaveAttribute("href", "/");

    const accountNavigation = page.getByRole("navigation", {
      name: "Account navigation",
    });
    await expect(
      accountNavigation.getByRole("link", { name: /Manage your details/i })
    ).toHaveAttribute("href", "/account-details");
    await expect(
      accountNavigation.getByRole("link", { name: "Sign out" })
    ).toHaveAttribute("href", "/sign-out");

    const primaryNavigation = page.getByRole("navigation", {
      name: "Primary navigation",
    });
    await expect(primaryNavigation.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    await expect(
      primaryNavigation.getByRole("link", { name: "Case list" })
    ).toHaveAttribute("href", "/pdu/open-referrals");
    await expect(
      primaryNavigation.getByRole("link", { name: "Groups" })
    ).toHaveAttribute("href", "/groups/not-started-or-in-progress");
    await expect(page.locator(".custom-primary-navigation__region")).toContainText(/\S+/);

    await expect(
      page.getByRole("heading", { level: 1, name: "Accredited Programmes" })
    ).toBeVisible();

    const caseListCard = page.locator('[data-test="case-list"]');
    await expect(caseListCard.getByRole("link", { name: "Case list" })).toHaveAttribute(
      "href",
      "/pdu/open-referrals"
    );
    await expect(caseListCard).toContainText(
      "Track and update referrals for your region"
    );

    const groupsCard = page.locator('[data-test="groups"]');
    await expect(groupsCard.getByRole("link", { name: "Groups" })).toHaveAttribute(
      "href",
      "/groups/not-started-or-in-progress"
    );
    await expect(groupsCard).toContainText(
      "Create groups, schedule sessions, and record attendance and notes"
    );
  });

  test("navigates to case list from homepage card", async ({ page }) => {
    await manageAndDeliverCommunityLogin(page);
    await goToCaseListPageViaCard(page);
  });

  test("navigates to case list from primary navigation", async ({ page }) => {
    await manageAndDeliverCommunityLogin(page);
    await goToCaseListPageViaNavLink(page);
  });

  test("navigates to groups list from primary navigation", async ({ page }) => {
    await manageAndDeliverCommunityLogin(page);
    await goToGroupsListPageViaNavLink(page);
  });

  test("navigates to groups list from homepage card", async ({ page }) => {
    await manageAndDeliverCommunityLogin(page);
    await goToGroupsListPageViaCard(page);
  });
});