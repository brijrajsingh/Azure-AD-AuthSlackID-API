# Azure-AD-AuthSlackID-API
Authentication REST API to authenticate the AD Users's by their slack ID which is a custom attribute of Azure AD users

## Solution Overview
![Solution Overview](https://raw.githubusercontent.com/maniSbindra/devOpsBot/master/solution%20overview/DevBot.jpg "Solution Overview")

### The main application logic is in the file server.js

### Following features have been included in the initial release of IsBuildAdmin API 
1. Get a list of users from Azure AD, search for the SlackID attribute in the list and, return true if the user is a BuildAdmin, else return False.
2. Return 404 not found is the User is not part of Azure AD.

### integration with other components
1. VSTS : Basic HTTP authentication is used to integrate with VSTS
2. Slack Channel : Slack custom integration with the BOT is used, the slack token provided needs to be specified

## Web App Configuration
### Following Environment Variables / Appsettings are needed for the application
1. tenant : Tenant Of Azure Active Directory - Like <AdName>.onmicrosoft.com 
2. clientId : Unique Client ID - you get after you create an application in the Azure AD.
3. clientSecret : Unique Client Secret - you get after you create an application in the Azure AD.
4. extensionPropId : Client ID without -

## Dependencies
### azure-graphapi - https://www.npmjs.com/package/azure-graphapi 
### express 
