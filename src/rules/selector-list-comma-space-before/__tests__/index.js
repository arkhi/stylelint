import testRule from "../../../testUtils/testRule"

import rule, { ruleName, messages } from ".."

testRule(rule, {
  ruleName,
  config: ["always"],

  accept: [ {
    code: "a ,b {}",
  }, {
    code: "a ,b ,c {}",
  }, {
    code: "a , b {}",
  }, {
    code: "a ,\nb {}",
  }, {
    code: "a ,\r\nb {}",
    description: "CRLF",
  }, {
    code: "a ,b[data-foo=\"tr,tr\"] {}",
    description: "string",
  }, {
    code: "a:matches(:hover, :focus) {}",
    description: "comma inside :matches()",
  }, {
    code: ":not(:hover, :focus) {}",
    description: "comma inside :not()",
  } ],

  reject: [ {
    code: "a,b {}",
    message: messages.expectedBefore(),
    line: 1,
    column: 2,
  }, {
    code: "a  ,b {}",
    message: messages.expectedBefore(),
    line: 1,
    column: 4,
  }, {
    code: "a\n,b {}",
    message: messages.expectedBefore(),
    line: 2,
    column: 1,
  }, {
    code: "a\r\n,b {}",
    description: "CRLF",
    message: messages.expectedBefore(),
    line: 2,
    column: 1,
  }, {
    code: "a\t,b {}",
    message: messages.expectedBefore(),
    line: 1,
    column: 3,
  }, {
    code: "a ,b,c {}",
    message: messages.expectedBefore(),
    line: 1,
    column: 5,
  }, {
    code: "a ,b  ,c {}",
    message: messages.expectedBefore(),
    line: 1,
    column: 7,
  } ],
})

testRule(rule, {
  ruleName,
  config: ["never"],

  accept: [ {
    code: "a,b {}",
  }, {
    code: "a,b,c {}",
  }, {
    code: "a, b {}",
  }, {
    code: "a,\nb {}",
  }, {
    code: "a,\r\nb {}",
    description: "CRLF",
  }, {
    code: "a,b[data-foo=\"tr ,tr\"] {}",
    description: "string",
  }, {
    code: "a:matches(:hover , :focus) {}",
    description: "comma inside :matches()",
  }, {
    code: ":not(:hover , :focus) {}",
    description: "comma inside :not()",
  } ],

  reject: [ {
    code: "a ,b {}",
    message: messages.rejectedBefore(),
    line: 1,
    column: 3,
  }, {
    code: "a  ,b {}",
    message: messages.rejectedBefore(),
    line: 1,
    column: 4,
  }, {
    code: "a\n,b {}",
    message: messages.rejectedBefore(),
    line: 2,
    column: 1,
  }, {
    code: "a\r\n,b {}",
    description: "CRLF",
    message: messages.rejectedBefore(),
    line: 2,
    column: 1,
  }, {
    code: "a\t,b {}",
    message: messages.rejectedBefore(),
    line: 1,
    column: 3,
  }, {
    code: "a,b ,c {}",
    message: messages.rejectedBefore(),
    line: 1,
    column: 5,
  }, {
    code: "a,b  ,c {}",
    message: messages.rejectedBefore(),
    line: 1,
    column: 6,
  } ],
})

testRule(rule, {
  ruleName,
  config: ["always-single-line"],

  accept: [ {
    code: "a ,b {}",
  }, {
    code: "a ,b {\n}",
    description: "single-line selector list, multi-line block",
  }, {
    code: "a ,b {\r\n}",
    description: "single-line selector list, multi-line block with CRLF",
  } ],

  reject: [ {
    code: "a,b {}",
    message: messages.expectedBeforeSingleLine(),
    line: 1,
    column: 2,
  }, {
    code: "a,b {\n}",
    message: messages.expectedBeforeSingleLine(),
    line: 1,
    column: 2,
  }, {
    code: "a,b {\r\n}",
    description: "CRLF",
    message: messages.expectedBeforeSingleLine(),
    line: 1,
    column: 2,
  } ],
})

testRule(rule, {
  ruleName,
  config: ["never-single-line"],

  accept: [ {
    code: "a,b {}",
  }, {
    code: "a,b {\n}",
    description: "single-line selector list, multi-line block",
  }, {
    code: "a,b {\r\n}",
    description: "single-line selector list, multi-line block with CRLF",
  } ],

  reject: [ {
    code: "a ,b {}",
    message: messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 3,
  }, {
    code: "a ,b {\n}",
    message: messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 3,
  }, {
    code: "a ,b {\r\n}",
    description: "CRLF",
    message: messages.rejectedBeforeSingleLine(),
    line: 1,
    column: 3,
  } ],
})
