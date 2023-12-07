import { FieldErrors, FieldName, FieldPath, FieldValues, RegisterOptions } from "react-hook-form"

export const passwordPattern = "(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).{8,}"

export const getValidationErrorText = (fieldName: string, errors: FieldErrors<FieldValues>): string | undefined => {
  if (errors[fieldName]) {
    return errors[fieldName]?.message?.toString()
  }
}

export const hasError = (fieldName: string, errors: FieldErrors<FieldValues>): boolean => {
  return !!errors[fieldName]
}

export const errorMessages = {
  requiredField: 'Este campo no puede estar vacío',
  invalidFormat: 'Este format es inválido',
  passwordMustMatchRequirement: 'Debe contener un mínimo de 8 caracteres con una combinación de mayúsculas, minúsculas y caracteres numéricos.',
}

const requiredFieldValidator = {
  value: true,
  message: 'Este campo no puede estar vacío'
}

export const validatorOptions: Record<string, RegisterOptions<FieldValues, FieldPath<FieldValues>>> = {
  required: {
    required: requiredFieldValidator
  },
  telefono: {
    required: requiredFieldValidator,
    minLength: {
      value: 12,
      message: 'Debe contener al menos 9 dígitos'
    }
  },
  email: {
    required: requiredFieldValidator,
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: errorMessages.invalidFormat,
    }
  },
  password: {
    required: requiredFieldValidator,
    pattern: {
      value: new RegExp(passwordPattern, 'gi'),
      message: errorMessages.passwordMustMatchRequirement,
    }
  }
}