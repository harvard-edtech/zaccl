module.exports = [
  // Cloud Recording endpoint rules
  {
    template: '/meetings/{meetingId}/recordings',
    method: 'GET',
    maxRequestsPerSecond: 80,
  },
  {
    template: '/users/{userId}/recordings',
    method: 'GET',
    maxRequestsPerSecond: 60,
  },
  // Meeting endpoint rules
  {
    template: '/meetings/{meetingId}',
    method: 'GET',
    maxRequestsPerSecond: 80,
  },
  {
    template: '/users/{userId}/meetings',
    method: 'POST',
    maxRequestsPerSecond: 60,
  },
  {
    template: '/meetings/{meetingId}',
    method: 'PATCH',
    maxRequestsPerSecond: 80,
  },
  {
    template: '/meetings/{meetingId}',
    method: 'DELETE',
    maxRequestsPerSecond: 80,
  },
  {
    template: '/past_meetings/{meetingId}/instances',
    method: 'GET',
    maxRequestsPerSecond: 60,
  },
  // User endpoint rules
  {
    template: '/users/{userId}/token',
    method: 'GET',
    maxRequestsPerSecond: 80,
  },
]
