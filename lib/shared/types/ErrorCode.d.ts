declare enum ErrorCode {
    NetworkError = "ZAC1",
    UnknownNetworkError = "ZAC2",
    EndpointCallExcludedRequiredParam = "ZAC3",
    EndpointBindError = "ZAC4",
    DailyLimitError = "ZAC7",
    RateLimitError = "ZAC16",
    PollInfoMalformed = "ZAC21",
    PostProcessingError = "ZAC5",
    DuplicateRuleError = "ZAC9",
    ThrottleRuleParamError = "ZAC12",
    UnknownLimitError = "ZAC15",
    InvalidMeetingId = "ZAC10",
    InvalidDateFormat = "ZAC8",
    InvalidQueryParam = "ZAC11",
    UnknownError = "ZAC6",
    ProgrammerError = "ZAC13",
    InvalidPageSize = "ZAC17",
    NotAddedBecauseDeactivated = "ZAC14",
    CredentialsNotIncluded = "ZAC18",
    FailedToGetAccessToken = "ZAC19",
    WrongZoomAPIConfig = "ZAC20"
}
export default ErrorCode;
