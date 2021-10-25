"use strict";

const { expect } = require("chai");
const { createSandbox } = require("sinon");

const execute = require("../index");

/**
 * environmentjs Function unit tests.
 */
describe("Unit Tests", () => {
  let sandbox;
  let mockContext;
  let mockLogger;

  beforeEach(() => {
    mockContext = {
      logger: { info: () => {} }
    };

    mockLogger = mockContext.logger;
    sandbox = createSandbox();

    sandbox.stub(mockLogger, "info");
  });

  afterEach(() => {
    sandbox.restore();
  });
});
