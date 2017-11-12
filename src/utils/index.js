import _ from 'lodash';
import fp from 'lodash/fp';
import Promise from 'bluebird';

const mergeFreeze = fp.compose(
  Object.freeze,
  _.merge,
);

/**
 * reduceRight will work the same as fp.compose (right to left).
 * The result of each function will be merged with the result of the next.
 * So each function doesn't have to worry about modifying or adding the lasts result.
 */
export const callAndCombine = (initialValue, fns) => Promise.reduce(
  fns.slice().reverse(),
  (sum, fn) => Promise.resolve(fn(sum)).then(_.partial(mergeFreeze, {}, sum)),
  initialValue,
);

export default callAndCombine;
