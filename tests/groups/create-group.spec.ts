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
  verifyGroupCode
} from "../../steps/group/groupPage";

test.describe("Create group", () => {
  test("To validate group has created successfully and exist on not-started-or-in-progress page", async ({
    page,
  }) => {
    const groupCode =
    "e2e-test-group-code-" + Math.floor(Math.random() * 1000000);

    const whenWillGroupRunData: WhenWillGroupRunData = [
      { dayOfWeekCheckbox: "Monday", hour: 1, minute: 1, ampm: "am" },
      { dayOfWeekCheckbox: "Wednesday", hour: 2, minute: 2, ampm: "pm" },
    ];

    await test.step("1. Create group - Signin to Accredited Programmes home page", async () => {
      await manageAndDeliverCommunityLogin(page);
    });

    await test.step("2. Create group - Navigate to Groups page", async () => {
      await goToGroupListPage(page);
    });

    await test.step("3. Create group - Click Create a group button on Groups page then navigate to Create a group page", async () => {
      await goToCreateAGroupPageFromGroupListPage(page);
    });

    await test.step("4. Create group - Click Start button on Create a group page then navigate to Create a group code page", async () => {
      await goToCreateAGroupCodePageFromCreateAGroupPage(page);
    });

    await test.step("5. Create group - Enter and submit group code on Create a group code page", async () => {
      await enterAndSubmitGroupCode(page, groupCode);
    });

    await test.step("6. Create group - Enter and submit group start date on Add a start date for the group page", async () => {
      await enterAndSubmitGroupStartDate(page, "9/12/2099");
    });

    await test.step("7. Create group - Enter and submit When will the group run data on When will the group run? page", async () => {
       await enterAndSubmitWhenWillGroupRunData(page, whenWillGroupRunData);
    });

    await test.step("8. Create group - Select and submit cohert radio option on Create group cohort page", async () => {
      await selectAndSubmitCohortRadioOption(
      page,
      "General offence, learning disabilities and challenges (LDC)"
      );    
    });

    await test.step("9. Create group - Select and submit sex radio option on Select the sex of the group page", async () => {
       await selectAndSubmitSexRadioOption(page, "Female");    
      });

     await test.step("10. Create group - Enter and submit pdu on probation delivery unit page", async () => {
       await enterAndSubmitPdu(page, "All Greater Manchester");  
      });

    await test.step("11. Create group - Select and submit delivery location on Where will the group take place? page", async () => {
       await selectAndSubmitDeliveryLocation(page, "All PS Location");
      });

    await test.step("12. Create group - Enter and submit group facilitators on Who is responsible for the group? page", async () => {
      await enterAndSubmitGroupFacilitators(
       page,
       "TestStaffNine ForScript",
       ["TestStaffNine ForScript"],
       ["Unallocated Staff"]
      );      
    });

    await test.step("13. Create group - Verify check answers page", async () => {
      await verifyCheckAnswersPageContent(
       page,
       "Wednesday 9 December 2099",
       ["Mondays, 1:01am to 3:31am", "Wednesdays, 2:02pm to 4:32pm"],
       "General offence, learning disabilities and challenges (LDC)",
       "Female",
      "All Greater Manchester",
      "All PS Location",
       "TestStaffNine ForScript",
       ["TestStaffNine ForScript"],
       ["Unallocated Staff"]
      );
    });

    await test.step("14. Create group - Submit check your answers page", async () => {
       await submitCheckYourAnswers(page);
    });

    await test.step("15. Create group - Verify newly created group code exist on page", async () => {
       await verifyGroupCode(page, groupCode);
    });
  });
});
