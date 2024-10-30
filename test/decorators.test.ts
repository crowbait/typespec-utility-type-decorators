import { Model } from "@typespec/compiler";
import { BasicTestRunner, expectDiagnostics } from "@typespec/compiler/testing";
import { strictEqual } from "assert";
import { beforeEach, describe, it } from "node:test";
import { createTypespecUtilityTypeDecoratorsTestRunner } from "./test-host.js";

const allProps = ["prop1", "prop2", "prop3"];
const baseTestModel = `@test model Test {${allProps.map((x) => `${x}: string`).join(", ")}}`;

describe("decorators", () => {
  let runner: BasicTestRunner;
  beforeEach(async () => {
    runner = await createTypespecUtilityTypeDecoratorsTestRunner();
  });

  const keyArgsFromArr = (decoratorStub: string, arr: string[]): string =>
    `${decoratorStub}(${arr.map((x) => `"${x}"`).join(", ")})`;

  const hasExactProps = (
    props: Model["properties"],
    target: string[],
  ): void => {
    target.forEach((tprop) => strictEqual(props.has(tprop), true));
    props.forEach((prop) => strictEqual(target.includes(prop.name), true));
  };

  const checkModelProperties = async (
    decorator: string,
    check: (props: Model["properties"]) => void,
  ): Promise<void> => {
    const test = (await runner.compile(`${decorator} ${baseTestModel}`)) as {
      Test: Model;
    };
    check(test.Test.properties);
  };

  const checkKeys = async (
    decoratorStub: string,
    noCheck?: Array<"no-keys" | "duplicate-key" | "unknown-key">,
  ): Promise<void> => {
    if (!noCheck || !noCheck.includes("no-keys"))
      it("emit error on no keys", async () => {
        const diagnostics = await runner.diagnose(
          `${decoratorStub} ${baseTestModel}`,
        );
        expectDiagnostics(diagnostics, {
          code: "typespec-utility-type-decorators/no-keys",
          severity: "error",
        });
      });
    if (!noCheck || !noCheck.includes("duplicate-key"))
      it("emit warning on duplicate keys", async () => {
        const diagnostics = await runner.diagnose(
          `${decoratorStub}("prop1", "prop1") ${baseTestModel}`,
        );
        expectDiagnostics(diagnostics, {
          code: "typespec-utility-type-decorators/duplicate-key",
          severity: "warning",
        });
      });
    if (!noCheck || !noCheck.includes("unknown-key"))
      it("emit error on unknown keys", async () => {
        const diagnostics = await runner.diagnose(
          `${decoratorStub}("unknown-key") ${baseTestModel}`,
        );
        expectDiagnostics(diagnostics, {
          code: "typespec-utility-type-decorators/unknown-key",
          severity: "error",
        });
      });
  };

  describe("@omit", () => {
    const keys = ["prop1", "prop2"];
    it("remove properties from model", () =>
      checkModelProperties(keyArgsFromArr("@omit", keys), (props) =>
        hasExactProps(
          props,
          allProps.filter((x) => !keys.includes(x)),
        ),
      ));
    checkKeys("@omit", ["unknown-key"]);
  });

  describe("@partial", () => {
    it("set all properties optional on a model", () =>
      checkModelProperties(`@partial`, (props) =>
        props.forEach((x) => strictEqual(x.optional, true)),
      ));
  });

  describe("@partialKeys", () => {
    const keys = ["prop1", "prop2"];
    it("set given properties optional on a model", () =>
      checkModelProperties(keyArgsFromArr("@partialKeys", keys), (props) =>
        props.forEach((x) => strictEqual(x.optional, keys.includes(x.name))),
      ));
    checkKeys("@partialKeys");
  });

  describe("@pick", () => {
    const keys = ["prop1", "prop2"];
    it("remove all other properties from model", () =>
      checkModelProperties(keyArgsFromArr("@pick", keys), (props) =>
        hasExactProps(
          props,
          allProps.filter((x) => keys.includes(x)),
        ),
      ));
    checkKeys("@pick");
  });

  describe("@required", () => {
    it("set all properties required on a model", () =>
      checkModelProperties(`@required`, (props) =>
        props.forEach((x) => strictEqual(x.optional, false)),
      ));
  });

  describe("@requiredKeys", () => {
    const keys = ["prop1", "prop2"];
    it("set given properties required on a model", () =>
      checkModelProperties(keyArgsFromArr("@requiredKeys", keys), (props) =>
        props.forEach((x) => {
          if (keys.includes(x.name)) strictEqual(x.optional, false);
        }),
      ));
    checkKeys("@requiredKeys");
  });
});
