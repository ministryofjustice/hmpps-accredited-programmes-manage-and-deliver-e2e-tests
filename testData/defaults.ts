/**
 * Default test data and reference values
 * Use these as constants and fallbacks for test data generation
 */

export const COHORT_OPTIONS = [
  "General offence, learning disabilities and challenges (LDC)",
  "General",
  "Sexual offence",
  "Sexual offence, learning disabilities and challenges (LDC)",
] as const;

export const SEX_OPTIONS = ["Male", "Female", "Mixed"] as const;

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const AMPM_OPTIONS = ["am", "pm"] as const;

/** Common PDU (Probation Delivery Unit) names  */
export const PDU_OPTIONS = [
  "Cleveland",
  "Durham",
  "Northumbria",
  "Cumbria",
  "Lancashire",
  "Merseyside",
  "Cheshire",
  "South Yorkshire",
  "West Yorkshire",
  "North Yorkshire",
  "Humber",
  "Nottinghamshire",
  "Leicestershire",
  "Cambridgeshire",
  "Norfolk",
  "Suffolk",
  "Essex",
  "Hertfordshire",
  "Bedfordshire",
] as const;

/** Common delivery location examples */
export const DELIVERY_LOCATION_OPTIONS = [
  "Middlesbrough (Borough Rd)",
  "Stockton-on-Tees",
  "Redcar",
  "Durham",
  "Peterlee",
] as const;

/** Common staff/facilitator names for testing */
export const STAFF_NAMES = [
  "John Smith",
  "Jane Doe",
  "Michael Johnson",
  "Sarah Williams",
  "David Brown",
  "Emma Davis",
  "R&MP Practitioner",
  "Unallocated Staff",
] as const;

/** Group code prefix - keeps tests identifiable */
export const GROUP_CODE_PREFIX = "e2e-test-group-code";


/** Sessions and attendance module data */
export const SESSIONS_AND_ATTENDANCE = [
  "Pre-group one-to-ones", 
  "Getting strated", 
  "Managing myself",
  "Managing life's problems", 
  "Managing people around me", 
  "Bringing it all together", 
  "Post-programme reviews"
] as const;

/** Getting Started  module data */
export const GETTING_STARTED = [
  "Getting started 1: Introduction to Building Choices", 
  "Getting started 2: Understanding myself", 
  "Getting started 1 catch-up",
  "Getting started 2 catch-up", 
  "Getting started one-to-one", 
  "Getting started one-to-one catch-up", 
] as const;

/** Managing myself module data */
export const MANAGING_MYSELF = [
  "Managing myself 1: Understanding my feelings", 
  "Managing myself 2: Helpful and unhelpful feelings", 
  "Managing myself 3: Managing my feelings, part 1",
  "Managing myself 4: Managing my feelings, part 2", 
  "Managing myself 5: Understanding my thinking", 
  "Managing myself 6: Developing my flexible thinking", 
  "Managing myself 1 catch-up",
  "Managing myself 2 catch-up",
  "Managing myself 3 catch-up",
  "Managing myself 4 catch-up",
  "Managing myself 5 catch-up",
  "Managing myself 6 catch-up",
  "Managing myself one-to-one",
  "Managing myself one-to-one catch-up",
] as const;

/** Managing life’s problems module data */
export const MANAGING_LIFES_PROBLEMS =[
  "Managing life’s problems 1: Understanding problems",
  "Managing life’s problems 2: Exploring life’s problems",
  "Managing life’s problems 3: Planning to manage life’s problems",
  "Managing life’s problems 4: Putting it into action",
  "Managing life’s problems 1 catch-up",
  "Managing life’s problems 2 catch-up",
  "Managing life’s problems 3 catch-up",
  "Managing life’s problems 4 catch-up",
  "Managing life’s problems one-to-one",
  "Managing life’s problems one-to-one catch-up",
] as const

/**Managing people around me module data */
export const MANAGING_PEOPLE_AROUND_ME =[
  "Managing people around me 1: Understanding the people and influences around me",
  "Managing people around me 2: My role in relationships",
  "Managing people around me 3: Relationship skills, part 1",
  "Managing people around me 4: Relationship skills, part 2",
  "Managing people around me 5: Practising our relationship skills",
  "Managing people around me 6: Module skills practice",
  "Managing people around me 1 catch-up",
  "Managing people around me 2 catch-up",
  "Managing people around me 3 catch-up",
  "Managing people around me 4 catch-up",
  "Managing people around me 5 catch-up",
  "Managing people around me 6 catch-up",
  "Managing people around me one-to-one",
  "Managing people around me one-to-one catch-up",
] as const


/**Bringing it altogether module data */
export const BRINGING_IT_ALTOGETHER = [
  "Bringing it all together 1: Future me plan",
  "Bringing it all together 2: Future me practice",
  "Bringing it all together 3: Programme completion",
  "Bringing it all together 1 catch-up",
  "Bringing it all together 2 catch-up",
  "Bringing it all together 3 catch-up",
] as const


/**Post-programme reviews module data */
export const POST_PROGRAMME_REVIEWS = [ 
  "Post-programme review",
  "Post-programme review catch-up",
] as const

/**Attendance statuses */
export const RECORD_ATTENDANCE =[
  "Yes - attended",
  "Attended but failed to comply",
  "No - did not attend",
] as const;

/**Attendance notes examples */
export const RECORD_ATTENDANCE_NOTES =[
  "They attended and were compliant throughout.",
  "They could not participate because of drug or alcohol use.",
  "They did not show up and made no contact to explain their absence.",
] as const;

