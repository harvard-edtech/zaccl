import ZoomRecurrenceInfo from './ZoomRecurrenceInfo';
/**
 * Zoom webinar object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/webinars}
 * @author Gabe Abrams
 */
type ZoomWebinar = {
    host_email: string;
    host_id: string;
    id: number;
    uuid: string;
    agenda: string;
    created_at: string;
    duration: number;
    join_url: string;
    occurrences?: {
        duration: number;
        occurrence_id: string;
        start_time: string;
        status: string;
    }[];
    password: string;
    recurrence?: ZoomRecurrenceInfo;
    settings: {
        allow_multiple_devices?: boolean;
        alternative_hosts?: string;
        alternative_host_update_polls?: boolean;
        approval_type?: (0 | 1 | 2);
        attendees_and_panelists_reminder_email_notification?: {
            enable: boolean;
            type: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7);
        };
        audio: ('both' | 'telephony' | 'voip');
        authentication_domains?: string;
        authentication_name?: string;
        authentication_option?: string;
        auto_recording: ('none' | 'local' | 'cloud');
        contact_email?: string;
        contact_name?: string;
        email_language: ('en-US' | 'de-DE' | 'es-ES' | 'fr-FR' | 'jp-JP' | 'pt-PT' | 'ru-RU' | 'zh-CN' | 'zh-TW' | 'ko-KO' | 'it-IT' | 'vi-VN');
        follow_up_absentees_email_notification?: {
            enable: boolean;
            type: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7);
        };
    };
};
export default ZoomWebinar;
