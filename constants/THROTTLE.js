module.exports = {
  // X-RateLimit-Type header values
  DAILY_LIMIT_HEADER: 'daily-limit',
  RATE_LIMIT_HEADER: 'qps',

  // Miscellaneous constants
  // Milliseconds of backoff after rate-limited request
  BACKOFF_MS: 10,
};
