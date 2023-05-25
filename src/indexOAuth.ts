import axios from "axios";
/*
curl -X POST https://harvard.zoom.us/oauth/token -d 'grant_type=account_credentials' -d 'account_id=VfsiVqQ5SkSTLV_kGX5lcQ' -H 'Host: harvard.zoom.us' -H 'Authorization: Basic cUU0SmZtREVTRWFSZERtdVFVc2dnQToyOG1Nc0tzZXRMU2VwcU94M0NmZXQ3S01Rc21GZFB2cQ=='
*/
// curl -X POST https://zoom.us/oauth/token -d 'grant_type=account_credentials' -d 'account_id=VfsiVqQ5SkSTLV_kGX5lcQ' -H 'Host: harvard.zoom.us' -H 'Authorization: Basic Base64Encoded(clientId:28mMsKsetLSepqOx3Cfet7KMQsmFdPvq)'

(async () => {
  
  console.log(accessToken, expiryTimestamp, expiryTimestamp - Date.now());
  
  // const res = await sendRequest({
  //   host: 'zoom.us',
  //   path: '/oauth/token',
  //   method: 'POST',
  //   headers: {
  //     Host: 'zoom.us',
  //     Authorization: `Basic ${Buffer.from('qE4JfmDESEaRdDmuQUsggA:28mMsKsetLSepqOx3Cfet7KMQsmFdPvq').toString('base64')}`,
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   params: {
  //     grant_type: 'account_credentials',
  //     account_id: 'VfsiVqQ5SkSTLV_kGX5lcQ',
  //   },
  // });
  console.log(res.status);
})();