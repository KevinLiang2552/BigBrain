/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */

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
}
