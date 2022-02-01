import React, { useState } from "react";
import Pizzly from "pizzly-js";
import Profile from "./Profile";
import "./styles.css";

// Pizzly environment variables, ake sure to replace
// these with those of your own Pizzly instance
const PIZZLY_HOSTNAME = "https://vspizzlyauth.herokuapp.com";
const PIZZLY_PUBLISHABLE_KEY = "eXeRtYc3izPTavUJyuTwsuhm8iXhrQZVQfo4kG";
const PIZZLY_SETUP_ID_FACEBOOK = "4c344d9c-29e0-4faf-a897-eafa41d2b50b";

// Initialize Pizzly
const pizzly = new Pizzly({
  host: PIZZLY_HOSTNAME,
  publishableKey: PIZZLY_PUBLISHABLE_KEY
});

const facebook = pizzly.integration("facebook", {
  setupId: PIZZLY_SETUP_ID_FACEBOOK
});

const App = () => {
  const [profile, setProfile] = useState();

  /**
   * The connect method lets us authenticate a user
   * to our GitHub application (i.e. the OAuth dance)
   */

  const connect = () => {
    facebook
      .connect()
      .then(({ authId }) => {
        console.log("Sucessfully connected!", authId);
        fetchProfile(authId);
      })
      .catch(console.error);
  };

  const fetchProfile = async (authId) => {
    await facebook
      .auth(authId)
      .get("/me")
      .then((response) => response.json())
      .then((json) => setProfile(json));
  };

  return (
    <div className="App">
      <h1>Hello!</h1>
      <p>
        Click the button bellow to retrieve your Facebook profile Name and User
        Id # using Voyager Social .
      </p>
      <button onClick={connect}>Connect To Facebook</button>
      {profile && <Profile profile={profile} />}
    </div>
  );
};

export default App;
