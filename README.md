<!-- TITLE/ -->

<h1>Cache Fetch</h1>

<!-- /TITLE -->


<!-- DESCRIPTION/ -->

Helper for caching fetch calls in localStorage

<!-- /DESCRIPTION -->


<!-- BADGES/ -->

<span class="badge-nodeico"><a href="https://www.npmjs.com/package/cache-fetch" title="Nodei.co badge"><img src="https://nodei.co/npm/cache-fetch.png" alt="Nodei.co badge" /></a></span>
<br class="badge-separator" />
<span class="badge-travisci"><a href="http://travis-ci.org/RemeJuan/cache-fetch" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/RemeJuan/cache-fetch/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/cache-fetch" title="View this project on NPM"><img src="https://img.shields.io/npm/v/cache-fetch.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/cache-fetch" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/cache-fetch.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/RemeJuan/cache-fetch" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/RemeJuan/cache-fetch.svg" alt="Dependency Status" /></a></span>

<!-- /BADGES -->


## Installation

```
yarn add cached-fetch

or

npm install cached-fetch
```

## Usage

```javascript
import cacheFetch from 'cache-fetch';

...
/**
* Cached fetch wrapper/helper
* @param {string} url URL being fetched
* @param {*} options fetch options
* @param {number} expiry time in seconds for caching, default = 300 (5 minutes)
*/
const url = 'API PATH';
const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
};

const response = cacheFetch(url, options);
// or
const response = cacheFetch(url, options, 600);

return response.json();
...
```

## Offline handling (Great for PWA's)

Assuming the API call has been made already and your application has been setup for offline usage, you can use this helper to retrieve the saved data instead of using the `cacheFetch` which will invalidate if cache time has elapsed.

```javascript
import cacheFetch, { offlineResponse } from 'cache-fetch';

/* Will need proper implimentation based on application setup */
let online = true;
window.addEventListener('online', () => online = true);
window.addEventListener('offline', () => online = false);
...
/**
* Cached fetch wrapper/helper
* @param {string} url URL being fetched
* @param {*} options fetch options
* @param {number} expiry time in seconds for caching, default = 300 (5 minutes)
*/
const url = 'API PATH';
const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
};

const response = online ? cacheFetch(url, options) : offlineResponse(url);
// or
const response = online ? cacheFetch(url, options, 600) : offlineResponse(url);

return response.json();
...
```

<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/RemeJuan/cache-fetch/releases">Discover the release history by heading on over to the releases page.</a>

<!-- /HISTORY -->


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; 2018+ <a href="reme.lehane@gmail.com) (https://www.remelehane.me">Reme Le Hane</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
