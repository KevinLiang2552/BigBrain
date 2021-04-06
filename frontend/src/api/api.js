/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */

import { getAuthToken } from '../helpers/user';

const getJSON = (path, options) =>
  fetch(path, options)
    .then((res) =>
      res.json().then((data) => ({ data: data, status: res.status })),
    )
    .catch((err) => console.warn(`API_ERROR: ${err.message}`));

export default class API {
  /** @param {String} url */
  constructor(url) {
    this.url = url;
  }

  // Request (login/register) that requires no auth token
  // If u have a better way of doing this im all ears.
  nonAuthorisedRequest(method, path, payload) {
    const options = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    return getJSON(`${this.url}/${path}`, options);
  }

  authorisedRequest(method, path, payload) {
    if (getAuthToken() === '') return;
    const options = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getAuthToken(),
      },
      body: JSON.stringify(payload),
    };
    return getJSON(`${this.url}/${path}`, options);
  }
}
