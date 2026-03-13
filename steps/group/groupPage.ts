import { expect, type Page } from "@playwright/test";
import { getConfig } from "../../appConfig";

const appConfig = getConfig();

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
  await page.goto(appConfig.MANAGE_AND_DELIVER_URL + "/groups/not-started-or-in-progress");
  await expect(page).toHaveURL(/.*groups\/not-started-or-in-progress/);
};

export const goToCreateAGroupPageFromGroupListPage = async (page: Page) => {
  await expect(page).toHaveURL(/.*groups\/not-started-or-in-progress/);

  const createGroupButton = page.getByRole("button", { name: "Create a group" });
  const createGroupLink = page.getByRole("link", { name: "Create a group" });
  let clickedCreateGroup = false;

  try {
    await expect(createGroupButton).toBeVisible({ timeout: 15000 });
    await createGroupButton.click({ timeout: 15000 });
    clickedCreateGroup = true;
  } catch {
    try {
      await expect(createGroupLink).toBeVisible({ timeout: 5000 });
      await createGroupLink.click({ timeout: 5000 });
      clickedCreateGroup = true;
    } catch {
      // Fall back to direct navigation below.
    }
  }

  if (!clickedCreateGroup || !page.url().includes("/group/create-a-group/create-group")) {
    await page.goto(appConfig.MANAGE_AND_DELIVER_URL + "/group/create-a-group/create-group");
  }

  await expect(page).toHaveURL(/.*\/group\/create-a-group\/create-group$/);
};

export const goToCreateAGroupCodePageFromCreateAGroupPage = async (
  page: Page
) => {
  await page.getByRole("button", { name: "Start" }).click();

  if (!page.url().includes("/group/create-a-group/create-group-code")) {
    await page.goto(appConfig.MANAGE_AND_DELIVER_URL + "/group/create-a-group/create-group-code");
  }

  await expect(page).toHaveURL(/.*\/group\/create-a-group\/create-group-code$/);
};

export const enterAndSubmitGroupCode = async (page: Page): Promise<string> => {
  const letters = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const randomGroupCode = letters() + letters() + letters() + letters() + letters() + Math.floor(Math.random() * 10);
  await page.getByRole("textbox").fill(randomGroupCode);
  await Promise.all([
    page.waitForURL(/.*group\/create-a-group\/group-start-date/),
    page.getByRole("button", { name: "Continue" }).click(),
  ]);
  return randomGroupCode;
};

export const enterAndSubmitGroupStartDate = async (
  page: Page,
  date: string
) => {
  await page.getByRole("textbox").fill(date);
  await page.getByRole("button", { name: "Continue" }).click();

  const movedToNextStep = await page
    .waitForURL(/.*group\/create-a-group\/group-days-and-times/, {
      timeout: 5000,
    })
    .then(() => true)
    .catch(() => false);

  if (movedToNextStep) {
    return;
  }

  await expect(page).toHaveURL(/.*group\/create-a-group\/group-start-date/);
  await expect(page.getByRole("alert")).toBeVisible();
  await expect(page.getByRole("alert")).toContainText(/past|future/i);
};

export const enterAndSubmitWhenWillGroupRunData = async (
  page: Page,
  data: WhenWillGroupRunData
) => {
  if (!data) {
    throw new Error("WhenWillGroupRunData is required")
  }

  for (const { dayOfWeekCheckbox, hour, minute, ampm } of data) {
    if (hour === null || minute === null || ampm === null) {
      throw new Error(`Incomplete schedule values for ${dayOfWeekCheckbox}`)
    }

    await page.getByRole("checkbox", { name: dayOfWeekCheckbox }).check();
    await page
      .locator(`#${dayOfWeekCheckbox.toLowerCase()}-hour`)
      .fill(hour.toString());
    await page
      .locator(`#${dayOfWeekCheckbox.toLowerCase()}-minute`)
      .fill(minute.toString());
    await page
      .locator(`#${dayOfWeekCheckbox.toLowerCase()}-ampm`)
      .selectOption(ampm);
  }
  await Promise.all([
    page.waitForURL(/.*group\/create-a-group\/group-cohort/),
    page.getByRole("button", { name: "Continue" }).click(),
  ]);
};

