import { test } from "@playwright/test";
import { manageAndDeliverCommunityLogin } from "../../steps/auth/login";
import {

} from "../../steps/group/groupPage";

test.describe("Add referral to group", () => {
  test("To validate referral has allocated to group successfully and exist on Allocated page", async ({
    page,
  }) => {
   // const groupCode =
   // "e2e-test-group-code-" + Math.floor(Math.random() * 1000000);

    //const whenWillGroupRunData: WhenWillGroupRunData = [
    //  { dayOfWeekCheckbox: "Monday", hour: 1, minute: 1, ampm: "am" },
    //  { dayOfWeekCheckbox: "Wednesday", hour: 2, minute: 2, ampm: "pm" },
    //];

    await test.step("1. Add referral to group - Signin to Accredited Programmes home page", async () => {
      await manageAndDeliverCommunityLogin(page);
    });

    await test.step("2. Add referral to group - Navigate to Groups page", async () => {
      await goToGroupListPage(page);
    });

    await test.step("3. Add referral to group - Click on group code link on Groups page then navigate to Group details page", async () => {
      //await goToCreateAGroupPageFromGroupListPage(page);
    });

    await test.step("4. Add referral to group - Navigate to Allocations and waitlist page then click on waitlist tab", async () => {
     // await goToCreateAGroupCodePageFromCreateAGroupPage(page);
    });

    await test.step("5. Add referral to group - Select referral radio option and submit on page", async () => {
      //await enterAndSubmitGroupCode(page, groupCode);
    });

    await test.step("6. Add referral to group - Navigate to Add referral to this group? page and select Yes radio option and submit page", async () => {
     // await enterAndSubmitGroupStartDate(page, "9/12/2099");
    });

    await test.step("7. Add referral to group - Navigate to referral status will change to Scheduled page", async () => {
       //await enterAndSubmitWhenWillGroupRunData(page, whenWillGroupRunData);
    });

    await test.step("8. Add referral to group - Add referral details on referral status will change to Scheduled page and submit button", async () => {

    });

    await test.step("9. Add referral to group - Referral was added to this group. Their referral status is now Scheduled. message will display on allocation and waitlist page", async () => {
      // await selectAndSubmitSexRadioOption(page, "Female");
      });

    });
});
