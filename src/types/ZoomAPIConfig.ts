import ZoomAPIConfigType from "./ZoomAPIConfigType";

/**
 * Configuration description for Zoom API
 * @author Gabe Abrams
 */
type ZoomAPIConfig = (
  // Credentials
  (
    // Key and secret
    | {
      type: ZoomAPIConfigType.JWT,
      key: string,
      secret: string
    }
    // OR token
    | {
      type: ZoomAPIConfigType.Token,
      token: string,
    }
    // OR OAuth
    | {
      type: ZoomAPIConfigType.OAuth,
      clientId: string,
      clientSecret: string,
      accountId: string,
    }
  ) & {
    // Hostname of the Zoom host to connect with
    zoomHost: string,
  }
);

export default ZoomAPIConfig;
