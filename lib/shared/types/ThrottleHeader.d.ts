/**
 * Throttle limit headers
 * @author Gabe Abrams
 */
declare enum ThrottleHeader {
    DailyLimitHeader = "daily-limit",
    RateLimitHeader = "qps"
}
export default ThrottleHeader;
