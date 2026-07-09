import { expect, type Page } from "@playwright/test";
import { getConfig } from "../../appConfig";

const appConfig = getConfig();
const groupsListUrl = new URL(
  "/groups/not-started-and-in-progress",
  appConfig.MANAGE_AND_DELIVER_URL
).toString();

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
export type WhenWillGroupRunData =
  | {
      dayOfWeekCheckbox: DayOfWeek;
      hour: number | null;
      minute: number | null;
      ampm: "am" | "pm" | null;
    }[]
  | null;
export type CohortRadioOption =
  | "General"
  | "General offence, learning disabilities and challenges (LDC)"
  | "Sexual offence"
  | "Sexual offence, learning disabilities and challenges (LDC)";
export type SexRadioOption = "Male" | "Female" | "Mixed";

export const goToGroupListPage = async (page: Page) => {
  await page.goto(groupsListUrl);
  await expect(page).toHaveURL(groupsListUrl);
};

export const goToCreateAGroupPageFromGroupListPage = async (page: Page) => {
  const createGroupControl = page
    .getByRole("button", { name: /Create group/i })
    .or(page.getByRole("link", { name: /Create group/i }))
    .first();

  await expect(createGroupControl).toBeVisible();
  await createGroupControl.click();
  await expect(page).toHaveURL(/.*\/create-group$/);
  await expect(page.getByRole("heading", { name: "Create a group" })).toBeVisible();
};

export const goToCreateAGroupCodePageFromCreateAGroupPage = async (
  page: Page
) => {
  await page.getByRole("button", { name: "Start" }).click();
  await expect(page).toHaveURL(/.*\/create-group-code$/);
};

export const enterAndSubmitGroupCode = async (page: Page, groupCode: string) => {
  await page.getByRole("textbox").fill(groupCode);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/.*\/group-start-date$/);
};

export const enterAndSubmitGroupStartDate = async (
  page: Page,
  date: string
) => {
  await page.getByRole("textbox").fill(date);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/.*\/group-days-and-times$/);
};

export const enterAndSubmitWhenWillGroupRunData = async (
  page: Page,
  data: WhenWillGroupRunData
) => {
  for (const { dayOfWeekCheckbox, hour, minute, ampm } of data || []) {
    await page.getByRole("checkbox", { name: dayOfWeekCheckbox }).check();
    await page
      .locator(`#${dayOfWeekCheckbox.toLowerCase()}-hour`)
      .fill(hour?.toString() || "");
    await page
      .locator(`#${dayOfWeekCheckbox.toLowerCase()}-minute`)
      .fill(minute?.toString() || "");
    await page
      .locator(`#${dayOfWeekCheckbox.toLowerCase()}-ampm`)
      .selectOption(ampm);
  }
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/.*\/group-cohort$/);
};

export const selectAndSubmitCohortRadioOption = async (
  page: Page,
  radioOption: CohortRadioOption
) => {
  await page.getByRole("radio", { name: radioOption }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/.*\/group-gender$/);
};

export const selectAndSubmitSexRadioOption = async (
  page: Page,
  radioOption: SexRadioOption
) => {
  await page.getByRole("radio", { name: radioOption }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/.*\/group-probation-delivery-unit$/);
};

export const enterAndSubmitPdu = async (page: Page, pdu: string) => {
  await page.waitForTimeout(5000);
  await page.locator("#create-group-pdu").fill(pdu);
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/.*\/group-delivery-location$/);
};

export const selectAndSubmitDeliveryLocation = async (
  page: Page,
  radioOption: string
) => {
  await page.getByRole("radio", { name: radioOption }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/.*\/group-facilitators$/);
};

export const enterAndSubmitGroupFacilitators = async (
  page: Page,
  treatmentManager: string | null,
  facilitators: string[] | null,
  coverFacilitators: string[] | null
) => {
  await page.waitForTimeout(5000);
 await page.locator("#create-group-treatment-manager").fill(treatmentManager || "");
  await page.keyboard.press("Enter");

  await addFacilitator(
    page,
    facilitators || [],
    "create-group-facilitator",
    "create-group-facilitator-select",
    "Add another facilitator"
  );
  await addFacilitator(
    page,
    coverFacilitators || [],
    "create-group-cover-facilitator",
    "create-group-cover-facilitator-select",
    "Add another cover facilitator"
  );

  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/.*\/group-review-details$/);
};

export const addFacilitator = async (
  page: Page,
  facilitators: string[],
  idForIndex0: string,
  baseIdForOthers: string,
  buttonText: string
) => {
  for (const facilitator of facilitators) {
    const index = facilitators.indexOf(facilitator);
    if (index === 0) {
      await page.locator(`#${idForIndex0}`).fill(facilitator);
    } else {
      await page.getByRole("button", { name: buttonText }).click();
      await page.locator(`#${baseIdForOthers}${index}`).fill(facilitator);
    }
    await page.keyboard.press("Enter");
 
  }
};

export const verifyCheckAnswersPageContent = async (
  page: Page,
  date: string,
  dayAndTime: string[],
  cohort: string,
  sex: string,
  pdu: string,
  deliveryLocation: string,
  treatmentManager: string,
  facilitators: string[],
  coverFacilitators: string[]
) => {
  await expect(page.locator('dt:has-text("Group code") + dd')).toContainText(
    "e2e-test-group-code"
  );
  await expect(page.locator('dt:has-text("Start date") + dd')).toContainText(date);

  const daysAndTimes = page.locator('dt:has-text("Days and times") + dd');
  for (const dayAndTimeValue of dayAndTime) {
    await expect(daysAndTimes).toContainText(dayAndTimeValue);
  }

  await expect(page.locator('dt:has-text("Cohort") + dd')).toContainText(
    cohort
  );
  await expect(page.locator('dt:has-text("Gender") + dd')).toContainText(sex);
  await expect(page.locator('dt:has-text("PDU") + dd')).toContainText(pdu);
  await expect(
    page.locator('dt:has-text("Delivery location") + dd')
  ).toContainText(deliveryLocation);
  await expect(
    page.locator('dt:has-text("Treatment Manager") + dd')
  ).toContainText(treatmentManager);
  await expect(
    page.locator('dt:has-text("Facilitators") + dd').first()
  ).toContainText(facilitators.join(" "));

  if (coverFacilitators.length > 0) {
    await expect(
      page.locator('dt:has-text("Cover facilitators") + dd').first()
    ).toContainText(coverFacilitators.join(" "));
  }
};

export const submitCheckYourAnswers = async (page: Page) => {
  await page.getByRole("button", { name: "Create this group" }).click();
  await expect(page).toHaveURL(/\/group\/[^/]+\/schedule-overview\?message=Group%20.*%20created\./);
};

export const verifyGroupCode = async (page: Page, groupCode: string) => {
  await goToGroupListPage(page);
  await page.locator("#groupCode").fill(groupCode);
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(page.locator(`text=${groupCode}`)).toBeVisible();
};
