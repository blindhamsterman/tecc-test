# Technical test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### How to run

to run, first run `npm i` to install required node modules then run `npm start`.

You'll also need to create a .env file based on the .env_template

### Requirements
- Node >= 14.0.0
- npm >= 5.6 (built using 6.14.13)

## Description

The application requires a working spotify account, and will show a grid view of the last 50 tracks played, with additional time I'd look to add paging using the api functionality provided.

I had no experience at all of working with the Spotify APIs and encountered a number of issues implementing the implicit security compared to a more normal approach of using server side OAUTH authentication,
ultimately I found a pretty good article on doing this with a custom react hook, article found here: https://www.newline.co/@kchan/writing-a-custom-react-hook-for-spotifys-web-api-implicit-grant-flow--25967253.

I used their approach as a basis but made a number of changes, including changing the APIs to be handled outside of the hook, this is more a personal preference, but I find it easier to navigate source code if concerns are separated.

I made the hook be purely used for handling the authentication and creating a bearer token which I exposed as a getter in the hook to be used in a more normal ReactQuery approach within the page code itself. 

The application primarily uses aphrodite for styling, I find the approach of having the style files per component or page as desired again considerably more readible from a source code perspective.

### Note on Security

The application stores the bearer token in local storage, which isn't a good approach, in a real application I'd not expect the bearer token to be stored at all, instead I'd expect a leaner OAUTH token to be stored as a cookie, 
with the bearer token being handled in session and needing to be retrieved again if the user refreshes their screen. 

I considered not storing the filters in local storage, but honestly, the data stored is limited and not worth storing in a more complex way. 

### Note on Testing

The application doesn't have much in the way of testing in it currently, again this mostly comes down to wanting to not spend too much time on it, for tests I'd write Jest tests to cover both screen expectations
(a test per component to ensure that the correct data is displayed on the screen) as well as functional tests (helper functions tested in isolation).

### Final thoughts

An interesting technical test, I'm not especially happy with the end result, but also didn't want to spend more time on it than I had. Ideally I'd have written in the tests and I'd also have spent more time with styling, adding icons etc. 

I'd also add better error handling, currently I've only accounted for the 401 scenario, and even that is very basic. Ideally for a "proper" application I'd create an error component and render it with useful information within the current
screen, rather than redirecting.

### Known issues
- There is an error relating to keys potentially not being unique that would need to be fixed.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

