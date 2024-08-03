/**
 * @module Altenar - Holds all mocks related to the script.
 *
 * Still WIP!
 */

export const mockAltenarInitFunction = jest.fn();
export const mockAltenarAddWidget = jest.fn();
export const addAltenarSportsBook = jest.fn();

global.window.altenarWSDK = {
  init: mockAltenarInitFunction,
  addWidget: mockAltenarAddWidget,
  addSportsBook: addAltenarSportsBook
};
