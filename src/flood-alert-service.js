'use strict';

const _fetch = require('node-fetch');
const _passthrough = value => value;

function FloodAlertService({
    fetch = _fetch,
    parse = _passthrough
}) {
    this._fetch = fetch;
    this._parse = parse;
}

// should fetch from URL
// should reject when request error

FloodAlertService.prototype.getFloodAlerts = function (
    resolve = _passthrough,
    reject
) {
    const url = 'https://environment.data.gov.uk/flood-monitoring/id/floods?county=yorkshire';

    const promise = this._fetch(url)
        .then(response => response.json())
        .then(response => this._parse(response))
        .then(resolve)
        // .catch(error => reject(error));
        ;

    return promise;
};

module.exports = FloodAlertService;
