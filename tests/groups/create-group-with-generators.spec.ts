/**
 * EXAMPLE: Group Creation Test with Test Data Generators
 *
 * This demonstrates best practices for using the test data system.
 * New approach: No hardcoded data, clean and maintainable.
 */

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
  verifyGroupCode,
} from "../../steps/group/groupPage";
import {
  GroupDataBuilder,
  TestDataScenarios,
} from "../../testData";

test.describe("Create group - Using Test Data Generators", () => {
  /**
   * EXAMPLE 1: Using pre-built test scenarios
   * Simple, reliable, matches documented test cases
   */
  test("Using pre-built standard scenario", async ({ page }) => {
    const groupData = TestDataScenarios.standard();

    await test.step("1. Login to Accredited Programmes", async () => {
      await manageAndDeliverCommunityLogin(page);
    });

    await test.step("2. Navigate to Groups page", async () => {
      await goToGroupListPage(page);
    });

    await test.step("3. Click Create a group", async () => {
      await goToCreateAGroupPageFromGroupListPage(page);
    });

    await test.step("4. Navigate to Create a group code page", async () => {
      await goToCreateAGroupCodePageFromCreateAGroupPage(page);
    });

    await test.step("5. Enter group code", async () => {
      await enterAndSubmitGroupCode(page, groupData.groupCode);
    });

    await test.step("6. Enter start date", async () => {
      await enterAndSubmitGroupStartDate(page, groupData.startDate);
    });

    await test.step("7. Enter when will the group run", async () => {
      await enterAndSubmitWhenWillGroupRunData(page, groupData.schedule);
    });

    await test.step("8. Select group cohort", async () => {
      await selectAndSubmitCohortRadioOption(page, groupData.cohort);
    });

    await test.step("9. Select the gender of the group", async () => {
      await selectAndSubmitSexRadioOption(page, groupData.sex);
    });

    await test.step("10. Enter the probation delivery unit (PDU) the group will take place", async () => {
      await enterAndSubmitPdu(page, groupData.pdu);
    });

    await test.step("11. Select where the group will take place", async () => {
      await selectAndSubmitDeliveryLocation(
        page,
        groupData.deliveryLocation
      );
    });


    await test.step("12. Enter who is responsible for the group", async () => {
      await enterAndSubmitGroupFacilitators(
        page,
        groupData.treatmentManager,
        groupData.facilitators,
        groupData.coverFacilitators
      );
    });

    await test.step("13. Review your group details", async () => {
      const dayAndTimeStrings = groupData.schedule.map(
        (slot) =>
          `${slot.dayOfWeekCheckbox}s, ${slot.hour}:${String(slot.minute).padStart(2, "0")}${slot.ampm}`
      );

      await verifyCheckAnswersPageContent(
        page,
        groupData.startDate,
        dayAndTimeStrings,
        groupData.cohort,
        groupData.sex,
        groupData.pdu,
        groupData.deliveryLocation,
        groupData.treatmentManager,
        groupData.facilitators,
        groupData.coverFacilitators
      );
    });

    await test.step("14. Review your group details", async () => {
      await submitCheckYourAnswers(page);
    });

    await test.step("15. Verify group was created", async () => {
      await verifyGroupCode(page, groupData.groupCode);
    });
  });

  /**
   * EXAMPLE 2: Using the builder for custom variations
   * Useful when you need specific combinations of data
   */
  test("Using builder with custom variations", async ({ page }) => {
    // Create custom data: Male group with General cohort
    const groupData = new GroupDataBuilder()
      .withSex("Male")
      .withCohort("General")
      .withPdu("Cleveland")
      .build();

    await test.step("1. Login", async () => {
      await manageAndDeliverCommunityLogin(page);
    });

    await test.step("2. Navigate to Groups page", async () => {
      await goToGroupListPage(page);
    });

    await test.step("3. Create group flow", async () => {
      await goToCreateAGroupPageFromGroupListPage(page);
      await goToCreateAGroupCodePageFromCreateAGroupPage(page);
      await enterAndSubmitGroupCode(page, groupData.groupCode);
      await enterAndSubmitGroupStartDate(page, groupData.startDate);
      await enterAndSubmitWhenWillGroupRunData(page, groupData.schedule);
      await selectAndSubmitCohortRadioOption(page, groupData.cohort);
      await selectAndSubmitSexRadioOption(page, groupData.sex);
      await enterAndSubmitPdu(page, groupData.pdu);
      await selectAndSubmitDeliveryLocation(page, groupData.deliveryLocation);
      await enterAndSubmitGroupFacilitators(
        page,
        groupData.treatmentManager,
        groupData.facilitators,
        groupData.coverFacilitators
      );
    });

    await test.step("4. Submit and verify", async () => {
      await submitCheckYourAnswers(page);
      await verifyGroupCode(page, groupData.groupCode);
    });
  });

  /**
   * EXAMPLE 3: Complex scenario with multiple facilitators
   * Good for testing edge cases and capacity
   */
  test("Complex scenario with multiple facilitators and schedule slots", async ({
    page,
  }) => {
    const groupData = TestDataScenarios.complex();

    await test.step("1. Setup and navigation", async () => {
      await manageAndDeliverCommunityLogin(page);
      await goToGroupListPage(page);
      await goToCreateAGroupPageFromGroupListPage(page);
      await goToCreateAGroupCodePageFromCreateAGroupPage(page);
    });

    await test.step("2. Fill in group details", async () => {
      await enterAndSubmitGroupCode(page, groupData.groupCode);
      await enterAndSubmitGroupStartDate(page, groupData.startDate);
      await enterAndSubmitWhenWillGroupRunData(page, groupData.schedule);
      await selectAndSubmitCohortRadioOption(page, groupData.cohort);
      await selectAndSubmitSexRadioOption(page, groupData.sex);
      await enterAndSubmitPdu(page, groupData.pdu);
      await selectAndSubmitDeliveryLocation(page, groupData.deliveryLocation);
      await enterAndSubmitGroupFacilitators(
        page,
        groupData.treatmentManager,
        groupData.facilitators,
        groupData.coverFacilitators
      );
    });

    await test.step("3. Submit and verify", async () => {
      await submitCheckYourAnswers(page);
      await verifyGroupCode(page, groupData.groupCode);
    });
  });
});

