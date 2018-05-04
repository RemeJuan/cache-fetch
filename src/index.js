/* eslint-disable no-bitwise, no-param-reassign */

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
*/
export function offlineResponse(url) {
  const cacheKey = hashString(url);
  const cached = localStorage.getItem(cacheKey);

  const response = new Response(new Blob([cached]));
  return Promise.resolve(response);
}

/**
* Cached fetch wrapper/helper
* @param {string} url URL being fetched
* @param {*} options fetch options
* @param {number} expiry time in seconds for caching, default = 300 (5 minutes)
*/
export default (url, options) => {
  let expiry = 5 * 60;
  if (typeof options === 'number') {
    expiry = options;
    options = undefined;
  } else if (typeof options === 'object') {
    expiry = options.seconds || expiry;
  }

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

  return fetch(url, options).then((response) => {
    if (response.status === 200) {
      const ct = response.headers.get('Content-Type');
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        response.clone().text().then((content) => {
          localStorage.setItem(cacheKey, content);
          localStorage.setItem(`${cacheKey}:ts`, Date.now());
        });
      }
    }
    return response;
  });
};
