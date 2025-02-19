'use strict';
import TextLintTester from "textlint-tester";
const tester = new TextLintTester();
// rule
const rule = require('../src/use-si-units');
// ruleName, rule, { valid, invalid }
tester.run('use-si-units', rule, {
    valid: [
        'はじめくんは1 m離れた学校に向かいます。',
        '点Pが10000 m/sで移動する。',
        '1 Paは1 kg/(m･s^2)だ。',
        '2 d 5 h 0 min 1 s',
        '$3 - 2 / 2 = 2$',
        '4 and 5'
    ],
    invalid: [
        {
            text: '点Pが10000 m/secで移動する。',
            errors: [
                {
                    message: '「m/sec」には、SI単位系で使用できない文字が含まれています。SI単位系を使用してください。',
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            text: 'はじめくんは1 M離れた学校に向かいます。',
            errors: [
                {
                    message: '「M」には、SI単位系で使用できない文字が含まれています。SI単位系を使用してください。',
                    line: 1,
                    column: 9
                }
            ]
        },
    ]
});

tester.run('use-si-units with options',
{
    rules : [{
        ruleId : 'use-si-units with options',
        rule,
        options : {
            allowedUnits: ['Å'],
            restrictNonSIUnits: true,
        }
    }]
},{
    valid: [
        'はじめくんは1 Å離れた学校に向かいます。',
        '点Pが10000 Å/sで移動する。'
    ],
    invalid: [
        {
            text: '2 d 5 h 0 min 1 s',
            errors: [
                {
                    message: '「d」には、SI単位系で使用できない文字が含まれています。SI単位系を使用してください。',
                    line: 1,
                    column: 3
                },
                {
                    message: '「h」には、SI単位系で使用できない文字が含まれています。SI単位系を使用してください。',
                    line: 1,
                    column: 7
                },
                {
                    message: '「min」には、SI単位系で使用できない文字が含まれています。SI単位系を使用してください。',
                    line: 1,
                    column: 11
                }
            ]
        }
    ]
});

tester.run('the words end with number', rule, {
    valid: [
        '我ら5人合わせて四天王！',
        'The 5 of us together are the Four Heavenly Kings!',
        'ある日、5羽のアヒルが丘を越えて遠くへ出かけていった。',
        '5 little ducks went out one day, over the hill and far away.',
    ],
});
