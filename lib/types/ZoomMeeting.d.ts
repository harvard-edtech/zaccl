import ZoomMeetingOrWebinarType from './ZoomMeetingOrWebinarType';
import ZoomRecurrenceInfo from './ZoomRecurrenceInfo';
/**
 * Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/meetings}
 * @author Gabe Abrams
 */
declare type ZoomMeeting = ({
    assistant_id?: string;
    host_email: string;
    host_id: string;
    id: number;
    uuid: string;
    agenda: string;
    created_at: string;
    duration: number;
    encrypted_password: string;
    h323_password: string;
    join_url: string;
    start_time: string;
    start_url: string;
    status: ('waiting' | 'started');
    timezone: string;
    topic: string;
    tracking_fields?: {
        field: string;
        value: string;
        visible: boolean;
    }[];
    occurrences?: {
        duration: number;
        occurrence_id: number;
        start_time: string;
        status: string;
    }[];
    password: string;
    pmi?: string;
    pre_schedule?: boolean;
    settings: {
        allow_multiple_devices?: boolean;
        alternative_hosts: string;
        alternative_hosts_email_notification?: boolean;
        alternative_host_update_polls?: boolean;
        approval_type?: (0 | 1 | 2);
        approved_or_denied_countries_or_regions?: {
            approved_list: string[];
            denied_list: string[];
            enable: boolean;
            method: ('approve' | 'deny');
        };
        audio?: ('both' | 'telephony' | 'voip');
        authentication_domains?: string;
        authentication_exception?: {
            email: string;
            name: string;
            join_url: string;
        }[];
        authentication_name?: string;
        authentication_option?: string;
        auto_recording?: ('local' | 'cloud' | 'none');
        breakout_room?: {
            enable: boolean;
            rooms: {
                name: string;
                participants: string[];
            }[];
        };
        calendar_type?: (1 | 2);
        close_registration?: boolean;
        contact_email?: string;
        contact_name?: string;
        custom_keys?: {
            key: string;
            value: string;
        }[];
        email_notification?: boolean;
        encryption_type?: ('e2ee' | 'enhanced_encryption');
        focus_mode?: boolean;
        global_dial_in_countries?: string[];
        global_dial_in_numbers?: {
            city: string;
            country: string;
            country_name: string;
            number: string;
            type: ('toll' | 'tollfree');
        }[];
        host_video?: boolean;
        jbh_time?: (0 | 5 | 10);
        join_before_host?: boolean;
        language_interpretation?: {
            enable: boolean;
            interpreters: {
                email: string;
                languages: string;
            }[];
        };
        meeting_authentication?: boolean;
        mute_upon_entry?: boolean;
        participant_video?: boolean;
        private_meeting?: boolean;
        registrants_confirmation_email?: boolean;
        registrants_email_notification?: boolean;
        registration_type?: (1 | 2 | 3);
        show_share_button?: boolean;
        use_pmi?: boolean;
        waiting_room?: boolean;
        watermark?: boolean;
        host_save_video_order?: boolean;
    };
} & ({
    type: ZoomMeetingOrWebinarType.RecurringMeetingFixedTime;
    recurrence: ZoomRecurrenceInfo;
} | {
    type: (ZoomMeetingOrWebinarType.InstantMeeting | ZoomMeetingOrWebinarType.ScheduledMeeting | ZoomMeetingOrWebinarType.RecurringMeetingNoFixedTime | ZoomMeetingOrWebinarType.PersonalAudioConference);
}));
export default ZoomMeeting;
