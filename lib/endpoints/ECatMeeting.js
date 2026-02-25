"use strict";
/**
 * Category of endpoints for Zoom meetings
 * @author Gabe Abrams
 * @author Aryan Pandey
 * @namespace api.meeting
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared interfaces
var EndpointCategory_1 = __importDefault(require("../shared/interfaces/EndpointCategory"));
// Import shared classes
var ZACCLError_1 = __importDefault(require("../shared/classes/ZACCLError"));
var ErrorCode_1 = __importDefault(require("../shared/types/ErrorCode"));
var ZoomPollQuestionAndAnswerType_1 = __importDefault(require("../types/ZoomPollQuestionAndAnswerType"));
var ZoomPollType_1 = __importDefault(require("../types/ZoomPollType"));
var ZoomPollStatus_1 = __importDefault(require("../types/ZoomPollStatus"));
var ECatMeeting = /** @class */ (function (_super) {
    __extends(ECatMeeting, _super);
    function ECatMeeting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get info on a meeting (Light)
     * @author Gabe Abrams
     * @author Aryan Pandey
     * @instance
     * @memberof api.meeting
     * @method get
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom ID of the meeting
     * @param [opts.occurrenceId] ID for the meeting occurrence
     * @param [opts.showAllOccurrences=false] if truthy,
     *   retrieves all past occurrences
     * @returns Zoom meeting object
     */
    ECatMeeting.prototype.get = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    show_previous_occurrences: !!opts.showAllOccurrences,
                };
                // Add optional param if exists
                if (opts.occurrenceId) {
                    params.occurrence_id = opts.occurrenceId;
                }
                // Send request
                return [2 /*return*/, this.visitEndpoint({
                        path: "/meetings/".concat(opts.meetingId),
                        action: 'get info on a meeting',
                        method: 'GET',
                        params: params,
                        errorMap: {
                            400: {
                                1010: 'The Zoom user could not be found on this account',
                                3000: 'We could not access webinar info',
                            },
                            404: {
                                1001: 'We could not find the meeting because the Zoom user does not exist',
                                3001: "Meeting ".concat(opts.meetingId, " could not be found or has expired"),
                            },
                        },
                    })];
            });
        });
    };
    /**
     * Create a new meeting (Light)
     * @author Gabe Abrams
     * @author Aryan Pandey
     * @instance
     * @memberof api.meeting
     * @method create
     * @param opts object containing all arguments
     * @param opts.userId the user ID or email address of the user
     * @param opts.meetingObj Zoom meeting object with meeting details {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body}}
     * @returns Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body}}
     */
    ECatMeeting.prototype.create = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/users/".concat(opts.userId, "/meetings"),
                        action: 'create a new meeting',
                        method: 'POST',
                        params: opts.meetingObj,
                        errorMap: {
                            300: "User ".concat(opts.userId, " has reached the maximum limit for creating and updating meetings"),
                            404: {
                                1001: "User ".concat(opts.userId, " either does not exist or does not belong to this account"),
                            },
                        },
                    })];
            });
        });
    };
    /**
     * Update a meeting (Light)
     * @author Gabe Abrams
     * @author Aryan Pandey
     * @instance
     * @memberof api.meeting
     * @method update
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom ID of the meeting
     * @param opts.meetingObj Zoom meeting object with updated details {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingupdate#request-body}
     * @param [opts.occurrenceId] ID for the meeting occurrence
     * @returns Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body}}
     */
    ECatMeeting.prototype.update = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: (opts.occurrenceId
                            ? "/meetings/".concat(opts.meetingId, "?occurrence_id=").concat(opts.occurrenceId)
                            : "/meetings/".concat(opts.meetingId)),
                        action: 'update the details of a meeting',
                        method: 'PATCH',
                        params: opts.meetingObj,
                        errorMap: {
                            300: 'We cannot create or update any more meetings today. Please try again tomorrow',
                            400: {
                                1010: 'We could not find the Zoom user on this account',
                                3000: 'We could not access meeting information',
                                3003: "You cannot update the meeting ".concat(opts.meetingId, " since you are not the meeting host"),
                            },
                            404: {
                                1001: 'We could not update the meeting because the user does not exist',
                                3001: "A meeting with the ID ".concat(opts.meetingId, " could not be found or has expired"),
                            },
                        },
                    })];
            });
        });
    };
    /**
     * Delete a meeting (Light)
     * @author Gabe Abrams
     * @author Aryan Pandey
     * @instance
     * @memberof api.meeting
     * @method delete
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom ID of the meeting
     * @param [opts.occurrenceId] ID for the meeting occurrence
     * @param [opts.notifyHosts=false] if truthy,
     *   sends cancellation email to hosts
     * @returns Zoom meeting object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body}}
     */
    ECatMeeting.prototype.delete = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    schedule_for_reminder: !!opts.notifyHosts,
                };
                // Add optional param if exists
                if (opts.occurrenceId) {
                    params.occurrence_id = opts.occurrenceId;
                }
                // Send request
                return [2 /*return*/, this.visitEndpoint({
                        path: "/meetings/".concat(opts.meetingId),
                        action: 'delete a meeting',
                        method: 'DELETE',
                        params: params,
                        errorMap: {
                            400: {
                                1010: "We could not delete meeting ".concat(opts.meetingId, " because the user does not belong to this account"),
                                3000: "We could not access meeting information for meeting ".concat(opts.meetingId),
                                3002: "We could not delete the meeting ".concat(opts.meetingId, " since it is still in progress"),
                                3003: "You cannot delete the meeting ".concat(opts.meetingId, " since you are not the meeting host"),
                                3007: "You cannot delete the meeting ".concat(opts.meetingId, " since it has already ended"),
                                3018: 'You are not allowed to delete your Personal Meeting ID',
                                3037: 'You are not allowed to delete a Personal Meeting Conference',
                            },
                            404: {
                                1001: "We could not delete the meeting ".concat(opts.meetingId, " because the user does not exist"),
                                3001: "A meeting with the ID ".concat(opts.meetingId, " could not be found or has expired"),
                            },
                        },
                    })];
            });
        });
    };
    /**
     * Get a list of ended meeting instances (Medium)
     * @author Gabe Abrams
     * @author Aryan Pandey
     * @instance
     * @memberof api.meeting
     * @method listPastInstances
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom ID of the meeting
     * @returns list of ended meeting instances {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/pastmeetings#responses}
     */
    ECatMeeting.prototype.listPastInstances = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/past_meetings/".concat(opts.meetingId, "/instances"),
                        action: 'get the list of ended meeting instances',
                        method: 'GET',
                        errorMap: {
                            404: "We could not find a meeting with the ID ".concat(opts.meetingId),
                        },
                        itemKey: 'meetings',
                    })];
            });
        });
    };
    /**
     * Get details of a past meeting instance (Light)
     * @author Yuen Ler Chow
     * @instance
     * @memberof api.meeting
     * @method getPastMeetingDetails
     * @param uuid the Zoom UUID of the meeting
     * @returns details of a past meeting instance
     */
    ECatMeeting.prototype.getPastMeetingDetails = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/past_meetings/".concat(opts.uuid),
                        action: 'get the details of a past meeting instance',
                        method: 'GET',
                        errorMap: {
                            400: {
                                1010: 'User does not exist or does not belong to this account',
                                300: 'We could not access the details of this past meeting.',
                                200: 'You need a paid account to access details of a past meeting.',
                                12702: 'You are not allowed to access information about meetings that occurred more than 1 year ago.',
                            },
                            404: {
                                3001: 'The meeting ID is invalid or the meeting has not ended.',
                            }
                        },
                    })];
            });
        });
    };
    /**
     * List past poll occurrences (Medium)
     * @author Yuen Ler Chow
     * @instance
     * @memberof api.meeting
     * @method listPastPollOccurrences
     * @param opts.uuid the Zoom UUID of the meeting
     * @returns list of past poll occurrences
     */
    ECatMeeting.prototype.listPastPollOccurrences = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var response, pollIdToOccurrenceMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            path: "/past_meetings/".concat(opts.uuid, "/polls"),
                            action: 'get the list of polls that occurred in a past meeting',
                            method: 'GET',
                            errorMap: {
                                400: 'We could not access the poll data for this meeting.',
                                12702: 'You are not allowed to access information about meetings that occurred more than 1 year ago.',
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        pollIdToOccurrenceMap = {};
                        // Process each poll response
                        response.questions.forEach(function (user) {
                            var email = user.email, name = user.name, questionDetails = user.question_details;
                            // Loop through each answer
                            questionDetails.forEach(function (questionDetail) {
                                var dateTime = questionDetail.date_time, pollId = questionDetail.polling_id, question = questionDetail.question;
                                // Parse answer
                                var answer = ((!questionDetail.answer
                                    || String(questionDetail.answer.trim()).length === 0)
                                    ? [] // no answer, return empty array
                                    : (String(questionDetail.answer)
                                        .split(';')
                                        .map(function (a) {
                                        return a.trim();
                                    })));
                                // Parse date time as ms since epoch
                                // dateTime is a YYYY-MM-DD HH:MM:SS string in UTC time, but not
                                // formatted correctly. Fix formatting before parsing:
                                var pollTime = new Date("".concat(dateTime, " UTC")).getTime();
                                // Reformat as a response object
                                var response = {
                                    userFullName: name,
                                    userEmail: email,
                                    answer: answer,
                                    timestamp: pollTime,
                                };
                                // If poll occurrence isn't in the map, add it.
                                if (!pollIdToOccurrenceMap[pollId]) {
                                    pollIdToOccurrenceMap[pollId] = {
                                        pollId: pollId,
                                        timestamp: pollTime,
                                        questions: [
                                            {
                                                prompt: question,
                                                responses: [response],
                                            },
                                        ]
                                    };
                                }
                                else {
                                    // Poll occurrence is in the map
                                    var questionIndex = (pollIdToOccurrenceMap[pollId]
                                        .questions
                                        .findIndex(function (q) {
                                        return (q.prompt === question);
                                    }));
                                    // Check if the question inside the poll is in the map
                                    if (questionIndex !== -1) {
                                        // Poll and question exist. Add response to existing question
                                        pollIdToOccurrenceMap[pollId]
                                            .questions[questionIndex]
                                            .responses
                                            .push(response);
                                    }
                                    else {
                                        // Poll is there but question is not. Add prompt and response
                                        pollIdToOccurrenceMap[pollId].questions.push({
                                            prompt: question,
                                            responses: [response],
                                        });
                                    }
                                    // Update timestamp if the new timestamp is earlier
                                    if (pollTime < pollIdToOccurrenceMap[pollId].timestamp) {
                                        pollIdToOccurrenceMap[pollId].timestamp = pollTime;
                                    }
                                }
                            });
                        });
                        // Flatten map into an array
                        return [2 /*return*/, Object.values(pollIdToOccurrenceMap)];
                }
            });
        });
    };
    /**
     * Get poll info (Light)
     * @author Yuen Ler Chow
     * @instance
     * @memberof api.meeting
     * @method getPollInfo
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom ID of the meeting
     * @param opts.pollId the id of the poll
     * @returns object with all info about the poll
     */
    ECatMeeting.prototype.getPollInfo = function (opts) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var response, pollInfo;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.visitEndpoint({
                            path: "/meetings/".concat(opts.meetingId, "/polls/").concat(opts.pollId),
                            action: 'get the poll info',
                            method: 'GET',
                            errorMap: {
                                4400: 'Meeting polls are disabled on your account.',
                                3161: 'Meeting hosting and scheduling capabilities are not allowed for your user account.',
                                404: 'We could not find the poll.',
                            },
                        })];
                    case 1:
                        response = _d.sent();
                        try {
                            pollInfo = {
                                // Add the poll id
                                pollId: response.id,
                                // Convert string status to enum
                                pollStatus: ((_a = {
                                    notstart: ZoomPollStatus_1.default.NotStart,
                                    started: ZoomPollStatus_1.default.Started,
                                    sharing: ZoomPollStatus_1.default.Sharing,
                                    ended: ZoomPollStatus_1.default.Ended,
                                }[response.status]) !== null && _a !== void 0 ? _a : ZoomPollStatus_1.default.NotStart),
                                // Check if poll is anonymous
                                anonymous: !!response.anonymous,
                                // Convert string type to enum
                                pollType: ((_b = {
                                    1: ZoomPollType_1.default.Poll,
                                    2: ZoomPollType_1.default.AdvancedPoll,
                                    3: ZoomPollType_1.default.Quiz,
                                }[response.type]) !== null && _b !== void 0 ? _b : ZoomPollType_1.default.Poll),
                                // Add the title
                                title: response.title,
                                // Parse and format questions
                                questions: response.questions.map(function (question) {
                                    // Destructure and convert variables to camelCase
                                    var answerRequired = question.answer_required, answers = question.answers, name = question.name, rightAnswers = question.right_answers, questionType = question.type, caseSensitive = question.case_sensitive, answerMinCharacters = question.answer_min_character, answerMaxCharacters = question.answer_max_character, ratingMaxLabel = question.rating_max_label, ratingMaxValue = question.rating_max_value, ratingMinLabel = question.rating_min_label, ratingMinValue = question.rating_min_value, showAsDropdown = question.show_as_dropdown;
                                    // Set of fields that are common to all question types
                                    var commonFields = {
                                        answerRequired: !!answerRequired,
                                        // trim each answer
                                        answers: ((answers && Array.isArray(answers) && answers.length > 0)
                                            ? answers.map(function (answer) {
                                                return answer.trim();
                                            })
                                            : []),
                                        name: name,
                                        rightAnswers: rightAnswers,
                                    };
                                    // Add in question type-specific fields
                                    if (questionType === 'single'
                                        || questionType === 'multiple') {
                                        return __assign({ questionAnswerType: (questionType === 'single'
                                                ? ZoomPollQuestionAndAnswerType_1.default.SingleChoice
                                                : ZoomPollQuestionAndAnswerType_1.default.MultipleChoice), showAsDropdown: !!showAsDropdown }, commonFields);
                                    }
                                    if (questionType === 'short_answer'
                                        || questionType === 'long_answer') {
                                        return __assign({ questionAnswerType: (questionType === 'short_answer'
                                                ? ZoomPollQuestionAndAnswerType_1.default.ShortAnswer
                                                : ZoomPollQuestionAndAnswerType_1.default.LongAnswer), answerMinCharacters: Number.parseInt(answerMinCharacters, 10), answerMaxCharacters: Number.parseInt(answerMaxCharacters, 10) }, commonFields);
                                    }
                                    if (questionType === 'fill_in_the_blank') {
                                        return __assign({ questionAnswerType: ZoomPollQuestionAndAnswerType_1.default.FillInTheBlank, caseSensitive: caseSensitive }, commonFields);
                                    }
                                    if (questionType === 'rating_scale') {
                                        return __assign({ questionAnswerType: ZoomPollQuestionAndAnswerType_1.default.RatingScale, ratingMaxLabel: ratingMaxLabel, ratingMaxValue: ratingMaxValue, ratingMinLabel: ratingMinLabel, ratingMinValue: ratingMinValue }, commonFields);
                                    }
                                    // None of the supported question types. Only return common fields
                                    return __assign({ questionAnswerType: ZoomPollQuestionAndAnswerType_1.default.Unknown }, commonFields);
                                }),
                            };
                            return [2 /*return*/, pollInfo];
                        }
                        catch (err) {
                            throw new ZACCLError_1.default({
                                message: "We encountered an error while parsing Zoom poll information: ".concat((_c = err.message) !== null && _c !== void 0 ? _c : 'unknown error'),
                                code: ErrorCode_1.default.PollInfoMalformed,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Add one alt-host if not already in the list. If another user in the alt-host
     *   list has been deactivated, all alt-hosts are removed and the requested
     *   user is added as the only alt-host. This is because Zoom doesn't give us
     *   enough information to determine which user is deactivated, and thus,
     *   the only way to resolve the issue is to remove all previously existing
     *   alt-hosts. (Light)
     * @author Gabe Abrams
     * @author Aryan Pandey
     * @instance
     * @memberof api.meeting
     * @method addAltHost
     * @param opts object containing all arguments
     * @param opts.meetingId the id for the meeting to add hosts to
     * @param opts.altHost the email or id of the alt host to
     *   be added
     * @param [opts.meetingObj] Zoom meeting object that needs to be
     *   updated. Meeting ID is not used to fetch meeting if this object is passed
     * @returns updated meeting object after adding alternative host
     */
    ECatMeeting.prototype.addAltHost = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var meetingId, altHost, meetingObj, altHosts, err_1, someUserHasBeenDeactivated, deactivatedUserIsCurrentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        meetingId = opts.meetingId, altHost = opts.altHost;
                        meetingObj = opts.meetingObj;
                        if (!!meetingObj) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.api.meeting.get({ meetingId: meetingId })];
                    case 1:
                        meetingObj = _a.sent();
                        _a.label = 2;
                    case 2:
                        altHosts = (meetingObj.settings.alternative_hosts
                            // Split into individual hosts
                            .split(',')
                            // Remove whitespace around hosts
                            .map(function (host) {
                            return host.trim();
                        }));
                        if (!(altHosts.indexOf(altHost) < 0)) return [3 /*break*/, 8];
                        altHosts.push(altHost);
                        meetingObj.settings.alternative_hosts = altHosts.join(',');
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 8]);
                        return [4 /*yield*/, this.api.meeting.update({ meetingId: meetingId, meetingObj: meetingObj })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        err_1 = _a.sent();
                        someUserHasBeenDeactivated = (err_1.code === 'ZOOM400-1115');
                        deactivatedUserIsCurrentUser = (err_1.message.toLowerCase().includes(altHost.toLowerCase()));
                        if (!someUserHasBeenDeactivated) return [3 /*break*/, 7];
                        if (deactivatedUserIsCurrentUser) {
                            // Cannot add as alt host because the user is deactivated
                            throw new ZACCLError_1.default({
                                message: "We could not add \"".concat(altHost, "\" to the list of alt-hosts for this meeting because that account has been deactivated."),
                                code: ErrorCode_1.default.NotAddedBecauseDeactivated,
                            });
                        }
                        // Someone else on the list has been deactivated
                        // Wipe the list and try again
                        meetingObj.settings.alternative_hosts = altHost;
                        return [4 /*yield*/, this.api.meeting.update({ meetingId: meetingId, meetingObj: meetingObj })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 8];
                    case 8: 
                    // return updated meeting object
                    return [2 /*return*/, meetingObj];
                }
            });
        });
    };
    /**
     * Get meeting transcript (Medium)
     * @author Gabe Abrams
     * @instance
     * @memberof api.meeting
     * @method getTranscript
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom ID of the meeting (or UUID of a past meeting instance)
     * @returns meeting transcript
     */
    ECatMeeting.prototype.getTranscript = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/meetings/".concat(opts.meetingId, "/transcript"),
                        action: 'get the meeting transcript',
                        method: 'GET',
                        errorMap: {
                            400: 'Invalid meeting ID',
                            403: 'You do not have permission to access the transcript for this meeting',
                            404: {
                                3322: 'The meeting transcript does not exist',
                            },
                        },
                    })];
            });
        });
    };
    /**
     * Get list of participants in a past meeting (Medium)
     * @author Gabe Abrams
     * @instance
     * @memberof api.meeting
     * @method listPastMeetingParticipants
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom UUID of the past meeting instance
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns list of past meeting participants
     */
    ECatMeeting.prototype.listPastMeetingParticipants = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/past_meetings/".concat(opts.meetingId, "/participants"),
                        action: 'get the list of participants in a past meeting',
                        method: 'GET',
                        params: {
                            page_size: 300, // max allowed page size
                        },
                        itemKey: 'participants',
                        onNewPage: opts.onNewPage,
                        minMsBetweenPageRequests: opts.minMsBetweenPageRequests,
                        errorMap: {
                            400: {
                                200: 'You need a paid account to access the participant list of a past meeting.',
                                12702: 'You are not allowed to access information about meetings that occurred more than 1 year ago.',
                            },
                            404: {
                                3001: 'The meeting ID is invalid or the meeting has not ended.',
                            },
                        },
                    })];
            });
        });
    };
    /**
     * Get a meeting activities report (Heavy)
     * @author Gabe Abrams
     * @instance
     * @memberof api.meeting
     * @method getActivitiesReport
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom UUID of the meeting
     * @param opts.startTimestamp the start of the time range to get activities for, in ms since epoch
     * @param [opts.endTimestamp] the end of the time range to get activities for, in ms since epoch.
     * If not provided, defaults to startTimestamp + 24 hours
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns list of past meeting participants
     */
    ECatMeeting.prototype.getActivitiesReport = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var meetingId, startTimestamp, endTimestamp, startYear, startMonth, startDay, endYear, endMonth, endDay, from, to;
            return __generator(this, function (_a) {
                meetingId = opts.meetingId, startTimestamp = opts.startTimestamp;
                endTimestamp = (opts.endTimestamp
                    || (startTimestamp + 24 * 60 * 60 * 1000) // default to 24 hours after start time
                );
                startYear = new Date(startTimestamp).getUTCFullYear();
                startMonth = String(new Date(startTimestamp).getUTCMonth() + 1).padStart(2, '0');
                startDay = String(new Date(startTimestamp).getUTCDate()).padStart(2, '0');
                endYear = new Date(endTimestamp).getUTCFullYear();
                endMonth = String(new Date(endTimestamp).getUTCMonth() + 1).padStart(2, '0');
                endDay = String(new Date(endTimestamp).getUTCDate()).padStart(2, '0');
                from = "".concat(startYear, "-").concat(startMonth, "-").concat(startDay);
                to = "".concat(endYear, "-").concat(endMonth, "-").concat(endDay);
                // Call endpoint
                return [2 /*return*/, this.visitEndpoint({
                        path: '/report/meeting_activities',
                        action: 'get a meeting activities report',
                        method: 'GET',
                        params: {
                            page_size: 300,
                            meeting_number: meetingId,
                            from: from,
                            to: to,
                            activity_type: -1, // All Activities
                        },
                        itemKey: 'meeting_activity_logs',
                        onNewPage: opts.onNewPage,
                        minMsBetweenPageRequests: opts.minMsBetweenPageRequests,
                        errorMap: {
                            400: 'Bad request',
                            403: 'Not allowed',
                            404: 'Meeting not found',
                        },
                    })];
            });
        });
    };
    /**
     * Get a participant report for a meeting (Heavy)
     * @author Gabe Abrams
     * @instance
     * @memberof api.meeting
     * @method getParticipantReport
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom UUID of the meeting
     * @param [opts.onNewPage] callback function that is called when a new page of results is received.
     * @param [opts.minMsBetweenPageRequests] minimum time (in ms) to wait between paginated requests,
     * for custom throttle control
     * @returns list of meeting participants with report details
     */
    ECatMeeting.prototype.getParticipantReport = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/report/meetings/".concat(opts.meetingId, "/participants"),
                        action: 'get a participant report for a meeting',
                        method: 'GET',
                        params: {
                            page_size: 300, // max allowed page size
                        },
                        itemKey: 'participants',
                        onNewPage: opts.onNewPage,
                        minMsBetweenPageRequests: opts.minMsBetweenPageRequests,
                        errorMap: {
                            400: {
                                1010: 'User does not exist or does not belong to this account',
                                12702: 'You are not allowed to access information about meetings that occurred more than 1 year ago.',
                                200: 'You do not have the permission create a meeting participants report',
                            },
                            404: {
                                3001: 'The meeting ID is invalid or the meeting has not ended.',
                            },
                        },
                    })];
            });
        });
    };
    /**
     * Get a question and answer report for a meeting (Heavy)
     * @author Gabe Abrams
     * @instance
     * @memberof api.meeting
     * @method getMeetingQAReport
     * @param opts object containing all arguments
     * @param opts.meetingId the Zoom UUID of the meeting
     * @returns list of questions and answers from the meeting
     */
    ECatMeeting.prototype.getQAReport = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.visitEndpoint({
                        path: "/report/meetings/".concat(opts.meetingId, "/qa"),
                        action: 'get a question and answer report for a meeting',
                        method: 'GET',
                        itemKey: 'questions',
                        errorMap: {
                            400: {
                                200: 'You are not allowed to create a meeting question and answer report',
                            },
                            404: {
                                3001: 'The meeting ID is invalid or the meeting has not ended.',
                            },
                        },
                    })];
            });
        });
    };
    return ECatMeeting;
}(EndpointCategory_1.default));
/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/
exports.default = ECatMeeting;
//# sourceMappingURL=ECatMeeting.js.map