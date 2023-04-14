# spa-reauthenticate-poc
Reauthenticate user in a single page application using http only cookie, without requiring browser refresh. A proof of concept.

## Scenario
- You have a Single Page Application.
- You use SSO and HTTP Only Cookies for authentication.
  - SSO involves request redirects (e.g. mydomain.com -> mysso.com -> mydomain.com).
- You want to reauthenticate a user (i.e. refresh cookies) without the user having to reload the entire page. 

This proof of concept aims to solve this problem in a pragmatic (frontend-only) way, 
not involving major changes to backend/architecture.

## Solution 1: Refresh cookies with iframe
- Add a button to the UI.
- When clicking the button, an invisible iframe is appended to the DOM.
- The iframe opens the same domain as the current one. 
- When the iframe has finished loading the page (i.e. SSO reauthentication is done and all required cookies are set),
  the iframe is automatically removed from the DOM. 
- The user now has fresh cookies, and can continue where he/she left off.

## Solution 2: Refresh cookies in new tab
- Add a button to the UI.
- When clicking the button, a new browser tab opens. 
- The new tab opens the same domain as the current one. 
- When the new tab has finished loading the page (i.e. SSO reauthentication is done and all required cookies are set),
  the tab automatically closes. 
- The user is now back in the original tab, with fresh cookies, and can continue where he/she left off.

## Solution 3: Refresh cookies with fetch request
- Add a button to the UI.
- When clicking the button, a fetch request is made to the server. 
- SSO reauthentication kicks in, and eventually completes.
- The server receives the request.
- The server response includes one or multiple `Set-Cookie` headers with the required cookie(s). 
- The user is now back in the original tab, with fresh cookies, and can continue where he/she left off.

> Note: This solution is untested and probably requires changes to backend/architecture.
  It might not even work; step 3 most likely doesn't (it might depend on the SSO provider).
