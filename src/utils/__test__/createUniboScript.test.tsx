import { createUniboScript } from '@/components/Atoms/UniboOverlay/UniboOverlay.utils';
import {
  UNIBO_SCRIPT_ID,
  UNIBO_SCRIPT_URL
} from '@/components/Atoms/UniboOverlay/UniboOverlay.constants';

describe('createUniboScript function', () => {
  it('should create a script with the correct properties and append it to the body', () => {
    const createElementSpy = jest.spyOn(document, 'createElement');
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');

    createUniboScript();

    expect(createElementSpy).toHaveBeenCalledWith('script');

    const mockScript = createElementSpy.mock.results[0].value as HTMLScriptElement;

    expect(mockScript.src).toBe(UNIBO_SCRIPT_URL);
    expect(mockScript.id).toBe(UNIBO_SCRIPT_ID);
    expect(mockScript.async).toBe(false);
    expect(mockScript.defer).toBe(false);
    expect(appendChildSpy).toHaveBeenCalledWith(mockScript);

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
  });
});
