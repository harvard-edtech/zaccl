/**
 * Type of config (based on type of credentials)
 * @author Gabe Abrams
 */
enum ZoomAPIConfigType {
  // ZACCL generates its own tokens via JWT
  JWT = 'JWT',
  // User provides a token OR this is the Harvard Apigee token
  Token = 'Token',
  // User provides OAuth credentials
  OAuth = 'OAuth',
}

export default ZoomAPIConfigType;
