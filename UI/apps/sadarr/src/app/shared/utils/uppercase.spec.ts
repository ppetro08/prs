import {
  capitalizeFirstLetter,
  equalCaseInsensitive,
} from './string-extensions';

describe('UpperCase', () => {
  describe('capitalizeFirstLetter', () => {
    it('less than an hour', () => {
      expect(capitalizeFirstLetter('test')).toEqual('Test');
    });
  });

  describe('equalCaseInsensitive', () => {
    it('test should equal Test', () => {
      expect(equalCaseInsensitive('test', 'Test'));
    });

    it('Test should equal test', () => {
      expect(equalCaseInsensitive('Test', 'test'));
    });

    it('TeSt should equal tEsT', () => {
      expect(equalCaseInsensitive('TeSt', 'tEsT'));
    });
  });
});
