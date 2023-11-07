"use strict";
// Highest error: ZAC21
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode;
(function (ErrorCode) {
    // Network errors
    ErrorCode["NetworkError"] = "ZAC1";
    ErrorCode["UnknownNetworkError"] = "ZAC2";
    // Endpoint errors
    ErrorCode["EndpointCallExcludedRequiredParam"] = "ZAC3";
    ErrorCode["EndpointBindError"] = "ZAC4";
    ErrorCode["DailyLimitError"] = "ZAC7";
    ErrorCode["RateLimitError"] = "ZAC16";
    ErrorCode["PollInfoMalformed"] = "ZAC21";
    // Processing errors
    ErrorCode["PostProcessingError"] = "ZAC5";
    ErrorCode["DuplicateRuleError"] = "ZAC9";
    ErrorCode["ThrottleRuleParamError"] = "ZAC12";
    ErrorCode["UnknownLimitError"] = "ZAC15";
    // Argument errors
    ErrorCode["InvalidMeetingId"] = "ZAC10";
    ErrorCode["InvalidDateFormat"] = "ZAC8";
    ErrorCode["InvalidQueryParam"] = "ZAC11";
    // Other errors
    ErrorCode["UnknownError"] = "ZAC6";
    ErrorCode["ProgrammerError"] = "ZAC13";
    ErrorCode["InvalidPageSize"] = "ZAC17";
    // Account errors
    ErrorCode["NotAddedBecauseDeactivated"] = "ZAC14";
    // Initialization Errors
    ErrorCode["CredentialsNotIncluded"] = "ZAC18";
    // OAuth Errors
    ErrorCode["FailedToGetAccessToken"] = "ZAC19";
    ErrorCode["WrongZoomAPIConfig"] = "ZAC20";
})(ErrorCode || (ErrorCode = {}));
exports.default = ErrorCode;
//# sourceMappingURL=ErrorCode.js.map