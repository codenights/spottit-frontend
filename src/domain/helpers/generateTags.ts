const toCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, g => g[1].toUpperCase());

const insertHash = (str: string) => `#${str}`.replace(/#+/g, "#");

const spaceWords = (str: string) => str.replace(/\S#/g, g => `${g[0]} #`);

export const generateTags = (input: string) => {
  const hasTrailingSpace = input !== " " && input[input.length - 1] === " ";
  let result: string = "";

  const extractWordsRegExp = /(\S+)/g;
  let match = extractWordsRegExp.exec(input);

  while (match != null) {
    const word = match[0];

    result += insertHash(toCamelCase(word));
    match = extractWordsRegExp.exec(input);
  }

  return spaceWords(result) + (hasTrailingSpace ? " " : "");
};
