// Import axios
import axios from 'axios';

// Import shared classes
import Mutex from '../classes/Mutex';
import ZACCLError from '../classes/ZACCLError';

// Import shared types
import ErrorCode from '../types/ErrorCode';
import ZoomAPIConfig from '../../types/ZoomAPIConfig';
import ZoomAPIConfigType from '../../types/ZoomAPIConfigType';

/*------------------------------------------------------------------------*/
/* ---------------------------- Static State ---------------------------- */
/*------------------------------------------------------------------------*/

// Current cached access token
let accessToken: string | null = null;

// Timestamp of when the current access token expires
let expiryTimestamp = 0;

// Mutex to lock when modifying access token
const accessTokenMutex = new Mutex();

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// Buffer time (how long before the token expires should we refresh it)
const BUFFER_TIME_MS = 15 * 60 * 1000;

/*------------------------------------------------------------------------*/
/* -------------------------------- Main -------------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Get a current Zoom access token
 * @author Gabe Abrams
 * @param zoomAPIConfig the original config for the Zoom API
 * @returns access token that's currently valid
 */
const getCurrentOAuthAccessToken = async (zoomAPIConfig: ZoomAPIConfig) => {
  // Throw error if wrong type of config
  if (zoomAPIConfig.type !== ZoomAPIConfigType.OAuth) {
    throw new ZACCLError({
      message: 'Wrong Zoom API config: must be OAuth in order to get current access token',
      code: ErrorCode.WrongZoomAPIConfig,
    });
  }

  // Lock mutex
  const unlock = await accessTokenMutex.lock();

  // Refresh token if necessary
  try {
    // Check if we need to refresh the token
    if (
      // Token has never been cached
      !accessToken
      // Token has expired
      || (Date.now() + BUFFER_TIME_MS > expiryTimestamp)
    ) {
      // Token is expired, refresh it
      const res = await axios({
        method: 'POST',
        url: `https://${zoomAPIConfig.zoomHost}/oauth/token?grant_type=account_credentials&account_id=${zoomAPIConfig.accountId}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${zoomAPIConfig.clientId}:${zoomAPIConfig.clientSecret}`).toString('base64')}`,
        },
      });
      accessToken = res.data.access_token;
      expiryTimestamp = (
        // Current timestamp
        Date.now()
        // + lifespan
        + (res.data.expires_in * 1000)
        // - five minutes of buffer time
        - (5 * 60 * 1000)
      );
    }
  } catch (err) {
    throw new ZACCLError({
      message: 'Failed to get access token',
      code: ErrorCode.FailedToGetAccessToken,
    });
  } finally {
    // Unlock mutex
    unlock();
  }

  // Make sure we have an access token
  if (!accessToken) {
    throw new ZACCLError({
      message: 'Failed to get access token',
      code: ErrorCode.FailedToGetAccessToken,
    });
  }

  // Return the access token
  return accessToken;
};

export default getCurrentOAuthAccessToken;
