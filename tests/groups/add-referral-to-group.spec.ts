import { test } from "@playwright/test";
import { manageAndDeliverCommunityLogin } from "../../steps/auth/login";
import {
    goToGroupDetailsPage,
    selectReferralOnWaitlistPage,
    goToAllocationsAndWaitlistPage,
    addReferralToGroupOnAddToGroupPage,
    addScheduledStatusDetails,
    verifyMessageAfterReferralAddedToGroup
    } from "../../steps/group/addReferralToGroupPage";
import { goToGroupListPage } from "../../steps/group/groupPage";

test.describe("Add referral to group", () => {
  test("To validate referral has allocated to group successfully and exist on Allocated page", async ({
    page,
  }, testInfo) => {

    await test.step("1. Add referral to group - Signin to Accredited Programmes home page", async () => {
      await manageAndDeliverCommunityLogin(page);
    });

    await test.step("2. Add referral to group - Navigate to Groups page", async () => {
      await goToGroupListPage(page);
    });

    await test.step("3. Add referral to group - Click on group link on Groups page to navigate to Group details page", async () => {
      await goToGroupDetailsPage(page);
    });

    await test.step("4. Add referral to group - Navigate to Allocations and waitlist page and click on waitlist tab", async () => {
     await goToAllocationsAndWaitlistPage(page);
    });

    await test.step("5. Add referral to group - Select referral's radio option and submit on waitlist page", async () => {
        await selectReferralOnWaitlistPage(page,testInfo.workerIndex);
    });

    await test.step("6. Add referral to group - Navigate to Add referral to this group? page and select Yes radio option and submit page", async () => {
      await addReferralToGroupOnAddToGroupPage(page);
    });

    await test.step("7. Add referral to group - Navigate to referral status will change to Scheduled page and add details - Status change to schedule and submit page", async () => {
       await addScheduledStatusDetails(page);
    });

    await test.step("8. Add referral to group - Verify referral was added to this group. Their referral status is now Scheduled. message will display on allocation and waitlist page", async () => {
       await verifyMessageAfterReferralAddedToGroup(page);
      });

    });
});
