const { getMonthlySummary } = require("../src/monthlySummary");

describe("getMonthlySummary", () => {
  test("returns empty object for empty expenses", () => {
    expect(getMonthlySummary([])).toEqual({});
  });

  test("groups expenses by month", () => {
    const expenses = [
      { date: "2025-09-01", amount: 50 },
      { date: "2025-09-02", amount: 30 },
      { date: "2025-08-29", amount: 20 }
    ];
    expect(getMonthlySummary(expenses)).toEqual({
      "2025-09": 80,
      "2025-08": 20
    });
  });

  test("ignores invalid entries", () => {
    const expenses = [
      { date: "invalid-date", amount: 100 },
      { date: "2025-09-05", amount: "oops" },
      { date: "2025-09-10", amount: 40 }
    ];
    expect(getMonthlySummary(expenses)).toEqual({
      "2025-09": 40
    });
  });
});
