'use strict';

const _fetch = require('node-fetch');
const _passthrough = value => value;

function JsonService({
    fetch = _fetch,
    parse = _passthrough
}) {
    this._fetch = fetch;
    this._parse = parse;
}

JsonService.prototype.get = function get(url) {
    const promise = new Promise((resolve, reject) => {
        this._fetch(url)
            .then(response => response.json())
            .then(response => this._parse(response))
            .then(resolve)
            .catch(error => reject(error));
    });

    return promise;
};

module.exports = JsonService;
