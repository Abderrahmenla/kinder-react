export interface VerificationFormState {
  firstName: string;
  lastName: string;
  country?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode?: string;
}

export interface ErrorResponse {
  errorMessage: string;
}
