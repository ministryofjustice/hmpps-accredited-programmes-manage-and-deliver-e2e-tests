# Test Data Generators - Implementation Summary

## ✅ What Was Created

### 1. **testData Module** (`testData/`)
A comprehensive test data generation system with 4 key files:

- **`defaults.ts`** - Reference lists and constants
  - Lists: Cohorts, sex options, days, PDUs, delivery locations, staff names
  - Group code prefix and other constants
  - All predefined, extensible values

- **`generators.ts`** - Factory functions for random data
  - 20+ generator functions for every data type
  - Creates realistic but unique test data
  - Examples: `generateGroupCode()`, `generateFutureDate(30)`, `generatePdu()`

- **`builders.ts`** - Builder pattern for complex objects
  - `GroupDataBuilder` class with fluent API
  - 5 pre-built test scenarios
  - Easy customization with method chaining

- **`index.ts`** - Barrel export for easy importing
  - Single import point: `import { ... } from "../../testData"`

### 2. **Example Test File**
- **`tests/groups/create-group-with-generators.spec.ts`**
  - 3 complete working examples
  - Shows pre-built scenarios, builder pattern, and real usage
  - Fully documented with inline comments
  - Ready to run and learn from

### 3. **Comprehensive Guide**
- **`TEST_DATA_GUIDE.md`**
  - Step-by-step guide for beginners
  - API reference for all functions
  - Common patterns and use cases
  - Troubleshooting section

## 🎯 Three Ways to Use It

### 1. **Pre-built Scenarios** (Simplest)
```typescript
const data = TestDataScenarios.standard();
```
✅ Predefined, tested, minimal configuration needed

### 2. **Builder Pattern** (Flexible)
```typescript
const data = new GroupDataBuilder()
  .withSex("Male")
  .withCohort("General")
  .build();
```
✅ Customize what you need, rest uses defaults

### 3. **Individual Generators** (Granular)
```typescript
const code = generateGroupCode();
const date = generateFutureDate(60);
```
✅ Full control for complex scenarios

## 📊 What You Get

Each test data object provides:
- Unique group code (guaranteed unique across parallel runs)
- Valid dates (formatted for the UI)
- Realistic schedule with days/times
- Valid cohort, sex, PDU, location selections
- Facilitator and cover facilitator names
- All data in correct TypeScript types

## 🚀 Next Steps

### Immediate
1. **Review** `TEST_DATA_GUIDE.md` for complete documentation
2. **Look at** `tests/groups/create-group-with-generators.spec.ts` for working examples
3. **Run** one of the example tests to see it in action

### Short Term
1. **Refactor** your existing `create-group.spec.ts` to use the new system
2. **Add** any missing PDU names or locations to `testData/defaults.ts`
3. **Create** custom scenarios in `testData/builders.ts` for your common test cases

### For Your Team
1. **Share** `TEST_DATA_GUIDE.md` with your team
2. **Add** to your CI/CD pipeline (same as original tests - no new setup needed)
3. **Extend** with additional test data as new features are added

## 💡 Tips for Success

✅ **Use pre-built scenarios first** - They're battle-tested and documented
✅ **Add missing data to defaults** - Keep lists in `defaults.ts` up-to-date
✅ **Create named scenarios** - Add to `TestDataScenarios` for complex combos
✅ **Type safety** - TypeScript will catch issues at development time
✅ **Readability** - Tests are now much cleaner and self-documenting

## 🔗 File Locations

```
hmpps-accredited-programmes-manage-and-deliver-e2e-tests/
├── testData/                                    # New test data module
│   ├── defaults.ts                             # Reference data
│   ├── generators.ts                           # Random data creators
│   ├── builders.ts                             # Builder pattern
│   └── index.ts                                # Exports
├── tests/
│   └── groups/
│       ├── create-group.spec.ts               # Original test (refactor soon)
│       └── create-group-with-generators.spec.ts # New examples
├── TEST_DATA_GUIDE.md                          # Complete documentation
└── ... (existing files)
```

## 🎓 Learning Resources

1. **For beginners:** Start with `TEST_DATA_GUIDE.md` Quick Start section
2. **For examples:** Run `tests/groups/create-group-with-generators.spec.ts`
3. **For reference:** Check the API reference in `TEST_DATA_GUIDE.md`
4. **For code:** Read the inline documentation in `testData/*.ts` files

---

You're all set! The system is ready to use. Start with the guide and examples, then adapt to your needs. 🎉
