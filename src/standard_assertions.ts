import { DecoratorContext, Model } from "@typespec/compiler";
import { reportDiagnostic } from "./lib.js";

/**
 * Checks, whether a "keys" array is empty and if so, reports an error.
 * @param context Decorator context.
 * @param keys Array of keys to test.
 * @returns True if keys array is okay, false on failure.
 */
export const assertKeys = (context: DecoratorContext, keys: string[]): void => {
  if (!keys || keys.length === 0)
    reportDiagnostic(context.program, {
      code: "no-keys",
      target: context.decoratorTarget,
    });
};

/**
 * Checks, whether a "keys" array contains duplicates and if so, reports a warning.
 * @param context Decorator context.
 * @param keys Array of keys to test.
 * @returns True if keys array is okay, false on failure.
 */
export const assertKeysNoDuplicates = (
  context: DecoratorContext,
  keys: string[],
): void => {
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
};

/**
 * Checks, whether all entries in a "keys" array exist as properties on a modal and if NOT so, reports an error.
 * @param context Decorator context.
 * @param target The decorator's target.
 * @param keys Array of keys to test.
 * @returns True if keys array is okay, false on failure.
 */
export const assertKeysKnown = (
  context: DecoratorContext,
  target: Model,
  keys: string[],
): void => {
  let unknownKeyIndex = -1;
  for (let i = 0; i < keys.length; i++) {
    if (!target.properties.has(keys[i])) {
      unknownKeyIndex = i;
      break;
    }
  }
  if (unknownKeyIndex !== -1)
    reportDiagnostic(context.program, {
      code: "unknown-key",
      target: context.getArgumentTarget(unknownKeyIndex)!,
    });
};
