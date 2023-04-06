import React from "react";
import NavBar from "../components/NavBar";

function CreditsPage() {
  return (
    <div className="flex flex-col m-0 h-full overflow-hidden">
      <NavBar />
      <div className="p-5 pl-10 pr-10 flex flex-col flex-grow h-full bg-inherit text-white overflow-y-scroll no-scrollbar">
        <span className="flex text-5xl font-bold">Credits</span>
        <span className="flex text-4xl font-bold mt-10">Code</span>
        <div className="flex flex-col flex-wrap sm:flex-row mt-10 sm:justify-start gap-9">
          <div>
            <span className="text-2xl font-bold mt-10">
              Express + Sequelize
            </span>
            <ul className="text-lg mt-4">
              <li>
                <a
                  className="text-blue-400"
                  href="https://sequelize.org/docs/v6/core-concepts/assocs/#many-to-many-relationships"
                >
                  Sequelize Many-to-Many Relationships
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router "
                >
                  Express Nested Router
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://medium.com/@alysachan830/cookie-and-session-ii-how-session-works-in-express-session-7e08d102deb8"
                >
                  Express Session
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-2xl font-bold mt-10">React</span>
            <ul className="text-lg mt-4">
              <li>
                <a
                  className="text-blue-400"
                  href="https://v5.reactrouter.com/core/api/Hooks/useparams"
                >
                  React Router useParams
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://legacy.reactjs.org/docs/hooks-effect.html"
                >
                  React Hooks useEffect
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://react.dev/learn/you-might-not-need-an-effect"
                >
                  When to use useEffect
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://www.w3schools.com/react/react_useref.asp"
                >
                  React useRef
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://stackoverflow.com/questions/72167518/a-component-suspended-while-responding-to-synchronous-input"
                >
                  React Suspense
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-2xl font-bold mt-10 ">
              Three.js + React Three Fiber
            </span>
            <ul className="text-lg mt-4">
              <li>
                <a
                  className="text-blue-400"
                  href="https://youtube.com/playlist?list=PLjcjAqAnHd1EIxV4FSZIiJZvsdrBc1Xho"
                >
                  Three.js Tutorials
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://www.youtube.com/watch?v=DPl34H2ISsk"
                >
                  React Three Fiber Youtube Tutorial
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://sbcode.net/react-three-fiber/"
                >
                  React Three Fiber Tutorial
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://stackoverflow.com/questions/69414101/how-can-i-drag-an-object-in-x-and-z-constrained-in-y-in-react-three-fiber-with-a"
                >
                  React Three Fiber Drag and Drop
                </a>
              </li>
              <li>
                <a className="text-blue-400" href="https://gltf.pmnd.rs/">
                  GLTF to JSX Converter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-2xl font-bold mt-10">CSS + TailwindCSS</span>
            <ul className="text-lg mt-4">
              <li>
                <a
                  className="text-blue-400"
                  href="https://tailwindcss.com/docs/animation"
                >
                  TailwindCSS Animation
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://tailwindcss.com/docs/transition-property"
                >
                  TailwindCSS Transition
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://stackoverflow.com/questions/67605723/triple-dot-css-animation-on-a-loading-screen"
                >
                  Triple Dot Animation for Loading
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://dev.to/joeattardi/let-s-make-a-css-cube-1fed "
                >
                  CSS Cube
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://codepen.io/JTParrett/pen/kVKpMP"
                >
                  Spin Animation for Loading
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-2xl font-bold mt-10">Web Audio API</span>
            <ul className="text-lg mt-4">
              <li>
                <a
                  className="text-blue-400"
                  href="https://code.tutsplus.com/tutorials/the-web-audio-api-adding-sound-to-your-web-app--cms-23790"
                >
                  Web Audio API Setup Tutorial
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://dobrian.github.io/cmp/topics/sample-recording-and-playback-with-web-audio-api/1.loading-and-playing-sound-files.html"
                >
                  How to play MP3 files with Web Audio API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-2xl font-bold mt-10">Sentry</span>
            <ul className="text-lg mt-4">
              <li>
                <a
                  className="text-blue-400"
                  href="https://nicholasmordecai.co.uk/programming/sentry-io-using-node-js/"
                >
                  Sentry Setup with Node.js
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="flex text-2xl font-bold">Socket.io + Redis</span>
            <ul className="text-lg mt-4">
              <li>
                <a
                  className="text-blue-400"
                  href="https://www.valentinog.com/blog/socket-react/"
                >
                  Socket.io + React Tutorial
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://youtu.be/jgpVdJB2sKQ"
                >
                  Redis Crash Course
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://www.youtube.com/watch?v=ZwFA3YMfkoc"
                >
                  Redis + Node.js Tutorial
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://developer.redis.com/create/docker/nodejs-nginx-redis"
                >
                  Redis Docker Setup
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://socket.io/docs/v4/redis-adapter/"
                >
                  Socket.io Redis Adapter Docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="flex text-2xl font-bold">Auth0</span>
            <ul className="text-lg mt-4">
              <li>
                <a
                  className="text-blue-400"
                  href="https://auth0.com/docs/quickstart/spa/react/02-calling-an-api"
                >
                  Auth0 React Tutorial
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://auth0.com/docs/quickstart/spa/react/01-login"
                >
                  Auth0 Authentication Refactoring
                </a>
              </li>
              <li>
                <a
                  className="text-blue-400"
                  href="https://github.com/gitdagray/react_login_auth0"
                >
                  Auth0 React Setup
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="flex text-2xl font-bold">Deployment and Misc</span>
            <ul className="text-lg mt-4">
              <li>
                <a className="text-blue-400" href="digitalocean.com">
                  Deployed using DigitalOcean
                </a>
              </li>
              <li>
                <a className="text-blue-400">
                  Deployed using lab9 and lab10 code
                </a>
              </li>
              <li>
                <a className="text-blue-400" href="chat.openai.com/chat">
                  ChatGPT
                </a>
              </li>
            </ul>
          </div>
        </div>

        <span className="flex text-4xl font-bold mt-10">Assets</span>
        <div className="flex flex-col flex-wrap sm:flex-row mt-10 sm:justify-start gap-5">
          <div>
            <span className="text-2xl font-bold mt-10">3D Models</span>
            <ul className="text-lg mt-4">
              <li>
                <a className="text-blue-400" href="https://www.cgtrader.com/ ">
                  All 3D Models taken from CGTrader
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-2xl font-bold mt-10">Icons</span>
            <ul className="text-lg mt-4">
              <li>
                <a className="text-blue-400" href="https://fontawesome.com/">
                  Icons from Font Awesome
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-2xl font-bold mt-10">SFX</span>
            <ul className="text-lg mt-4">
              <li>
                <a
                  className="text-blue-400"
                  href="https://www.epidemicsound.com/track/KVzDjCf6gv/?override_referrer=https%3A%2F%2Fwww.epidemicsound.com%2Foauth_callback%2F "
                >
                  Furniture SFX from Epidemic Sound
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditsPage;
