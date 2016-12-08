'use strict';

const _ = require('lodash');

const model = {
    synonyms: {
        preamble: [
            '',
            'about',
            'are there',
            'tell me about'
        ],

        any: [
            '',
            'any'
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
            template: '${preamble} ${any} ${active} ${warnings} ${in} {County}'
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

    let match = null;

    do {
        match = re.exec(s);

        if (match) {
            expressions.push({
                tag: match[0],
                name: match[1],
                index: match.index
            });
        }
    } while (match);

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
