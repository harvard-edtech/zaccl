# zaccl

The Zoom App Complete Connection Library, a project that handles everything required to build a zoom-integrated app.

## API Usage

To send a request to the Zoom API (v2), you need to have a developer key and secret. You'll use those when making calls to the API.

### 1. Import

```js
const visitZoomEndpoint = require('zaccl/api');

// or using es6 imports

import visitZoomEndpoint from 'zaccl/api';
```

### 2. Visit an endpoint

Arguments:

| Name | Type | Description | Default/Required |
| :--- | :--- | :--- | :--- |
| path | string | path of the url to hit | Required |
| key | string | developer key | Required |
| secret | string | developer secret | Required |
| method | string | https request type | GET |
| params | object | request parameters | none |

Example:

```js
// Create a meeting
const meetings = await visitZoomEndpoint({
  path: '/users/508329/meetings',
  method: 'POST',
  key: '38al...',
  secret: 'fj23...',
  params: {
    topic: 'My Zoom Room',
    start_time: '2021-05-12T11:50:15Z',
    ...
  },
});
```
