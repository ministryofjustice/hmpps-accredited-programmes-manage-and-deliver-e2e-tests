import { expect, test } from "@playwright/test";
import {
  BRINGING_IT_ALTOGETHER,
  GETTING_STARTED,
  MANAGING_LIFES_PROBLEMS,
  MANAGING_MYSELF,
  MANAGING_PEOPLE_AROUND_ME,
  POST_PROGRAMME_REVIEWS,
  RECORD_ATTENDANCE,
  RECORD_ATTENDANCE_NOTES,
  SESSIONS_AND_ATTENDANCE,
} from "../../testData/defaults";
import {
  generateBringingItAltogetherSession,
  generateGettingStartedSession,
  generateManagingLifesProblemsSession,
  generateManagingMyselfSession,
  generateManagingPeopleAroundMeSession,
  generatePostProgrammeReviewSession,
  generateRecordAttendanceNote,
  generateRecordAttendanceStatus,
  generateSessionsAndAttendanceSection,
} from "../../testData/generators";

const sampleGenerator = <T>(generator: () => T, iterations: number = 30): T[] => {
  return Array.from({ length: iterations }, () => generator());
};

const sessionsDataSets = [
  { name: "SESSIONS_AND_ATTENDANCE", values: SESSIONS_AND_ATTENDANCE },
  { name: "GETTING_STARTED", values: GETTING_STARTED },
  { name: "MANAGING_MYSELF", values: MANAGING_MYSELF },
  { name: "MANAGING_LIFES_PROBLEMS", values: MANAGING_LIFES_PROBLEMS },
  { name: "MANAGING_PEOPLE_AROUND_ME", values: MANAGING_PEOPLE_AROUND_ME },
  { name: "BRINGING_IT_ALTOGETHER", values: BRINGING_IT_ALTOGETHER },
  { name: "POST_PROGRAMME_REVIEWS", values: POST_PROGRAMME_REVIEWS },
  { name: "RECORD_ATTENDANCE", values: RECORD_ATTENDANCE },
  { name: "RECORD_ATTENDANCE_NOTES", values: RECORD_ATTENDANCE_NOTES },
] as const;

test.describe("Sessions and attendance generators", () => {
  test("Default sessions datasets are non-empty", async () => {
    for (const dataSet of sessionsDataSets) {
      expect(dataSet.values.length, `${dataSet.name} should not be empty`).toBeGreaterThan(0);
    }
  });

  test("Default sessions datasets have no duplicate values", async () => {
    for (const dataSet of sessionsDataSets) {
      const deduplicated = new Set(dataSet.values);
      expect(
        deduplicated.size,
        `${dataSet.name} contains duplicate values`
      ).toBe(dataSet.values.length);
    }
  });

  test("SESSIONS_AND_ATTENDANCE generator returns allowed values", async () => {
    const values = sampleGenerator(generateSessionsAndAttendanceSection);
    for (const value of values) {
      expect(SESSIONS_AND_ATTENDANCE).toContain(value);
    }
  });

  test("GETTING_STARTED generator returns allowed values", async () => {
    const values = sampleGenerator(generateGettingStartedSession);
    for (const value of values) {
      expect(GETTING_STARTED).toContain(value);
    }
  });

  test("MANAGING_MYSELF generator returns allowed values", async () => {
    const values = sampleGenerator(generateManagingMyselfSession);
    for (const value of values) {
      expect(MANAGING_MYSELF).toContain(value);
    }
  });

  test("MANAGING_LIFES_PROBLEMS generator returns allowed values", async () => {
    const values = sampleGenerator(generateManagingLifesProblemsSession);
    for (const value of values) {
      expect(MANAGING_LIFES_PROBLEMS).toContain(value);
    }
  });

  test("MANAGING_PEOPLE_AROUND_ME generator returns allowed values", async () => {
    const values = sampleGenerator(generateManagingPeopleAroundMeSession);
    for (const value of values) {
      expect(MANAGING_PEOPLE_AROUND_ME).toContain(value);
    }
  });

  test("BRINGING_IT_ALTOGETHER generator returns allowed values", async () => {
    const values = sampleGenerator(generateBringingItAltogetherSession);
    for (const value of values) {
      expect(BRINGING_IT_ALTOGETHER).toContain(value);
    }
  });

  test("POST_PROGRAMME_REVIEWS generator returns allowed values", async () => {
    const values = sampleGenerator(generatePostProgrammeReviewSession);
    for (const value of values) {
      expect(POST_PROGRAMME_REVIEWS).toContain(value);
    }
  });

  test("RECORD_ATTENDANCE generator returns allowed values", async () => {
    const values = sampleGenerator(generateRecordAttendanceStatus);
    for (const value of values) {
      expect(RECORD_ATTENDANCE).toContain(value);
    }
  });

  test("RECORD_ATTENDANCE_NOTES generator returns allowed values", async () => {
    const values = sampleGenerator(generateRecordAttendanceNote);
    for (const value of values) {
      expect(RECORD_ATTENDANCE_NOTES).toContain(value);
    }
  });
});
