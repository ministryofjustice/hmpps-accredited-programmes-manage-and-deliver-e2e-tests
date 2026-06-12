/**
 * Test data generators
 * These functions create random but realistic test data
 */

import {
  AMPM_OPTIONS,
  COHORT_OPTIONS,
  DAYS_OF_WEEK,
  DELIVERY_LOCATION_OPTIONS,
  GROUP_CODE_PREFIX,
  PDU_OPTIONS,
  SEX_OPTIONS,
  STAFF_NAMES,
  SESSIONS_AND_ATTENDANCE,
  GETTING_STARTED,
  MANAGING_MYSELF,
  MANAGING_LIFES_PROBLEMS,
  MANAGING_PEOPLE_AROUND_ME,
  BRINGING_IT_ALTOGETHER,
  POST_PROGRAMME_REVIEWS,
  RECORD_ATTENDANCE,
  RECORD_ATTENDANCE_NOTES,
} from "./defaults";

/**
 * Generate a unique group code with timestamp-based uniqueness
 * @example generateGroupCode() => "e2e-test-group-code-1718033456789"
 */
export function generateGroupCode(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `${GROUP_CODE_PREFIX}-${timestamp}-${random}`;
}

/**
 * Generate a unique group code with simple numeric suffix
 * Shorter alternative to timestamp version
 * @example generateGroupCodeSimple() => "e2e-test-group-code-542891"
 */
export function generateGroupCodeSimple(): string {
  const random = Math.floor(Math.random() * 1000000);
  return `${GROUP_CODE_PREFIX}-${random}`;
}

/**
 * Generate a future date in MM/DD/YYYY format
 * @param daysInFuture - How many days in the future (default: 30)
 * @example generateFutureDate(60) => "08/10/2025"
 */
export function generateFutureDate(daysInFuture: number = 30): string {
  const date = new Date();
  date.setDate(date.getDate() + daysInFuture);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

/**
 * Generate a specific future date
 * @param year - The year
 * @param month - The month (1-12)
 * @param day - The day of month
 * @example generateDate(2099, 12, 9) => "12/09/2099"
 */
export function generateDate(year: number, month: number, day: number): string {
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${m}/${d}/${year}`;
}

/**
 * Generate a random hour (1-12)
 */
export function generateHour(): number {
  return Math.floor(Math.random() * 12) + 1;
}

/**
 * Generate a random minute (0, 15, 30, 45)
 */
export function generateMinute(): number {
  return [0, 15, 30, 45][Math.floor(Math.random() * 4)];
}

/**
 * Pick a random element from an array
 */
export function pickRandom<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Pick multiple random unique elements from an array
 * @example pickRandomMultiple([1,2,3,4,5], 2) => [3, 1]
 */
export function pickRandomMultiple<T>(
  array: readonly T[],
  count: number
): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Generate a random cohort option
 * @example generateCohort() => "General offence, learning disabilities and challenges (LDC)"
 */
export function generateCohort() {
  return pickRandom(COHORT_OPTIONS);
}

/**
 * Generate a random sex option
 * @example generateSex() => "Female"
 */
export function generateSex() {
  return pickRandom(SEX_OPTIONS);
}

/**
 * Generate a random PDU
 * @example generatePdu() => "Cleveland"
 */
export function generatePdu() {
  return pickRandom(PDU_OPTIONS);
}

/**
 * Generate a random delivery location
 * @example generateDeliveryLocation() => "Middlesbrough (Borough Rd)"
 */
export function generateDeliveryLocation() {
  return pickRandom(DELIVERY_LOCATION_OPTIONS);
}

/**
 * Generate a random staff name
 * @example generateStaffName() => "Emma Davis"
 */
export function generateStaffName() {
  return pickRandom(STAFF_NAMES);
}

/**
 * Generate a random day of the week
 * @example generateDayOfWeek() => "Monday"
 */
export function generateDayOfWeek() {
  return pickRandom(DAYS_OF_WEEK);
}

/**
 * Generate multiple unique days of the week
 * @example generateDaysOfWeek(3) => ["Monday", "Wednesday", "Friday"]
 */
export function generateDaysOfWeek(count: number = 2) {
  return pickRandomMultiple(DAYS_OF_WEEK, count);
}

/**
 * Generate a random AM/PM value
 * @example generateAmPm() => "pm"
 */
export function generateAmPm() {
  return pickRandom(AMPM_OPTIONS);
}

/**
 * Generate a realistic time slot (hour:minute am/pm)
 */
export function generateTimeSlot() {
  return {
    hour: generateHour(),
    minute: generateMinute(),
    ampm: generateAmPm() as "am" | "pm",
  };
}

/**
 * Generate facilitator names (usually 1-3 people)
 * @param count - Number of facilitators (default: 1)
 */
export function generateFacilitators(count: number = 1): string[] {
  return Array.from({ length: count }, () => generateStaffName());
}

/**
 * Generate cover facilitator names (usually 1-2 people)
 * @param count - Number of cover facilitators (default: 1)
 */
export function generateCoverFacilitators(count: number = 1): string[] {
  return Array.from({ length: count }, () => generateStaffName());
}

/**
 * Generate a random section label for sessions and attendance accordion
 */
export function generateSessionsAndAttendanceSection() {
  return pickRandom(SESSIONS_AND_ATTENDANCE);
}

/**
 * Generate a random attendance note example
 */
export function generateRecordAttendanceNote() {
  return pickRandom(RECORD_ATTENDANCE_NOTES);
}

/**
 * Generate a random Getting started session option
 */
export function generateGettingStartedSession() {
  return pickRandom(GETTING_STARTED);
}

/**
 * Generate a random Managing myself session option
 */
export function generateManagingMyselfSession() {
  return pickRandom(MANAGING_MYSELF);
}

/**
 * Generate a random Managing life's problems session option
 */
export function generateManagingLifesProblemsSession() {
  return pickRandom(MANAGING_LIFES_PROBLEMS);
}

/**
 * Generate a random Managing people around me session option
 */
export function generateManagingPeopleAroundMeSession() {
  return pickRandom(MANAGING_PEOPLE_AROUND_ME);
}

/**
 * Generate a random Bringing it all together session option
 */
export function generateBringingItAltogetherSession() {
  return pickRandom(BRINGING_IT_ALTOGETHER);
}

/**
 * Generate a random Post-programme reviews session option
 */
export function generatePostProgrammeReviewSession() {
  return pickRandom(POST_PROGRAMME_REVIEWS);
}

/**
 * Generate a random attendance status option
 */
export function generateRecordAttendanceStatus() {
  return pickRandom(RECORD_ATTENDANCE);
}


