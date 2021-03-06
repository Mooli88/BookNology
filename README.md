## INSTRUCTIONS

In order to run this app you will need OAuth 2.0 Client ID.
You can set one up following these steps:

- [Create a new project](https://console.cloud.google.com/projectcreate)
- Enable Books API from [here](https://console.cloud.google.com/apis/library)
- [Set up Oauth consent screen](https://console.cloud.google.com/apis/credentials/consent). The only fileds you should fill up are 'Application name', 'Support email' and 'Scopes for Google APIs'.
  For 'Scopes for Google APIs' make sure to add Books API to the scoop.
- Create [OAuth client ID](console.developers.google.com/apis/credentials/oauthclient) for web applications and set the the URIs to http://localhost:3000
- Create `.env` file at root folder and add `REACT_APP__CLIENT_ID` var with your OAuth client ID (just copy the bit which comes before '.apps.googleusercontent.com'. ie `00000000000-r0qkdqt7dc0edidmv1fcc53tjoi3rqm7`).
- Make sure you got books in your [Google library](https://books.google.com/books) with the user you are about to login with. Preferably you should have many books across different shelves.
- Run `yarn start` to start the app in development mode
- Navigate to http://localhost:3000 (currently not working in Incognito)

## TO DO

### Known bugs

- Some elements of the gallery grid behave strangely when in hover state

### Things to improve on

- **Error handling**.
  At the moment error handling is very minimal. This needs to be improved by setting fallbacks and letting the user know what's happened.

- Some components can be further abstracted by exporting some of the logic into helper/utils services
- Add more generic global style classes to minimize repetition
- Optimise queries by selecting specific fields
- Better git commits (smaller commits and better messages)

### Missing Features

- Be able to rate book
- Infinite scroll for books
- Placeholder for books while loading

##

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