/**
 * DOCUMENTATION: Test Data System Usage
 *
 * ============================================
 * 1. SIMPLE APPROACH: Pre-built Scenarios
 * ============================================
 *
 * Use when you want consistent, documented test cases:
 *
 *   const groupData = TestDataScenarios.standard();
 *   // or
 *   const groupData = TestDataScenarios.complex();
 *   const groupData = TestDataScenarios.minimal();
 *   const groupData = TestDataScenarios.maleGeneral();
 *   const groupData = TestDataScenarios.sexualOffence();
 *
 *
 * ============================================
 * 2. FLEXIBLE APPROACH: Builder Pattern
 * ============================================
 *
 * Use when you need to customize specific fields:
 *
 *   const groupData = new GroupDataBuilder()
 *     .withSex("Female")
 *     .withCohort("General")
 *     .withPdu("Cleveland")
 *     .build();
 *
 *
 * ============================================
 * 3. GRANULAR APPROACH: Individual Generators
 * ============================================
 *
 * Use when you need individual pieces of data:
 *
 *   import {
 *     generateGroupCode,
 *     generateFutureDate,
 *     generatePdu,
 *     generateFacilitators
 *   } from "../../testData";
 *
 *   const code = generateGroupCode();
 *   const date = generateFutureDate(60);
 *   const pdu = generatePdu();
 *   const facilitators = generateFacilitators(2);
 *
 *
 * ============================================
 * 4. REFERENCE APPROACH: Defaults
 * ============================================
 *
 * Use to access predefined lists:
 *
 *   import {
 *     COHORT_OPTIONS,
 *     SEX_OPTIONS,
 *     PDU_OPTIONS,
 *     DAYS_OF_WEEK
 *   } from "../../testData";
 */
