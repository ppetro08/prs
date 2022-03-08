import { capitalizeFirstLetter } from './uppercase';

describe('UpperCase', () => {
  it('less than an hour', () => {
    expect(capitalizeFirstLetter('test')).toEqual('Test');
  });
});
