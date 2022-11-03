// Import shared types
import ZoomMeetingOrWebinarType from './ZoomMeetingOrWebinarType';
import ZoomRecurrenceInfo from './ZoomRecurrenceInfo';

/**
 * Zoom meeting object
 * @author Gabe Abrams
 */
type ZoomMeeting = (
  {
    // The ID of the user who scheduled this meeting on behalf of the host.
    assistant_id?: string,
    // Email address of the meeting host.
    host_email: string,
    // ID of the user who is set as host of meeting.
    host_id: string,
    // Meeting ID: Unique identifier of the meeting in "long" format
    // (represented as int64 data type in JSON), also known as the meeting number.
    id: number,
    // Unique meeting ID.Each meeting instance will generate its own Meeting UUID
    // (i.e., after a meeting ends, a new UUID will be generated for the next
    // instance of the meeting). You can retrieve a list of UUIDs from past
    // meeting instances using the List past meeting instances API.
    // Please double encode your UUID when using it for API calls if the UUID
    // begins with a / or contains // in it.
    uuid: string,
    // Meeting description. The length of agenda gets truncated to 250 characters when you list all meetings for a user. To view the complete agenda of a meeting, retrieve details for a single meeting, use the Get a meeting API.
    agenda: string,
    // Time of creation. ISO 8601
    created_at: string,
    // Meeting duration
    duration: number,
    // Encrypted passcode for third party endpoints(H323 / SIP).
    encrypted_password: string,
    // H.323 / SIP room system passcode.
    h323_password: string,
    // URL using which participants can join a meeting.
    join_url: string,
    // Meeting start time in GMT/UTC. Start time will not be returned if the
    // meeting is an instant meeting.
    start_time: string,
    // The start_url of a Meeting is a URL using which a host or an
    // alternative host can start the Meeting.
    // The expiration time for the start_url field listed in the response of
    // the Create a meeting API is two hours for all regular users.
    // For users created using the custCreate option via the Create users API,
    // the expiration time of the start_url field is 90 days.
    // For security reasons, to retrieve the updated value for the start_url
    // field programmatically (after the expiry time), you must call the
    // ** Get a meeting API and refer to the value of the start_url field in
    // the response.
    // This URL should only be used by the host of the meeting and should not
    // be shared with anyone other than the host of the meeting as anyone with
    // this URL will be able to login to the Zoom Client as the host of the
    // meeting.
    start_url: string,
    // Meeting status
    status: ('waiting' | 'started'),
    // Timezone to format the meeting start time on the
    timezone: string,
    // Meeting topic.
    topic: string,
    // Tracking fields
    tracking_fields?: {
      // Label of the tracking field.
      field: string,
      // Value for the field.
      value: string,
      // Indicates whether the tracking field is visible in the meeting
      // scheduling options in the Zoom Web Portal or not.
      // true: Tracking field is visible.
      // false: Tracking field is not visible to the users when they look at
      // the meeting details in the Zoom Web Portal but the field was used
      // while scheduling this meeting via API. An invisible tracking field
      // can be used by users while scheduling meetings via API only.
      visible: boolean,
    }[],
    // Occurrences (only for recurring meetings)
    occurrences?: {
      // Duration.
      duration: number,
      // Occurrence ID: Unique Identifier that identifies an occurrence of a
      // recurring meeting
      occurrence_id: number,
      // Start time
      start_time: string,
      // Occurrence status.
      status: string,
    }[],
    // Meeting passcode
    password: string,
    // Personal Meeting ID (PMI). Only used for scheduled meetings and recurring
    // meetings with no fixed time.
    pmi?: string,
    // Whether the prescheduled meeting was created via the GSuite app.
    // This only supports the meeting type value of 2 (scheduled meetings) and 3
    // (recurring meetings with no fixed time):
    pre_schedule?: boolean,
    // Meeting settings
    settings: {
      // Allow attendees to join the meeting from multiple devices.
      // This setting only works for meetings that require registration.
      allow_multiple_devices?: boolean,
      // A semicolon-separated list of the meeting's alternative hosts'
      // email addresses or IDs.
      alternative_hosts: string,
      // Flag to determine whether to send email notifications to alternative
      // hosts, default value is true.
      alternative_hosts_email_notification?: boolean,
      // Whether the Allow alternative hosts to add or edit polls feature is
      // enabled.
      // This requires Zoom version 5.8.0 or higher.
      alternative_host_update_polls?: boolean,
      // Enable registration and set approval for the registration.
      // Note that this feature requires the host to be of Licensed user type.
      // Registration cannot be enabled for a basic user. 
      approval_type?: (0 | 1 | 2),
      // Approve or block users from specific regions/countries from joining
      // this meeting.
      approved_or_denied_countries_or_regions?: {
        // List of countries/regions from where participants can join this
        // meeting.
        approved_list: string[],
        // List of countries/regions from where participants can not join this meeting.
        denied_list: string[],
        // true: Setting enabled to either allow users or block users from
        // specific regions to join your meetings. 
        // false: Setting disabled.
        enable: boolean,
        // Specify whether to allow users from specific regions to join this
        // meeting; or block users from specific regions from joining this
        // meeting. 
        // approve: Allow users from specific regions/countries to join this
        // meeting. If this setting is selected, the approved regions/countries
        // must be included in the approved_list.
        // deny: Block users from specific regions/countries from joining this
        // meeting. If this setting is selected, the approved regions/countries
        // must be included in the denied_list
        method: ('approve' | 'deny'),
      },
      // Determine how participants can join the audio portion of the meeting.
      audio?: ('both' | 'telephony' | 'voip'),
      // If user has configured "Sign Into Zoom with Specified Domains" option,
      // this will list the domains that are authenticated.
      authentication_domains?: string,
      // The participants added here will receive unique meeting invite links
      // and bypass authentication.
      authentication_exception?: {
        // Email address of the participant.
        email: string,
        // Name of the participant.
        name: string,
        // URL for participants to join the meeting
        join_url: string,
      }[],
      // Authentication name set in the authentication profile.
      authentication_name?: string,
      // Meeting authentication option id.
      authentication_option?: string,
      // Automatic recording:
      auto_recording?: ('local' | 'cloud' | 'none'),
      // Breakout rooms (for pre-assigning breakout rooms)
      breakout_room?: {
        // If true, enable pre-assign
        enable: boolean,
        // Rooms
        rooms: {
          // Name of the breakout room.
          name: string,
          // Email addresses of the participants who are to be assigned to the
          // breakout room.
          participants: string[],
        }[],
      },
      // Indicates the type of calendar integration used to schedule the
      // meeting:
      // 1 — Zoom Outlook add-in
      // 2 — Zoom for Google Workspace add-on
      // Works with the private_meeting field to determine whether to share
      // details of meetings or not.
      calendar_type?: (1 | 2),
      // Close registration after event date
      close_registration?: boolean,
      // Contact email for registration
      contact_email?: string,
      // Contact name for registration
      contact_name?: string,
      // Custom keys and values assigned to the meeting. (max 10)
      custom_keys?: {
        // Custom key associated with the user. (max 64 chars)
        key: string,
        // Value of the custom key associated with the user. (max 256 chars)
        value: string,
      }[],
      // Whether to send email notifications to alternative hosts and users with
      // scheduling privileges. This value defaults to true.
      email_notification?: boolean,
      // Choose between enhanced encryption and end-to-end encryption when
      // starting or a meeting. When using end-to-end encryption,
      // several features (e.g. cloud recording, phone/SIP/H.323 dial-in) will
      // be automatically disabled. 
      // The value of this field can be one of the following:
      // enhanced_encryption: Enhanced encryption. Encryption is stored in the
      // cloud if you enable this option. 
      // e2ee: End-to-end encryption. The encryption key is stored in your local
      // device and can not be obtained by anyone else. Enabling this setting
      // also disables the following features: join before host,
      // cloud recording, streaming, live transcription, breakout rooms,
      // polling, 1:1 private chat, and meeting reactions.
      encryption_type?: ('e2ee' | 'enhanced_encryption'),
      // Whether the Focus Mode feature is enabled when the meeting starts.
      focus_mode?: boolean,
      // List of global dial-in countries
      global_dial_in_countries?: string[],
      global_dial_in_numbers?: {
        // City of the number, if any. For example, Chicago.
        city: string,
        // Country code. For example, BR.
        country: string,
        // Full name of country. For example, Brazil.
        country_name: string,
        // Phone number. For example, +1 2332357613.
        number: string,
        // Type of number
        type: ('toll' | 'tollfree'),
      }[],
      // Start video when the host joins the meeting.
      host_video?: boolean,
      // If the value of "join_before_host" field is set to true,
      // this field can be used to indicate time limits within which a
      // participant may join a meeting before a host.
      // The value of this field can be one of the following:
      // 0: Allow participant to join anytime.
      // 5: Allow participant to join 5 minutes before meeting start time.
      // 10: Allow participant to join 10 minutes before meeting start time.
      jbh_time?: (0 | 5 | 10),
      // Allow participants to join the meeting before the host starts the
      // meeting. Only used for scheduled or recurring meetings.
      join_before_host?: boolean,
      // The meeting's language interpretation settings.
      // Make sure to add the language in the web portal in order to use it
      // in the API. See link for details.
      // Note: This feature is only available for certain Meeting add-on,
      // Education, and Business and higher plans.If this feature is not
      // enabled on the host's account, this setting will not be applied to
      // the meeting.
      language_interpretation?: {
        enable: boolean,
        interpreters: {
          // The interpreter's email address.
          email: string,
          // A comma-separated list of the interpreter's languages.
          // The string must contain two country IDs.
          // For example, if the interpreter will translate from English to
          // Chinese, then this value will be "US, CN"
          languages: string,
        }[],
      },
      // If true, only authenticated users can join meetings.
      meeting_authentication?: boolean,
      // Mute participants upon entry.
      mute_upon_entry?: boolean,
      // Start video when participants join the meeting.
      participant_video?: boolean,
      // Whether the meeting is set as private.
      private_meeting?: boolean,
      // Whether to send registrants an email confirmation:
      // true — Send a confirmation email.
      // false — Do not send a confirmation email.
      registrants_confirmation_email?: boolean,
      // Whether to send registrants email notifications about
      // their registration approval, cancellation, or rejection:
      // true — Send an email notification.
      // false — Do not send an email notification.
      // Set this value to true to also use the registrants_confirmation_email
      // parameter.
      registrants_email_notification?: boolean,
      // Registration type. Used for recurring meeting with fixed time only. 
      // 1 Attendees register once and can attend any of the occurrences.
      // 2 Attendees need to register for each occurrence to attend.
      // 3 Attendees register once and can choose one or more occurrences to attend.
      registration_type?: (1 | 2 | 3),
      // Show social share buttons on the meeting registration page.
      // This setting only works for meetings that require registration.
      show_share_button?: boolean,
      // Use a Personal Meeting ID (PMI). Only used for scheduled meetings and
      // recurring meetings with no fixed time.
      use_pmi?: boolean,
      // Enable waiting room
      waiting_room?: boolean,
      // Add watermark when viewing a shared screen.
      watermark?: boolean,
      // Whether the Allow host to save video order feature is enabled.
      host_save_video_order?: boolean,
    },
  } & (
    | {
      // Meeting type
      type: ZoomMeetingOrWebinarType.RecurringMeetingFixedTime,
      // Recurrence (only for meetings where type is recurring fixed time)
      recurrence: ZoomRecurrenceInfo,
    }
    | {
      // Meeting type
      type: (
        | ZoomMeetingOrWebinarType.InstantMeeting
        | ZoomMeetingOrWebinarType.ScheduledMeeting
        | ZoomMeetingOrWebinarType.RecurringMeetingNoFixedTime
        | ZoomMeetingOrWebinarType.PersonalAudioConference
      ),
    }
  )
);

export default ZoomMeeting;
