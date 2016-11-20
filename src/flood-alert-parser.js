const _ = require('lodash');

function FloodAlertParser() {
}

FloodAlertParser.prototype.parse = function (response) {
    if (response.items.length === 0) {
        return [];
    }

    const allRiversOrSeas = _.reduce(response.items, function (result, item) {
        const riverOrSea = item.floodArea.riverOrSea;
        const riversOrSeas = riverOrSea.split(', ');

        Array.prototype.push.apply(result, riversOrSeas);

        return result;
    }, []);

    const sortedRiversOrSeas = _.sortBy(allRiversOrSeas);
    const uniqueRiversOrSeas = _.sortedUniq(sortedRiversOrSeas);

    return uniqueRiversOrSeas;
};

module.exports = FloodAlertParser;
