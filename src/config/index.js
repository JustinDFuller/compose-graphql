export default (...any) => ({
  ...any,
  env: JSON.parse(JSON.stringify(process.env)),
});
