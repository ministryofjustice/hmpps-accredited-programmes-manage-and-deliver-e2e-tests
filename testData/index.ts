/**
 * Test Data Module
 *
 * Provides generators, builders, and defaults for creating test data
 *
 * USAGE EXAMPLES:
 *
 * 1. Using pre-built scenarios:
 *    const groupData = TestDataScenarios.standard();
 *
 * 2. Using the builder with customization:
 *    const groupData = new GroupDataBuilder()
 *      .withGroupCode("my-custom-code")
 *      .withSex("Male")
 *      .build();
 *
 * 3. Using individual generators:
 *    const code = generateGroupCode();
 *    const date = generateFutureDate(30);
 *    const pdu = generatePdu();
 *
 * 4. Using defaults:
 *    const cohortOptions = COHORT_OPTIONS;
 */

// Export all generators
export * from "./generators";

// Export all builders and interfaces
export { GroupDataBuilder, TestDataScenarios, type GroupTestData, type ScheduleSlot } from "./builders";

// Export all defaults
export * from "./defaults";
