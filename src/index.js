/* eslint-disable no-bitwise */

const hashString = s => (
  s.split('')
    .reduce((a, b) => {
      let start = a;
      start = ((start << 5) - start) + b.charCodeAt(0);
      return start & start;
    }, 0)
);

/**
* Cached fetch wrapper/helper
* @param {string} url URL being fetched
* @param {*} options fetch options
* @param {number} expiry time in seconds for caching, default = 300 (5 minutes)
*/
export default async (url, options, expiry = 300) => {
  const cacheKey = hashString(url);
  const cached = localStorage.getItem(cacheKey);
  const whenCached = localStorage.getItem(`${cacheKey}:ts`);

  if (cached !== null && whenCached !== null) {
    const age = (Date.now() - whenCached) / 1000;

    if (age < expiry) {
      const response = new Response(new Blob([cached]));
      return Promise.resolve(response);
    }

    localStorage.removeItem(cacheKey);
    localStorage.removeItem(`${cacheKey}:ts`);
  }

  try {
    const response = await fetch(url, options);
    const content = JSON.stringify(response);

    localStorage.setItem(cacheKey, content);
    localStorage.setItem(`${cacheKey}:ts`, Date.now());

    return response;
  } catch (error) {
    return error;
  }
};
