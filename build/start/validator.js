"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
Validator_1.validator.rule('statusEnum', (value, _, options) => {
    if (typeof value !== 'string') {
        return;
    }
    if (value !== 'publish' && value !== 'draft') {
        options.errorReporter.report(options.pointer, 'statusEnum', 'statusEnum validation failed', options.arrayExpressionPointer);
    }
});
//# sourceMappingURL=validator.js.map