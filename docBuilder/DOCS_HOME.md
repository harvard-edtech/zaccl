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

You can include credentials inline:

```ts
import initZoomAPI from 'zaccl';

const api = initZoomAPI({
  zoomHost: 'harvard.zoom.us',
  accountId: 'asd8049jtaihdf8',
  clientId: 'adsna803948jr089j23t8sdfiu7',
  clientSecret: '138fh8w7erik0a9g8d0f9ahs87ert872ye9rhuhaskudhf',
});
```
You can also include credentials by putting them in environment variables: `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, and `ZOOM_CLIENT_SECRET`. These credentials are all credentials that can be found when creating and registering a private Zoom OAuth Server-to-Server app in the Zoom Marketplace.

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
