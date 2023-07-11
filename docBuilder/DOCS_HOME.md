# The Zoom API, but simpler and more powerful

This project is designed _by_ educators _for_ educators.

<h1 style="display: flex; align-items: center;">
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-right: 10px;">
  </div>
  <div>
    Quickstart
  </div>
  <div style="flex-grow: 1; height: 1px; background: #ccc; margin-left: 10px;">
  </div>
</h1>

## 1. Create an "api" instance

Independently of the type of credentials you're using, you should include a Zoom hostname as env `ZOOM_HOST` or within the initialization function:

```ts
import initZoomAPI from 'zaccl';

const api = initZoomAPI({
  zoomHost: 'harvard.zoom.us',
  ...
});
```

If using a valid Zoom token, either include it in env as `ZOOM_TOKEN` or include it when initializing:

```ts
import initZoomAPI from 'zaccl';

const api = initZoomAPI({
  token: '<tokenHere>',
});
```

If using a JWT token, either include the key and secret as env variables `ZOOM_KEY` and `ZOOM_SECRET` or include them when initializing:

```ts
import initZoomAPI from 'zaccl';

const api = initZoomAPI({
  key: '<keyHere>',
  secret: '<secretHere>',
});
```

If using server-to-server OAuth, either include the clientId, clientSecret, and accountId as env variables `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`, and `ZOOM_ACCOUNT_ID` or include them when initializing:

```ts
import initZoomAPI from 'zaccl';

const api = initZoomAPI({
  zoomHost: 'harvard.zoom.us',
  accountId: '<accountId>',
  clientId: '<clientId>',
  clientSecret: '<clientSecret>',
});
```

## 2. Call an endpoint function

All endpoint functions are asynchronous, so we recommend using async/await syntax:

```ts
const submissions = await api.meeting.create({
  userId: 'someone@example.edu',
  meetingObj: {
    ...
  },
});
```
