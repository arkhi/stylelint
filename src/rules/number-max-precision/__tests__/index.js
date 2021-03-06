import testRule from "../../../testUtils/testRule"

import rule, { ruleName, messages } from ".."

testRule(rule, {
  ruleName,
  config: [2],

  accept: [ {
    code: "a { top: 3px /* 3.12345px */; }",
  }, {
    code: "a::before { content: \"3.12345px\"; }",
  }, {
    code: "a { top: 3%; }",
  }, {
    code: "a { top: 3.1%; }",
  }, {
    code: "a { top: 3.12%; }",
  }, {
    code: "a { padding: 6.1% 3.12%; }",
  }, {
    code: "@media (min-width: 5.12em) {}",
  } ],

  reject: [ {
    code: "a { top: 3.123%; }",
    message: messages.expected(3.123, 2),
    line: 1,
    column: 10,
  }, {
    code: "a { padding: 6.123% 3.1%; }",
    message: messages.expected(6.123, 2),
    line: 1,
    column: 14,
  }, {
    code: "@media (min-width: 5.123em) {}",
    message: messages.expected(5.123, 2),
    line: 1,
    column: 20,
  } ],
})

testRule(rule, {
  ruleName,
  config: [4],

  accept: [ {
    code: "a { top: 3px /* 3.12345px */; }",
  }, {
    code: "a::before { content: \"3.12345px\"; }",
  }, {
    code: "a { top: 3%; }",
  }, {
    code: "a { top: 3.1%; }",
  }, {
    code: "a { top: 3.12%; }",
  }, {
    code: "a { top: 3.123%; }",
  }, {
    code: "a { top: 3.1234%; }",
  }, {
    code: "a { padding: 6.123% 3.1234%; }",
  }, {
    code: "@media (min-width: 5.1234em) {}",
  } ],

  reject: [ {
    code: "a { top: 3.12345%; }",
    message: messages.expected(3.12345, 4),
    line: 1,
    column: 10,
  }, {
    code: "a { padding: 6.12345% 3.1234%; }",
    message: messages.expected(6.12345, 4),
    line: 1,
    column: 14,
  }, {
    code: "@media (min-width: 5.12345em) {}",
    message: messages.expected(5.12345, 4),
    line: 1,
    column: 20,
  } ],
})

testRule(rule, {
  ruleName,
  config: [0],

  accept: [{
    code: "a { top: 3%; }",
  }],

  reject: [{
    code: "a { top: 3.1%; }",
    message: messages.expected(3.1, 0),
    line: 1,
    column: 10,
  }],
})
