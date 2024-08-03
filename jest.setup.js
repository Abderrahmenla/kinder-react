// jest.setup.js
// Configuration and setup for Jest testing framework

// Polyfills and extensions for Jest
import '@testing-library/jest-dom'; // DOM extensions for Jest
import 'jest-canvas-mock'; // Mock canvas for tests involving canvas elements

// Mock server for handling API requests in tests
import { server } from '@/mocks/server';

// Mocks
// Mock useRouter from next/router for all tests
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn()
  })
}));

// Mock for window.matchMedia used in media queries
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

// Lifecycle methods for tests
beforeAll(() => {
  // Start the mock server before all tests
  server.listen();
});

beforeEach(() => {
  // Reset module state before each test
  jest.resetModules();
  jest.clearAllMocks();
});

afterEach(() => {
  // Reset handlers after each test
  server.resetHandlers();
});

afterAll(() => {
  // Clean up mock server after all tests
  server.close();
});
