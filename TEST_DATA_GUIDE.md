# Test Data Generators Guide

Welcome! This guide explains how to use the new test data generation system for your e2e tests.

## 🎯 Why Test Data Generators?

**Before:** Hardcoded test data scattered throughout tests
```typescript
const groupCode = "e2e-test-group-code-" + Math.floor(Math.random() * 1000000);
const date = "9/12/2099";
const pdu = "Cleveland";
// ... repeated in every test
```

**After:** Clean, reusable, maintainable test data
```typescript
const groupData = TestDataScenarios.standard();
// Has all the data you need, with sensible defaults
```

## 📁 System Structure

```
testData/
├── defaults.ts       # Reference data: lists of cohorts, PDUs, staff names, etc.
├── generators.ts     # Functions to create random but realistic data
├── builders.ts       # Builder classes for complex objects
└── index.ts          # Exports everything for easy importing
```

## 🚀 Quick Start

### Option 1: Use Pre-built Scenarios (Recommended for Beginners)

Pre-built test data packages for common test cases:

```typescript
import { TestDataScenarios } from "../../testData";

// Simple test with minimal data
const data = TestDataScenarios.minimal();

// Full group creation with standard data
const data = TestDataScenarios.standard();

// Complex scenario with 3 schedule slots and 2 facilitators
const data = TestDataScenarios.complex();

// Specific variations
const data = TestDataScenarios.maleGeneral();
const data = TestDataScenarios.sexualOffence();
```

Then use it in your test:
```typescript
await enterAndSubmitGroupCode(page, data.groupCode);
await enterAndSubmitGroupStartDate(page, data.startDate);
await enterAndSubmitWhenWillGroupRunData(page, data.schedule);
await selectAndSubmitCohortRadioOption(page, data.cohort);
await selectAndSubmitSexRadioOption(page, data.sex);
await enterAndSubmitPdu(page, data.pdu);
await selectAndSubmitDeliveryLocation(page, data.deliveryLocation);
await enterAndSubmitGroupFacilitators(
  page,
  data.treatmentManager,
  data.facilitators,
  data.coverFacilitators
);
```

### Option 2: Use the Builder for Custom Data

When you need to customize specific fields:

```typescript
import { GroupDataBuilder } from "../../testData";

const groupData = new GroupDataBuilder()
  .withSex("Male")
  .withCohort("General")
  .withPdu("Cleveland")
  .withFacilitators(["John Smith", "Jane Doe"])
  .build();

// Use groupData like before
```

### Option 3: Use Individual Generators

When you need specific pieces of data:

```typescript
import {
  generateGroupCode,
  generateFutureDate,
  generatePdu,
  generateFacilitators,
  pickRandom,
  COHORT_OPTIONS
} from "../../testData";

const code = generateGroupCode();
const date = generateFutureDate(60); // 60 days in future
const pdu = generatePdu();
const facilitators = generateFacilitators(2); // 2 random staff
const cohort = pickRandom(COHORT_OPTIONS);
```

## 📚 Detailed API Reference

### Generators (Create Random Data)

#### Group Code Generators

```typescript
generateGroupCode()        // "e2e-test-group-code-1718033456789-542891"
generateGroupCodeSimple()  // "e2e-test-group-code-542891" (shorter)
```

#### Date Generators

```typescript
generateFutureDate(30)           // "06/11/2025" (30 days from now)
generateDate(2099, 12, 9)        // "12/09/2099" (specific date)
```

#### Random Selectors

```typescript
generateHour()              // Random 1-12
generateMinute()            // Random 0, 15, 30, or 45
generateAmPm()              // "am" or "pm"
generateCohort()            // Random cohort option
generateSex()               // "Male", "Female", or "Mixed"
generatePdu()               // Random PDU (Cleveland, Durham, etc.)
generateDeliveryLocation()  // Random location
generateStaffName()         // Random staff name
generateDayOfWeek()         // Random day name
generateDaysOfWeek(2)       // Array of 2 unique days
generateTimeSlot()          // { hour, minute, ampm }
generateFacilitators(2)     // Array of 2 staff names
generateCoverFacilitators(2) // Array of 2 staff names
```

#### Utility Functions

```typescript
pickRandom([1, 2, 3])           // Random element from array
pickRandomMultiple([1, 2, 3], 2) // Array of 2 unique elements
```

### Builder Pattern

The `GroupDataBuilder` creates complex test objects with sensible defaults and allows fluent customization:

```typescript
new GroupDataBuilder()
  .withGroupCode("custom-code")
  .withStartDate("12/31/2025")
  .withStartDateDaysInFuture(60)
  .withStartDateExact(2099, 12, 9)
  .withSchedule([{ dayOfWeekCheckbox: "Monday", hour: 1, minute: 1, ampm: "am" }])
  .addScheduleSlot("Wednesday", 2, 30, "pm")
  .withCohort("General offence, learning disabilities and challenges (LDC)")
  .withSex("Female")
  .withPdu("Cleveland")
  .withDeliveryLocation("Middlesbrough (Borough Rd)")
  .withTreatmentManager("John Smith")
  .withFacilitators(["Jane Doe", "Bob Jones"])
  .withCoverFacilitators(["Alice Smith"])
  .build()
```

### Defaults (Reference Data)

Lists of valid options for selection:

