module.exports = {
  // X-RateLimit-Type header values
  DAILY_LIMIT_HEADER: 'Daily-limit',
  RATE_LIMIT_HEADER: 'QPS',

  // Miscellaneous constants
  // Milliseconds of backoff after rate-limited request
  BACKOFF_MS: 10,
};
