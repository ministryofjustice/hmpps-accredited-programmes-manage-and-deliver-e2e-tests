/**
 * Test data builders using the Builder pattern
 * These create complex test objects with sensible defaults
 * Allows fluent API for customisation
 */

import {
  generateAmPm,
  generateCohort,
  generateCoverFacilitators,
  generateDate,
  generateDeliveryLocation,
  generateDaysOfWeek,
  generateFacilitators,
  generateFutureDate,
  generateGroupCode,
  generateHour,
  generateMinute,
  generatePdu,
  generateSex,
  generateStaffName,
  generateTimeSlot,
} from "./generators";
import { DAYS_OF_WEEK } from "./defaults";
import type {
  CohortRadioOption,
  SexRadioOption,
  WhenWillGroupRunData,
} from "../steps/group/groupPage";

/**
 * Represents scheduling data for a group
 */
export interface ScheduleSlot {
  dayOfWeekCheckbox: typeof DAYS_OF_WEEK[number];
  hour: number;
  minute: number;
  ampm: "am" | "pm";
}

/**
 * Represents complete group creation test data
 */
export interface GroupTestData {
  groupCode: string;
  startDate: string;
  schedule: ScheduleSlot[];
  cohort: CohortRadioOption;
  sex: SexRadioOption;
  pdu: string;
  deliveryLocation: string;
  treatmentManager: string;
  facilitators: string[];
  coverFacilitators: string[];
}

/**
 * Builder for test data with fluent API
 * Allows easy creation and customisation of test data
 *
 * @example
 * const data = new GroupDataBuilder()
 *   .withGroupCode("custom-code")
 *   .withSchedule([{ day: "Monday", hour: 2, minute: 30, ampm: "pm" }])
 *   .build();
 */
export class GroupDataBuilder {
  private data: GroupTestData;

  constructor() {
    // Initialise with sensible defaults
    this.data = {
      groupCode: generateGroupCode(),
      startDate: generateFutureDate(60),
      schedule: this.generateDefaultSchedule(),
      cohort: generateCohort(),
      sex: generateSex(),
      pdu: generatePdu(),
      deliveryLocation: generateDeliveryLocation(),
      treatmentManager: generateStaffName(),
      facilitators: generateFacilitators(1),
      coverFacilitators: generateCoverFacilitators(1),
    };
  }

  /**
   * Generate a default schedule with 2 time slots
   */
  private generateDefaultSchedule(): ScheduleSlot[] {
    const days = generateDaysOfWeek(2);
    return days.map((day) => ({
      dayOfWeekCheckbox: day,
      hour: generateHour(),
      minute: generateMinute(),
      ampm: generateAmPm() as "am" | "pm",
    }));
  }

  // Fluent builder methods

  withGroupCode(code: string): this {
    this.data.groupCode = code;
    return this;
  }

  withStartDate(date: string): this {
    this.data.startDate = date;
    return this;
  }

  withStartDateDaysInFuture(days: number): this {
    this.data.startDate = generateFutureDate(days);
    return this;
  }

  withStartDateExact(year: number, month: number, day: number): this {
    this.data.startDate = generateDate(year, month, day);
    return this;
  }

  withSchedule(schedule: ScheduleSlot[]): this {
    this.data.schedule = schedule;
    return this;
  }

  addScheduleSlot(
    dayOfWeekCheckbox: string,
    hour: number,
    minute: number,
    ampm: "am" | "pm"
  ): this {
    this.data.schedule.push({
      dayOfWeekCheckbox: dayOfWeekCheckbox as any,
      hour,
      minute,
      ampm,
    });
    return this;
  }

  withCohort(cohort: CohortRadioOption): this {
    this.data.cohort = cohort;
    return this;
  }

  withSex(sex: SexRadioOption): this {
    this.data.sex = sex;
    return this;
  }

  withPdu(pdu: string): this {
    this.data.pdu = pdu;
    return this;
  }

  withDeliveryLocation(location: string): this {
    this.data.deliveryLocation = location;
    return this;
  }

  withTreatmentManager(manager: string): this {
    this.data.treatmentManager = manager;
    return this;
  }

  withFacilitators(facilitators: string[]): this {
    this.data.facilitators = facilitators;
    return this;
  }

  withCoverFacilitators(coverFacilitators: string[]): this {
    this.data.coverFacilitators = coverFacilitators;
    return this;
  }

  /**
   * Build the test data object
   */
  build(): GroupTestData {
    return { ...this.data };
  }

  /**
   * Convert to WhenWillGroupRunData format for use with page steps
   */
  buildScheduleData(): WhenWillGroupRunData {
    return this.data.schedule;
  }
}

/**
 * Pre-built test data sets for common scenarios
 */
export const TestDataScenarios = {
  /**
   * Minimal valid data - useful for smoke tests
   */
  minimal: () =>
    new GroupDataBuilder()
      .withGroupCode(generateGroupCode())
      .withStartDateExact(2099, 12, 9)
      .withSchedule([
        {
          dayOfWeekCheckbox: "Monday",
          hour: 1,
          minute: 1,
          ampm: "am" as const,
        },
      ])
      .build(),

  /**
   * Standard test data - typical full group creation
   */
  standard: () =>
    new GroupDataBuilder()
      .withGroupCode(generateGroupCode())
      .withStartDateExact(2099, 12, 9)
      .withSchedule([
        {
          dayOfWeekCheckbox: "Monday",
          hour: 1,
          minute: 1,
          ampm: "am" as const,
        },
        {
          dayOfWeekCheckbox: "Wednesday",
          hour: 2,
          minute: 2,
          ampm: "pm" as const,
        },
      ])
      .withCohort("General offence, learning disabilities and challenges (LDC)")
      .withSex("Female")
      .withPdu("Cleveland")
      .withDeliveryLocation("Middlesbrough (Borough Rd)")
      .withTreatmentManager("R&MP Practitioner")
      .withFacilitators(["R&MP Practitioner"])
      .withCoverFacilitators(["Unallocated Staff"])
      .build(),

  /**
   * Complex scenario - multiple facilitators, diverse schedule
   */
  complex: () =>
    new GroupDataBuilder()
      .withStartDateDaysInFuture(90)
      .withSchedule([
        {
          dayOfWeekCheckbox: "Monday",
          hour: 10,
          minute: 0,
          ampm: "am" as const,
        },
        {
          dayOfWeekCheckbox: "Wednesday",
          hour: 2,
          minute: 30,
          ampm: "pm" as const,
        },
        {
          dayOfWeekCheckbox: "Friday",
          hour: 3,
          minute: 15,
          ampm: "pm" as const,
        },
      ])
      .withFacilitators(generateFacilitators(2))
      .withCoverFacilitators(generateCoverFacilitators(2))
      .build(),

  /**
   * Variation - test with different sex and cohort
   */
  maleGeneral: () =>
    new GroupDataBuilder()
      .withSex("Male")
      .withCohort("General")
      .build(),

  /**
   * Variation - test with sexual offence cohort
   */
  sexualOffence: () =>
    new GroupDataBuilder()
      .withCohort("Sexual offence")
      .withSex("Mixed")
      .build(),
};
