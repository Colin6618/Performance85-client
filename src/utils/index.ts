
export const formatDate = (date: string): string =>
  new Date(date)
    .toDateString()
    .slice(4, 10)
    .toLowerCase();

// https://github.com/withspectrum/spectrum/blob/alpha/admin/src/helpers/utils.js
export const timeAgo = (time: any): string | number => {
  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = 60 * 1000;
  const MS_PER_HOUR = MS_PER_MINUTE * 60;
  const MS_PER_DAY = MS_PER_HOUR * 24;
  const MS_PER_YEAR = MS_PER_DAY * 365;

  let current: any = new Date();
  let previous: any = new Date(time);
  let elapsed = current - previous

  if (elapsed < MS_PER_MINUTE) {
    return Math.round(elapsed / MS_PER_SECOND) + 's ago';
  } else if (elapsed < MS_PER_HOUR) {
    return Math.round(elapsed / MS_PER_MINUTE) + 'm ago';
  } else if (elapsed < MS_PER_DAY) {
    return Math.round(elapsed / MS_PER_HOUR) + 'h ago';
  } else if (elapsed < MS_PER_YEAR) {
    return Math.round(elapsed / MS_PER_DAY) + 'd ago';
  } else {
    return Math.round(elapsed / MS_PER_YEAR) + 'y ago';
  }
}



export const MENTION_REGEX = /(?:^|[^a-zA-Z0-9_!@#$%&*])(?:(?:@)(?!\/))([a-zA-Z0-9/_.]{1,40})(?:\b(?!@)|$)/gm;
export const REFERENCE_REGEX = /\B#(\d{1,10})(?:\b)/gm;

/**
 * @deprecated
 * @description Returns array of [@mentions] & [#references] from markdown
 */
export const getRefsOrMentions = (markdown: string, quantifier: string = '#'): string[] => {
  let regex: RegExp = REFERENCE_REGEX;
  if (quantifier === '@') regex = MENTION_REGEX;

  let matched = markdown.match(regex)
    ?.map((ref: string): any => ref.replace(quantifier, '').trim())
    ?.filter(
      (value: number, index: number, arr: number[]) =>
        arr.indexOf(value) === index
    );
  return matched || [];
};

/**
 * @description get mentions and refs from markdown and make them links
 */
export const parseRefsAndMentions = (markdown: string): string => {
  return markdown
    ?.replace(
      MENTION_REGEX,
      ` [@$1](/profiles/$1) `
    )
    .replace(REFERENCE_REGEX, ` [#$1](/dashboard/performances/$1) `);
};



/**
 * @description safe decode entities
 */
export const htmlDecode = (input: string): string => {
  if (typeof input !== 'string') return '';
  const textarea = document.createElement("textarea");
  textarea.innerHTML = input;
  return textarea.value;
}


/**
 * decode html entities | parse refs & mentions
 * @param markdown string
 */
export const renderMarkdown = (markdown: string): string => htmlDecode(parseRefsAndMentions(markdown))

export const copyToClipboard = (str: string) => {
  let el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

export const toggleArrayItem = (arr: any[], value: any) => {
  let item = JSON.stringify(value);
  return arr.some(a => item === JSON.stringify(a))
    ? arr.filter(i => JSON.stringify(i) !== item) // remove item
    : [...arr, value]; // add item
};

