import { test } from "@playwright/test";
import { manageAndDeliverCommunityLogin } from "../../steps/auth/login";
import {
  enterAndSubmitGroupCode,
  enterAndSubmitGroupFacilitators,
  enterAndSubmitGroupStartDate,
  enterAndSubmitPdu,
  enterAndSubmitWhenWillGroupRunData,
  goToCreateAGroupCodePageFromCreateAGroupPage,
  goToCreateAGroupPageFromGroupListPage,
  goToGroupListPage,
  selectAndSubmitCohortRadioOption,
  selectAndSubmitDeliveryLocation,
  selectAndSubmitSexRadioOption,
  submitCheckYourAnswers,
  verifyCheckAnswersPageContent,
  WhenWillGroupRunData,
} from "../../steps/group/groupPage";

test.describe("Create a group", () => {
  test("should filter results correctly based on options selected", async ({
    page,
  }) => {
    await manageAndDeliverCommunityLogin(page);
    await goToGroupListPage(page);
    await goToCreateAGroupPageFromGroupListPage(page);
    await goToCreateAGroupCodePageFromCreateAGroupPage(page);
    await enterAndSubmitGroupCode(page);
    await enterAndSubmitGroupStartDate(page, "9/12/2099");

    const whenWillGroupRunData: WhenWillGroupRunData = [
      { dayOfWeekCheckbox: "Monday", hour: 1, minute: 1, ampm: "am" },
      { dayOfWeekCheckbox: "Wednesday", hour: 2, minute: 2, ampm: "pm" },
    ];
    await enterAndSubmitWhenWillGroupRunData(page, whenWillGroupRunData);
    await selectAndSubmitCohortRadioOption(
      page,
      "General offence, learning disabilities and challenges (LDC)"
    );
    await selectAndSubmitSexRadioOption(page, "Female");
    await enterAndSubmitPdu(page, "Cleveland");
    await selectAndSubmitDeliveryLocation(page, "Middlesbrough (Borough Rd)");
    await enterAndSubmitGroupFacilitators(
      page,
      "R&MP Practitioner",
      ["R&MP Practitioner"],
      ["Unallocated Staff"]
    );
    await verifyCheckAnswersPageContent(
      page,
      "9/12/2099",
      ["Mondays, 1:01am to 3:31am", "Wednesdays, 2:02pm to 4:32pm"],
      "General offence, learning disabilities and challenges (LDC)",
      "Female",
      "Cleveland",
      "Middlesbrough (Borough Rd)",
      "R&MP Practitioner",
      ["R&MP Practitioner"],
      ["Unallocated Staff"]
    );
    await submitCheckYourAnswers(page);
  });
});