```typescript
import {
  COHORT_OPTIONS,
  SEX_OPTIONS,
  DAYS_OF_WEEK,
  AMPM_OPTIONS,
  PDU_OPTIONS,
  DELIVERY_LOCATION_OPTIONS,
  STAFF_NAMES,
  GROUP_CODE_PREFIX
} from "../../testData";
```

## 📋 GroupTestData Object

All builders and scenarios return a `GroupTestData` object:

```typescript
interface GroupTestData {
  groupCode: string;           // e.g., "e2e-test-group-code-123456"
  startDate: string;           // e.g., "12/09/2099"
  schedule: ScheduleSlot[];    // Array of time slots
  cohort: string;              // e.g., "General"
  sex: string;                 // "Male", "Female", or "Mixed"
  pdu: string;                 // e.g., "Cleveland"
  deliveryLocation: string;    // e.g., "Middlesbrough (Borough Rd)"
  treatmentManager: string;    // e.g., "John Smith"
  facilitators: string[];      // e.g., ["Jane Doe"]
  coverFacilitators: string[]; // e.g., ["Bob Jones"]
}

interface ScheduleSlot {
  dayOfWeekCheckbox: "Monday" | "Tuesday" | ... | "Sunday";
  hour: number;                // 1-12
  minute: number;              // 0, 15, 30, or 45
  ampm: "am" | "pm";
}
```

## 💡 Common Patterns

### Test Multiple Scenarios

```typescript
test.describe("Group creation variations", () => {
  test("Standard group", async ({ page }) => {
    const data = TestDataScenarios.standard();
    // ...
  });

  test("Male general cohort", async ({ page }) => {
    const data = TestDataScenarios.maleGeneral();
    // ...
  });

  test("Sexual offence cohort", async ({ page }) => {
    const data = TestDataScenarios.sexualOffence();
    // ...
  });
});
```

### Create Custom Test Scenarios

Create your own scenario in `testData/builders.ts`:

```typescript
export const TestDataScenarios = {
  // ... existing scenarios ...

  myCohort: () =>
    new GroupDataBuilder()
      .withCohort("My Specific Cohort")
      .withSex("Mixed")
      .withFacilitators(generateFacilitators(3))
      .build(),
};
```

Then use it:
```typescript
const data = TestDataScenarios.myCohort();
```

### Mix Builder with Scenarios

```typescript
// Start with a scenario, customize specific fields
const data = new GroupDataBuilder()
  .withSex(TestDataScenarios.standard().sex)
  .withCohort("Different Cohort")
  .build();
```

### Generate Multiple Records

```typescript
// Create 5 different groups for batch testing
const groups = Array.from({ length: 5 }, () => 
  TestDataScenarios.standard()
);
```

## 🔍 Common Use Cases

### Case 1: Testing Different Cohorts
```typescript
for (const cohort of COHORT_OPTIONS) {
  test(`Test ${cohort}`, async ({ page }) => {
    const data = new GroupDataBuilder()
      .withCohort(cohort)
      .build();
    // ...
  });
}
```

### Case 2: Testing Edge Cases
```typescript
test("Group with maximum facilitators", async ({ page }) => {
  const data = new GroupDataBuilder()
    .withFacilitators(generateFacilitators(5))
    .withCoverFacilitators(generateCoverFacilitators(5))
    .build();
  // ...
});
```

### Case 3: Consistent IDs for Investigation
```typescript
test("Reproducible test with fixed code", async ({ page }) => {
  const data = new GroupDataBuilder()
    .withGroupCode("e2e-test-investigation-001")
    .build();
  // Now you can always search for this exact group in logs
});
```

## ⚠️ Important Notes

1. **Schedule times in test:** The system generates random times (1-12 hours, 0/15/30/45 minutes), which is realistic for scheduling tests.

2. **PDU selection:** PDU names are predefined. If you see errors about invalid PDU, add it to `DELIVERY_LOCATION_OPTIONS` in `defaults.ts`.

3. **Unique codes:** Each generated group code includes a timestamp + random number, ensuring uniqueness across test runs and parallel execution.

4. **Type safety:** All code is TypeScript-typed, so your IDE will give you autocomplete and catch errors.

## 🐛 Troubleshooting

**Problem:** "Cannot find module testData"
- Check that `import` paths start with `../../testData` (adjust based on file depth)

**Problem:** TypeError: "generateGroupCode is not a function"
- Ensure you're importing from `"../../testData"` not from individual files

**Problem:** Schedule verification fails
- The schedule format must match the page expectations exactly. Check [steps/group/groupPage.ts](steps/group/groupPage.ts#L7-L18) for the exact types.

**Problem:** Test data values not recognized by UI
- Add missing values to the corresponding list in [testData/defaults.ts](testData/defaults.ts)
- For example, if a new PDU isn't recognized, add it to `PDU_OPTIONS`

## 📖 Example Tests

See complete working examples:
- [tests/groups/create-group-with-generators.spec.ts](tests/groups/create-group-with-generators.spec.ts) - Full examples using all approaches

## 🎓 Next Steps

1. **Run the example test:** `npm run e2e_UI_test -- --grep "Using pre-built"`
2. **Try the builder:** Create a new test using `new GroupDataBuilder()`
3. **Add a scenario:** Add a new pre-built scenario to `TestDataScenarios` in `builders.ts`
4. **Customize:** Update `defaults.ts` with your own PDU names, staff names, locations, etc.

Happy testing! 🎉
