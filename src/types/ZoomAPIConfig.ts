/**
 * Configuration description for Zoom API
 * @author Gabe Abrams
 */
type ZoomAPIConfig = (
  // Credentials
  (
    // Key and secret
    | {
      key: string,
      secret: string
    }
    // OR token
    | {
      token: string,
    }
  ) & {
    // Hostname of the Zoom host to connect with
    zoomHost?: string,
  }
);

export default ZoomAPIConfig;
