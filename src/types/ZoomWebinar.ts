// Import shared types
import ZoomRecurrenceInfo from './ZoomRecurrenceInfo';

/**
 * Zoom webinar object
 * @author Gabe Abrams
 */
type ZoomWebinar = {
  // Email address of the meeting host.
  host_email: string,
  // ID of the user set as host of webinar.
  host_id: string,
  // Webinar ID in "long" format (represented as int64 data type in JSON), also
  // known as the webinar number.
  id: number,
  // Unique Webinar ID. Each Webinar instance will generate its own Webinar UUID
  // (i.e., after a Webinar ends, a new UUID will be generated for the next
  // instance of the Webinar). You can retrieve a list of UUIDs from past
  // Webinar instances using the List past webinar instances API. Please double
  // encode your UUID when using it for API calls if the UUID begins with
  // a/or contains // in it.
  uuid: string,
  // Webinar agenda.
  agenda: string,
  // Create time. ISO 8601
  created_at: string,
  // Webinar duration.
  duration: number,
  // URL to join the Webinar. This URL should only be shared with the users who
  // should be invited to the Webinar.
  join_url: string,
  // List of occurrences (only for recurring webinars)
  occurrences?: {
    // Duration
    duration: number,
    // Occurrence ID: Unique Identifier that identifies an occurrence of a
    // recurring webinar. Recurring webinars can have a maximum of 50
    // occurrences.
    occurrence_id: string,
    // Start time. ISO 8601
    start_time: string,
    // Occurrence status.
    status: string,
  }[],
  // Webinar passcode.
  password: string,
  // Recurrence information
  recurrence?: ZoomRecurrenceInfo,
  // Webinar settings
  settings: {
    // Allow attendees to join from multiple devices
    allow_multiple_devices?: boolean,
    // Alternative host emails or IDs. Multiple values separated by comma.
    alternative_hosts?: string,
    // Whether the Allow alternative hosts to add or edit polls feature is
    // enabled. This requires Zoom version 5.8.0 or higher.
    alternative_host_update_polls?: boolean,
    // Registration approval type
    // 0 - Automatically approve.
    // 1 - Manually approve.
    // 2 - No registration required. (default)
    approval_type?: (0 | 1 | 2),
    // Send reminder email to attendees and panelists.
    attendees_and_panelists_reminder_email_notification?: {
      // If true, send reminder email to attendees and panelists.
      enable: boolean,
      // Email notification type
      // 0 - No plan.
      // 1 - Send 1 hour before webinar.
      // 2 - Send 1 day before webinar.
      // 3 - Send 1 hour and 1 day before webinar.
      // 4 - Send 1 week before webinar.
      // 5 - Send 1 hour and 1 week before webinar.
      // 6 - Send 1 day and 1 week before webinar.
      // 7 - Send 1 hour, 1 day and 1 week before webinar.
      type: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7),
    },
    // Determine how participants can join the audio portion of the webinar.
    audio: ('both' | 'telephony' | 'voip'),
    // If user has configured "Sign Into Zoom with Specified Domains" option,
    // this will list the domains that are authenticated.
    authentication_domains?: string,
    // Authentication name set in the authentication profile.
    authentication_name?: string,
    // Webinar authentication option id.
    authentication_option?: string,
    // Automatic recording
    auto_recording: ('none' | 'local' | 'cloud'),
    // Contact email for registration
    contact_email?: string,
    // Contact name for registration
    contact_name?: string,
    // Email language
    email_language: (
      | 'en-US'
      | 'de-DE'
      | 'es-ES'
      | 'fr-FR'
      | 'jp-JP'
      | 'pt-PT'
      | 'ru-RU'
      | 'zh-CN'
      | 'zh-TW'
      | 'ko-KO'
      | 'it-IT'
      | 'vi-VN'
    ),
    // Info on followup email
    follow_up_absentees_email_notification?: {
      // If true, send reminder email to attendees and panelists.
      enable: boolean,
      // Email notification type
      // 0 - No plan.
      // 1 - Send 1 hour before webinar.
      // 2 - Send 1 day before webinar.
      // 3 - Send 1 hour and 1 day before webinar.
      // 4 - Send 1 week before webinar.
      // 5 - Send 1 hour and 1 week before webinar.
      // 6 - Send 1 day and 1 week before webinar.
      // 7 - Send 1 hour, 1 day and 1 week before webinar.
      type: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7),
    },
  },
};

export default ZoomWebinar;
