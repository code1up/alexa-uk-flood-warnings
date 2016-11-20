const _ = require('lodash');

function FloodAlertParser() {
}

FloodAlertParser.prototype.parse = function (response) {
    if (response.items.length === 0) {
        return [];
    }

    const all = _.reduce(response.items, function (result, item) {
        const riversOrSeas = item.floodArea.riverOrSea.split(', ');

        Array.prototype.push.apply(result, riversOrSeas);

        return result;
    }, []);

    const sorted = _.sortBy(all);
    const unique = _.sortedUniq(sorted);

    return unique;
};

module.exports = FloodAlertParser;
