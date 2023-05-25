/**
 * Configuration description for Zoom API
 * @author Gabe Abrams
 */
type ZoomAPIConfig = {
  // Host to send requests to
  zoomHost: string,
  // AccountId for the Server-to-Server OAuth Zoom App
  accountId: string,
  // ClientId for the Server-to-Server OAuth Zoom App
  clientId: string,
  // ClientSecret for the Server-to-Server OAuth Zoom App
  clientSecret: string,
};

export default ZoomAPIConfig;
