import prop from "../src/prop";

test("string argument", () => {
  expect(prop("color")()).toBeUndefined();
  expect(prop("color")({})).toBeUndefined();
  expect(prop("color")({ color: "red" })).toBe("red");
  expect(prop("color")({ color: () => "red" })).toBe("red");
  expect(prop("color")({ color: props => props.bg, bg: "red" })).toBe("red");
});

test("deep string argument", () => {
  expect(prop("color.primary")()).toBeUndefined();
  expect(prop("color.primary")({})).toBeUndefined();
  expect(prop("color.primary")({ color: {} })).toBeUndefined();
  expect(prop("color.primary")({ color: { primary: "red" } })).toBe("red");
  expect(prop("color.primary")({ color: { primary: () => "red" } })).toBe(
    "red"
  );
  expect(
    prop("color.primary")({
      color: { primary: prop("color.secondary"), secondary: "blue" }
    })
  ).toBe("blue");
});

test("defaultValue", () => {
  expect(prop("color", "red")()).toBe("red");
  expect(prop("color", "red")({})).toBe("red");
  expect(prop("color", "red")({ color: "blue" })).toBe("blue");
  expect(prop("color.primary", "red")({})).toBe("red");
});
