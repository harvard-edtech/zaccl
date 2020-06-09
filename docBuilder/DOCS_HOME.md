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

## 1. Create an `api` instance

```js
const API = require('zaccl/API');

const api = new API({
  key: '348AJ9...',
  secret: 'NM9UO1..',
});
```

## 2. Call an endpoint function

All endpoint functions are asynchronous, so we recommend using async/await syntax:

```js
const submissions = await api.meeting.create({
  userId: 'someone@example.edu',
  meetingObj: {
    ...
  },
});
```
