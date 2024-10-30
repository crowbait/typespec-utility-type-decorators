import {
  DecoratorContext,
  Model,
  validateDecoratorTarget,
} from "@typespec/compiler";
import { reportDiagnostic } from "./lib.js";

export const namespace = "TypespecUtilityTypeDecorators";

/**
 * Sets all properties of the Model to be optional.
 * @param context Decorator context.
 * @param target Decorator target. Must be a Model.
 */
export const $partial = (context: DecoratorContext, target: Model): void => {
  if (!validateDecoratorTarget(context, target, "@partial", "Model")) return;
  for (const [key, prop] of target.properties) {
    prop.optional = true;
    target.properties.set(key, prop);
  }
};

/**
 * Sets properties of the Model with the given keys to be optional.
 * @param context Decorator context.
 * @param target Decorator target. Must be a Model.
 * @param keys The Model property keys to be made optional.
 */
export const $partialKeys = (
  context: DecoratorContext,
  target: Model,
  ...keys: string[]
): void => {
  if (!validateDecoratorTarget(context, target, "@partialKeys", "Model"))
    return;

  // checks for no keys
  if (!keys || keys.length === 0)
    reportDiagnostic(context.program, {
      code: "no-keys",
      target: context.decoratorTarget,
    });

  // checks for duplicate keys
  const checkedKeys: string[] = [];
  let duplicateKeyIndex = -1;
  for (let i = 0; i < keys.length; i++) {
    if (checkedKeys.includes(keys[i])) {
      duplicateKeyIndex = i;
      break;
    }
    checkedKeys.push(keys[i]);
  }
  if (duplicateKeyIndex !== -1)
    reportDiagnostic(context.program, {
      code: "duplicate-key",
      target: context.getArgumentTarget(duplicateKeyIndex)!,
    });

  for (const [key, prop] of target.properties) {
    if (keys.includes(prop.name)) prop.optional = true;
    target.properties.set(key, prop);
  }
};
