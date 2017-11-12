export default (url, options) => fetch(url, {
  credentials: 'include',
  ...options,
});
