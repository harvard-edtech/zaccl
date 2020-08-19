// Highest error: ZAC14

module.exports = {
  // Network errors
  NETWORK_ERROR: 'ZAC1',
  UNKNOWN_NETWORK_ERROR: 'ZAC2',

  // Endpoint errors
  ENDPOINT_CALL_EXCLUDED_REQUIRED_PARAM: 'ZAC3',
  ENDPOINT_BIND_ERROR: 'ZAC4',
  DAILY_LIMIT_ERROR: 'ZAC7',
  UNKNOWN_LIMIT_ERROR: 'ZAC14',

  // Processing errors
  POST_PROCESSING_ERROR: 'ZAC5',
  DUPLICATE_RULE_ERROR: 'ZAC9',
  THROTTLE_RULE_PARAM_ERROR: 'ZAC12',

  // Argument errors
  INVALID_MEETING_ID: 'ZAC10',
  INVALID_DATE_FORMAT: 'ZAC8',
  INVALID_QUERY_PARAM: 'ZAC11',

  // Other errors
  UNKNOWN_ERROR: 'ZAC6',
  PROGRAMMER_ERROR: 'ZAC13',
};
