import url from 'url';

/**
 * Return base url.
 *
 * @param req
 * @returns {url}
 */
export function getBaseUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.baseUrl
  });
}
