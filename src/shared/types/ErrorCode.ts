// Highest error: ZAC17

enum ErrorCode {
  // Network errors
  NetworkError = 'ZAC1',
  UnknownNetworkError = 'ZAC2',

  // Endpoint errors
  EndpointCallExcludedRequiredParam = 'ZAC3',
  EndpointBindError = 'ZAC4',
  DailyLimitError = 'ZAC7',
  RateLimitError = 'ZAC16',

  // Processing errors
  PostProcessingError = 'ZAC5',
  DuplicateRuleError = 'ZAC9',
  ThrottleRuleParamError = 'ZAC12',
  UnknownLimitError = 'ZAC15',

  // Argument errors
  InvalidMeetingId = 'ZAC10',
  InvalidDateFormat = 'ZAC8',
  InvalidQueryParam = 'ZAC11',

  // Other errors
  UnknownError = 'ZAC6',
  ProgrammerError = 'ZAC13',
  InvalidPageSize = 'ZAC17',

  // Account errors
  NotAddedBecauseDeactivated = 'ZAC14',
}

export default ErrorCode;
