/* eslint-disable no-undef */
import Constants from "expo-constants";

const DEV_HOME_SCREEN_URL = "your-localhost-ip-address:3000";
const DEV_CHAT_SCREEN_URL = "your-localhost-ip-address:3002";
const DEV_PROFILE_SCREEN_URL = "your-localhost-ip-address:3001";
const DEV_SERVER_URL = "your-localhost-ip-address:8000";

const HOME_SCREEN_URL = "https://preeminent-licorice-96005b.netlify.app";
const CHAT_SCREEN_URL = "https://cosmic-semolina-b6e8c3.netlify.app";
const PROFILE_SCREEN_URL = "https://shiny-druid-4172be.netlify.app";
const SERVER_URL =
  "http://sinderproject-env.eba-p3ciumxi.us-east-1.elasticbeanstalk.com";

const ENV = {
  dev: {
    HOME_SCREEN_URL: DEV_HOME_SCREEN_URL,
    CHAT_SCREEN_URL: DEV_CHAT_SCREEN_URL,
    PROFILE_SCREEN_URL: DEV_PROFILE_SCREEN_URL,
    SERVER_URL: DEV_SERVER_URL,
  },
  prod: {
    HOME_SCREEN_URL: HOME_SCREEN_URL,
    CHAT_SCREEN_URL: CHAT_SCREEN_URL,
    PROFILE_SCREEN_URL: PROFILE_SCREEN_URL,
    SERVER_URL: SERVER_URL,
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;
