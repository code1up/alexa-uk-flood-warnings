'use strict';

const _ = require('lodash');

const model = {
    synonyms: {
        ask: [
            '',
            'about',
            'are there',
            'tell me about',
            'tell me'
        ],

        any: [
            '',
            'any',
            'some',
            'all'
        ],

        active: [
            '',
            'active',
            'current',
            'live'
        ],

        warnings: [
            '',
            'alerts',
            'floods',
            'warnings'
        ],

        in: [
            '',
            'for',
            'in'
        ]
    },

    intents: [
        {
            name: 'FloodMonitorIntent',
            template: '${ask} ${any} ${active} ${warnings} ${in} {County}'
        }
    ]
};

// CREDIT: https://gist.github.com/ChrisJefferson/cb8db2a4c67a9506c56c
function product() {
    return _.reduce(arguments, function (a, b) {
        return _.flatten(_.map(a, function (j) {
            return _.map(b, function (k) {
                return j.concat([k]);
            });
        }));
    }, [[]]);
}

function getExpressions(s) {
    let expressions = [];

    const re = /\$\{\s*(\w+)\s*\}/g;

    let m = null;

    do {
        m = re.exec(s);

        if (m) {
            expressions.push({
                tag: m[0],
                name: m[1],
                index: m.index
            });
        }
    } while (m);

    return expressions;
}

const keys = _.sortBy(Object.keys(model.synonyms));

const arrays = _.reduce(keys, (result, key) => {
    result.push(model.synonyms[key]);

    return result;
}, []);

const combinations = {
    keys: keys,
    product: product.apply(null, arrays)
};

// TODO: not very functional
_.forEach(model.intents, intent => {
    const expressions = getExpressions(intent.template);

    _.forEach(combinations.product, combination => {
        let utterance = `${intent.name} ${intent.template}`;

        _.forEach(expressions, expression => {
            const i = combinations.keys.indexOf(expression.name);

            utterance = utterance.replace(expression.tag, combination[i]);
        });

        utterance = utterance
            .replace(/\s{2,}/g, ' ')
            .trim();

        console.log(utterance);
    });

    /*
    _.forEach(expressions, expression => {
        _.forEach(model.synonyms[expression.name], synonym => {
            utterance = utterance.replace(expression.tag, synonym);
            
            console.log(expression.name);
        });
    });
    */
});
