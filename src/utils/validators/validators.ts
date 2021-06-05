type ValidatorType = (value: string | undefined) => string | undefined

export const required: ValidatorType = (value) => {
    if (!value) return 'Field is required!'
    return undefined
}

const _maxLengthValidateCreator = (maxLength: number): ValidatorType => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols!`
    return undefined
}

export const inputMaxLengthValidate = _maxLengthValidateCreator(25)
export const textAreaMaxLengthValidate = _maxLengthValidateCreator(300)