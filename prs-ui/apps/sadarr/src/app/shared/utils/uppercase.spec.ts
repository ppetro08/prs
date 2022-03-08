import { capitalizeFirstLetter, stringEqualCaseInsensitive } from './uppercase';

describe('UpperCase', () => {
  describe('capitalizeFirstLetter', () => {
    it('less than an hour', () => {
      expect(capitalizeFirstLetter('test')).toEqual('Test');
    });
  });

  describe('stringEqualCaseInsensitive', () => {
    it('test should equal Test', () => {
      expect(stringEqualCaseInsensitive('test', 'Test'));
    });

    it('Test should equal test', () => {
      expect(stringEqualCaseInsensitive('Test', 'test'));
    });

    it('TeSt should equal tEsT', () => {
      expect(stringEqualCaseInsensitive('TeSt', 'tEsT'));
    });
  });
});
