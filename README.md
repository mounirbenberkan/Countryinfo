**CountryInfo**
A web application for exploring countries around the world. Search, filter, compare, quiz and save countries you want to visit.

Built by Ammar Imeri, Leif Rasoul and Mounir Benberkan as a project.

**Features**
- Search for countries in real time
- Filter by region and sort by name or population
- View detailed information like capital, language, currency, timezone and more
- Add countries to favorites or a wishlist, saved locally in your browser
- Compare two countries side by side
- Travel quiz game where you guess the country from its flag
- Weather info for the country's capital

**What tech was used:
**React
Vite
React Router
CSS Modules / plain CSS
localStorage

**APIs**
REST Countries https://restcountries.com
Main data source. Provides flag, capital, region, population, languages, currencies, timezones and neighboring countries.

OpenWeatherMap https://openweathermap.org
Used for current weather in the country's capital. Requires an API key stored in .env as VITE_WEATHER_API_KEY.

**Why React?**
We chose React over Vue and Angular for a few reasons.

React has a massive community, which made it easy to find help and libraries when we got stuck. The component model felt natural for this kind of project, and we had previous knowledge of building within React. The whole idea of a country card is a component, a search bar is a component, and how they all plug together cleanly helped us with choosing React. React has also consistently ranked as one of the most adopted front-end libraries in the industry, as noted by the ThoughtWorks Technology Radar which places React in the "Adopt" tier, meaning it is considered a safe and proven choice for production projects.

Vue was a close alternative. It has a gentler learning curve and a more structured approach with single-file components. For a small team that already knew some React basics, Vue would have added an extra learning step and we didn't feel fully convinced to learn something new at this time. Vue is arguably better for teams coming from a traditional HTML/CSS background, but React fit our situation better.

Angular was ruled out early. It is a full framework rather than a library and brings a lot of complexity with TypeScript by default, decorators, dependency injection and a steep learning curve. Angular makes sense for large enterprise applications where that structure pays off, but we didn't feel like it would in our project.

**References:**
State of JS 2023 https://2023.stateofjs.com/en-US/libraries/front-end-frameworks
ThoughtWorks Technology Radar https://www.thoughtworks.com/radar/languages-and-frameworks/react-js
React docs https://react.dev
Vue docs https://vuejs.org/guide/introduction
Angular docs https://angular.dev/overview

**Installation**
git clone https://github.com/mounirbenberkan/Countryinfo

cd Countryinfo
npm install
npm run dev

If you want weather to work, create a .env file in the root:

VITE_WEATHER_API_KEY=your_key_here

How to get your API key from WeatherAPI
1. Visit https://openweathermap.org
2. Create an account and navigate to API keys
3. Copy KEY and paste into a .env file in the root folder with VITE_WEATHER_API_KEY=your_key_here
