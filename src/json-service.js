'use strict';

const _fetch = require('node-fetch');
const _passthrough = value => value;

function JsonService({
    url,
    fetch = _fetch,
    parse = _passthrough
}) {
    this._url = url,
    this._fetch = fetch;
    this._parse = parse;
}

JsonService.prototype.get = function (
    resolve = _passthrough,
    reject
) {
    const promise = this._fetch(this._url)
        .then(response => response.json())
        .then(response => this._parse(response))
        .then(resolve)
        // .catch(error => reject(error));

    return promise;
};

module.exports = JsonService;
