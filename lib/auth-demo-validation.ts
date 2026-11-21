export interface SignupValidationInput {
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export interface SignupValidationErrors {
  password?: string;
  agreeTerms?: string;
}

export function validateSignupDemo({
  password,
  confirmPassword,
  agreeTerms,
}: SignupValidationInput): SignupValidationErrors {
  const errors: SignupValidationErrors = {};

  if (password !== confirmPassword) {
    errors.password = 'The sample passwords must match.';
  }

  if (!agreeTerms) {
    errors.agreeTerms = 'Agree to the terms to test this demonstration form.';
  }

  return errors;
}

export function hasValidationErrors(errors: SignupValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
