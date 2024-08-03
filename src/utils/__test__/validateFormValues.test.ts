import {
  isValidUsername,
  isValidEmail,
  isValidPassword,
  isOver18,
  validateInput
} from '../validateFormValues'; // replace with actual file path

describe('Validation Functions', () => {
  it('should validate username correctly', () => {
    expect(isValidUsername('test')).toBe(false);
    expect(isValidUsername('testing')).toBe(true);
  });

  it('should validate email correctly', () => {
    expect(isValidEmail('test')).toBe(false);
    expect(isValidEmail('test@gmail.com')).toBe(true);
  });

  it('should validate password correctly', () => {
    expect(isValidPassword('test')).toBe(false);
    expect(isValidPassword('testing')).toBe(true);
  });

  it('should validate if user is over 18 correctly', () => {
    expect(isOver18('2010-01-01')).toBe(false);
    expect(isOver18('2000-01-01')).toBe(true);
  });

  it('should validate registration form values correctly', () => {
    expect(validateInput('username', '')).toBe('Username is required.');
    expect(validateInput('email', '')).toBe('Email is required.');
    expect(validateInput('password', '')).toBe('Password is required.');
    expect(validateInput('dateOfBirth', '')).toBe('Date of birth is required.');
  });

  it('should validate sign in input correctly', () => {
    expect(validateInput('usernameOrEmail', '')).toBe('Username or Email is required.');
    expect(validateInput('usernameOrEmail', 'test@gmail')).toBe('Email format is incorrect.');
    expect(validateInput('password', '')).toBe('Password is required.');
    expect(validateInput('password', 'test')).toBe('Password should be at least 6 characters.');
  });
});
