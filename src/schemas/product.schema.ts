import * as yup from 'yup'

export const RegisterSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup
    .number()
    .required()
    .positive()
    .test(
      'is-decimal',
      'The price should be a decimal with maximum two digits after comma',
      (val: any) => {
        return /^\d+(\.\d{0,2})?$/.test(val)
      },
    )
    .required(),
})

yup.addMethod(yup.object, 'atLeastOneOf', function (list) {
  return this.test({
    name: 'atLeastOneOf',
    message:
      'At least one field name or price is necessary in the body of your requisition',
    exclusive: true,
    params: { keys: list.join(', ') },
    test: (value) =>
      value == null || list.some((f) => value[f] != null && value[f] !== ''),
  })
})

export const UpdateSchema = yup
  .object()
  .shape({
    name: yup.string(),
    price: yup
      .number()
      .positive()
      .test(
        'is-decimal',
        'The price should be a decimal with maximum two digits after comma',
        (val: any) => {
          return /^\d+(\.\d{0,2})?$/.test(val)
        },
      ),
  })
  .atLeastOneOf(['name', 'price'])