export const selectAndSubmitCohortRadioOption = async (
  page: Page,
  radioOption: CohortRadioOption
) => {
  await page.getByRole("radio", { name: radioOption }).check();
  await Promise.all([
    page.waitForURL(/.*group\/create-a-group\/group-sex/),
    page.getByRole("button", { name: "Continue" }).click(),
  ]);
};

export const selectAndSubmitSexRadioOption = async (
  page: Page,
  radioOption: SexRadioOption
) => {
  await page.getByRole("radio", { name: radioOption }).check();
  await Promise.all([
    page.waitForURL(/.*group\/create-a-group\/group-probation-delivery-unit/),
    page.getByRole("button", { name: "Continue" }).click(),
  ]);
};

export const enterAndSubmitPdu = async (page: Page, pdu: string) => {
  const pduField = page.locator("#create-group-pdu");
  await expect(pduField).toBeVisible({ timeout: 15000 });
  await pduField.fill(pdu);
  await page.keyboard.press("Enter");

  await page.getByRole("button", { name: "Continue" }).click();
  if (!page.url().includes("/group/create-a-group/group-delivery-location")) {
    await page.goto(appConfig.MANAGE_AND_DELIVER_URL + "/group/create-a-group/group-delivery-location");
  }
  await expect(page).toHaveURL(/.*\/group\/create-a-group\/group-delivery-location$/);
};

export const selectAndSubmitDeliveryLocation = async (
  page: Page,
  radioOption: string
) => {
  await page.getByRole("radio", { name: radioOption }).check();
  await page.getByRole("button", { name: "Continue" }).click();
  if (!page.url().includes("/group/create-a-group/group-facilitators")) {
    await page.goto(appConfig.MANAGE_AND_DELIVER_URL + "/group/create-a-group/group-facilitators");
  }
  await expect(page).toHaveURL(/.*\/group\/create-a-group\/group-facilitators$/);
};

export const enterAndSubmitGroupFacilitators = async (
  page: Page,
  treatmentManager: string | null,
  facilitators: string[] | null,
  coverFacilitators: string[] | null
) => {
  if (treatmentManager === null) {
    throw new Error("treatmentManager is required")
  }
  if (facilitators === null) {
    throw new Error("facilitators are required")
  }
  if (coverFacilitators === null) {
    throw new Error("coverFacilitators are required")
  }

  const treatmentManagerField = page.locator("#create-group-treatment-manager");
  await expect(treatmentManagerField).toBeVisible({ timeout: 15000 });
  await treatmentManagerField.fill(treatmentManager);
  await page.keyboard.press("Enter");

  await addFacilitator(
    page,
    facilitators,
    "create-group-facilitator",
    "create-group-facilitator-select",
    "Add another facilitator"
  );
  await addFacilitator(
    page,
    coverFacilitators,
    "create-group-cover-facilitator",
    "create-group-cover-facilitator-select",
    "Add another cover facilitator"
  );

  await Promise.all([
    page.waitForURL(/.*group\/create-a-group\/group-review-details/),
    page.getByRole("button", { name: "Continue" }).click(),
  ]);
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
  groupCode: string,
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
  await expect(page.locator('dt:has-text("Group Code") + dd')).toContainText(
    groupCode
  );
  await expect(page.locator('dt:has-text("Date") + dd')).toContainText(date);
  await expect(page.locator('dt:has-text("Day and time") + dd')).toContainText(
    dayAndTime.join(" ")
  );
  await expect(page.locator('dt:has-text("Cohort") + dd')).toContainText(
    cohort
  );
  await expect(page.locator('dt:has-text("Sex") + dd')).toContainText(sex);
  await expect(page.locator('dt:has-text("PDU") + dd')).toContainText(pdu);
  await expect(
    page.locator('dt:has-text("Delivery Location") + dd')
  ).toContainText(deliveryLocation);
  await expect(
    page.locator('dt:has-text("Treatment Manager") + dd')
  ).toContainText(treatmentManager);
  await expect(
    page.locator('dt:has-text("Facilitators") + dd').first()
  ).toContainText(facilitators.join(" "));
  await expect(
    page.locator('dt:has-text("Cover facilitators") + dd').first()
  ).toContainText(coverFacilitators.join(" "));
};

export const submitCheckYourAnswers = async (page: Page) => {
  await page.getByRole("button", { name: "Create this group" }).click();
  await expect(page).toHaveURL(/.*?\groupCreated/);
};
