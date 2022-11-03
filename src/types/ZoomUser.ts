// Import shared types
import ZoomLoginMethod from './ZoomLoginMethod';

/**
 * Zoom user object
 * @author Gabe Abrams
 */
type ZoomUser = {
  // User ID.
  id: string,
  // The date and time at which this user was created.
  created_at: string,
  // User's department
  dept?: string,
  // User's email address.
  email: string,
  // User's first name.
  first_name: string,
  // User's last name.
  last_name: string,
  // User last login client version.
  last_client_version?: string,
  // User last login time.
  last_login_time?: string,
  // Personal Meeting ID (PMI).
  pmi: number,
  // User's role name.
  role_name: string,
  // The time zone of the user.
  timezone: string,
  // User type (1 = basic, 2 = licensed, 3 = on-prem)
  type: (1 | 2 | 3),
  // Displays true if user has enabled a Personal Meeting ID (PMI) for
  // instant meetings, false otherwise.
  use_pmi: boolean,
  // User's account ID.
  account_id: string,
  // The user's account number.
  account_number: number,
  // CMS ID of user, only enabled for Kaltura integration.
  cms_user_id?: string,
  // User's company.
  company: string,
  // Custom attribute(s) that have been assigned to the user.
  custom_attributes: {
    // Identifier for the custom attribute.
    key: string,
    // Name of the custom attribute.
    name: string,
    // Value of the custom attribute.
    value: string,
  }[],
  // The employee's unique ID. This field only returns when:
  // SAML single sign - on(SSO) is enabled.
  // The login_type value is 101(SSO).
  employee_unique_id?: string,
  // IDs of the web groups user belongs to.
  group_ids?: string[],
  // IM IDs of the groups user belongs to.
  im_group_ids?: string[],
  // No idea what this is
  jid?: any,
  // User's job title.
  job_title?: string,
  // Default language for the Zoom Web Portal.
  language: string,
  // User's location.
  location?: string,
  // The user's login method
  login_types: ZoomLoginMethod[],
  // The manager for the user.
  manager?: string,
  // User's personal meeting url.
  personal_meeting_url: string,
  // List of user's phone numbers
  phone_numbers?: {
    // The phone number's country code. For example, for United States phone
    // numbers, this will be a +1 value.
    code: string,
    // The phone number's country ID. For example, if the phone number provided
    // in the number field is a Brazil-based number, this will be the BR value.
    country: string,
    // The phone number's label
    label: ('Mobile' | 'Office' | 'Home' | 'Fax'),
    // The user's phone number
    number: string,
    // Whether Zoom has verified the phone number.
    verified: boolean,
  }[],
  // The URL for user's profile picture.
  pic_url?: string,
  // The user's pronouns.
  pronouns?: string,
  // The user's display pronouns setting:
  // 1 — Ask the user every time they join meetings and webinars.
  // 2 — Always display pronouns in meetings and webinars.
  // 3 — Do not display pronouns in meetings and webinars.
  pronouns_option?: (1 | 2 | 3),
  // Unique identifier of the role assigned to the user.
  role_id?: string,
  // Status of user's account.
  status: ('pending' | 'active' | 'inactive'),
  // Personal meeting room URL, if the user has one.
  vanity_url?: string,
  // Displays whether user is verified or not. 
  // 1 - Account verified.
  // 0 - Account not verified.
  verified: (0 | 1),
  // The user's cluster.
  cluster: string,
};

export default ZoomUser;
