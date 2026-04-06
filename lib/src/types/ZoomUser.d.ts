import ZoomLoginMethod from './ZoomLoginMethod';
/**
 * Zoom user object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/users}
 * @author Gabe Abrams
 */
type ZoomUser = {
    id: string;
    created_at: string;
    dept?: string;
    email: string;
    first_name: string;
    last_name: string;
    last_client_version?: string;
    last_login_time?: string;
    pmi: number;
    role_name: string;
    timezone: string;
    type: (1 | 2 | 3);
    use_pmi: boolean;
    account_id: string;
    account_number: number;
    cms_user_id?: string;
    company: string;
    custom_attributes: {
        key: string;
        name: string;
        value: string;
    }[];
    employee_unique_id?: string;
    group_ids?: string[];
    im_group_ids?: string[];
    jid?: any;
    job_title?: string;
    language: string;
    location?: string;
    login_types: ZoomLoginMethod[];
    manager?: string;
    personal_meeting_url: string;
    phone_numbers?: {
        code: string;
        country: string;
        label: ('Mobile' | 'Office' | 'Home' | 'Fax');
        number: string;
        verified: boolean;
    }[];
    pic_url?: string;
    pronouns?: string;
    pronouns_option?: (1 | 2 | 3);
    role_id?: string;
    status: ('pending' | 'active' | 'inactive');
    vanity_url?: string;
    verified: (0 | 1);
    cluster: string;
};
export default ZoomUser;
