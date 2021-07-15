export type ValidatorType = (value: string | undefined) => string | undefined

export const required: ValidatorType = (value) => {
    if (!value) return 'Field is required!'
    return undefined
}

const _maxLengthValidateCreator = (maxLength: number): ValidatorType => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols!`
    return undefined
}

export const urlValidator: ValidatorType = (value) => {
    if (value) {
        if (!isValidURL(value)) {
            return 'Enter correct address'
        }
    }
    return undefined
}

export const inputMaxLengthValidate = _maxLengthValidateCreator(25)
export const textAreaMaxLengthValidate = _maxLengthValidateCreator(300)

function isValidURL(str: string) {
    const res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    return (res !== null)
}