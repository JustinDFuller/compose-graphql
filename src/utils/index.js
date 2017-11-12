import _ from 'lodash';
import fp from 'lodash/fp';

const mergeFreeze = fp.compose(
  Object.freeze,
  _.merge,
);

const accumulator = (method, app) => Promise.resolve(app).then(res => mergeFreeze(
  {},
  res,
  method(res),
));

/**
 * reduceRight will work the same as fp.compose (right to left).
 * The result of each function will be merged with the result of the next.
 * So each function doesn't have to worry about modifying or adding the lasts result.
 */
export const callAndCombine = fp.reduceRight(accumulator);
