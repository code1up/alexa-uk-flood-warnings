'use strict';

const _fetch = require('node-fetch');
const _passthrough = value => value;

function JsonService(options) {
    options = options || {};

    this._fetch = options.fetch || _fetch;
    this._parse = options.parse || _passthrough;
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
