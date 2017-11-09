import App from './../public/components/App';

export default ({ dependencies }) => async (req, res, next, websockets) => {
  const { fs, path, React, ReactDOMServer } = dependencies;
  const index = await fs.readFileAsync(path.join(__dirname, '../public/index.html'), 'utf8');
  const html = ReactDOMServer.renderToString(<App />);
  const document = index.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`);
  res.send(document);
};