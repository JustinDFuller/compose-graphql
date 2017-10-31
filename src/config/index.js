export default () => ({
  env: JSON.parse(JSON.stringify(process.env)),
});
