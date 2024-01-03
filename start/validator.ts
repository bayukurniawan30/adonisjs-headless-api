import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('statusEnum', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }

  if (value !== 'publish' && value !== 'draft') {
    options.errorReporter.report(
      options.pointer,
      'statusEnum',
      'statusEnum validation failed',
      options.arrayExpressionPointer
    )
  }
})
