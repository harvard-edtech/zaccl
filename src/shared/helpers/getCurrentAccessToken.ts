// Import axios
import axios from 'axios';

// Import shared classes
import Mutex from '../classes/Mutex';
import ZACCLError from '../classes/ZACCLError';

// Import shared types
import ErrorCode from '../types/ErrorCode';

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
 * @returns access token that's currently valid
 */
const getCurrentAccessToken = async () => {
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
        url: 'https://zoom.us/oauth/token?grant_type=account_credentials&account_id=VfsiVqQ5SkSTLV_kGX5lcQ',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from('qE4JfmDESEaRdDmuQUsggA:28mMsKsetLSepqOx3Cfet7KMQsmFdPvq').toString('base64')}`,
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

export default getCurrentAccessToken;
