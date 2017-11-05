export default ({ server, dependencies }) => ({
  websockets: new dependencies.ws.Server({ server }),
});