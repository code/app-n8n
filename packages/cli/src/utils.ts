/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { INode } from 'n8n-workflow';

/**
 * Returns if the given id is a valid workflow id
 */
export function isWorkflowIdValid(id: string | null | undefined): boolean {
	// TODO: could also check if id only contains nanoId characters
	return typeof id === 'string' && id?.length <= 16;
}

export const alphabetizeKeys = (obj: INode) =>
	Object.keys(obj)
		.sort()
		.reduce<Partial<INode>>(
			(acc, key) => ({
				...acc,
				// @ts-expect-error @TECH_DEBT Adding index signature to INode causes type issues downstream
				[key]: obj[key],
			}),
			{},
		);

export const separate = <T>(array: T[], test: (element: T) => boolean) => {
	const pass: T[] = [];
	const fail: T[] = [];

	array.forEach((i) => (test(i) ? pass : fail).push(i));

	return [pass, fail];
};

export const toError = (maybeError: unknown) =>
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	maybeError instanceof Error ? maybeError : new Error(`${maybeError}`);

export function isStringArray(value: unknown): value is string[] {
	return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

export const isIntegerString = (value: string) => /^\d+$/.test(value);

export function isObjectLiteral(item: unknown): item is { [key: string]: string } {
	return typeof item === 'object' && item !== null && !Array.isArray(item);
}

export function removeTrailingSlash(path: string) {
	return path.endsWith('/') ? path.slice(0, -1) : path;
}

// return the difference between two arrays
export function rightDiff<T1, T2>(
	[arr1, keyExtractor1]: [T1[], (item: T1) => string],
	[arr2, keyExtractor2]: [T2[], (item: T2) => string],
): T2[] {
	// create map { itemKey => true } for fast lookup for diff
	const keyMap = arr1.reduce<{ [key: string]: true }>((map, item) => {
		map[keyExtractor1(item)] = true;
		return map;
	}, {});

	// diff against map
	return arr2.reduce<T2[]>((acc, item) => {
		if (!keyMap[keyExtractor2(item)]) {
			acc.push(item);
		}
		return acc;
	}, []);
}
