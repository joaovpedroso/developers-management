import { clearString } from "./text";

describe("text", () => {
  const testCases = [
    {
      term: "Automóvel",
      expected: "Automovel",
    },
    {
      term: "Data_nascimento",
      expected: "Data_nascimento",
    },
    {
      term: "Teste@/123",
      expected: "Teste",
    },
  ];

  test.each(testCases)("test clear string terms", ({ term, expected }) => {
    const result = clearString(term);

    expect(result).toBe(expected);
  });
});
