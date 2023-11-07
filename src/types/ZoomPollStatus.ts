/**
 * Current state of a poll
 * @author Yuen Ler Chow
 */
enum ZoomPollStatus {
  // Poll has not started
  NotStart = 'NotStart',
  // Poll has started
  Started = 'Started',
  // Poll has ended
  Ended = 'Ended',
  // Host is sharing results
  Sharing = 'Sharing'
}

export default ZoomPollStatus;
