# spa-reauthenticate-poc
Reauthenticate user in a single page application using http only cookie, without requiring browser refresh. A proof of concept.

## Scenario
- You have a Single Page Application.
- You use SSO and HTTP Only Cookies for authentication.
  - SSO involves request redirects (e.g. mydomain.com -> mysso.com -> mydomain.com).
- You want to reauthenticate a user without the user having to reload the entire page. 

This proof of concept aims to solve this problem in a pragmatic (frontend-only) way, 
not involving major rewrites of backend/architecture.

## Solution
- Add a button to the UI.
- When clicking the button, a new browser tab opens. 
- The new tab opens the same domain as the current one. 
- When the new tab has finished loading the page (i.e. SSO reauthentication is done and all required cookies are set),
  the tab automatically closes. 
- The user is now back in the original tab, with a fresh cookie, and can continue where he/she left off.
