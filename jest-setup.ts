import "@testing-library/jest-dom";

jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (...props: any) => {
    const dynamicModule = jest.requireActual("next/dynamic");
    const dynamicActualComp = dynamicModule.default;
    const RequiredComponent = dynamicActualComp(props[0]);
    RequiredComponent.preload
      ? RequiredComponent.preload()
      : RequiredComponent.render.preload();
    return RequiredComponent;
  },
}));

jest.mock("use-places-autocomplete", () => {
  return () => ({
    ready: true,
    value: "",
    suggestions: { status: "OK", data: [] },
    setValue: jest.fn(),
    clearSuggestions: jest.fn(),
  });
});
