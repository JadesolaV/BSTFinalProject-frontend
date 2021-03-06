import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Signup from "./Components/pages/SignUp";
import Map from "./Components/pages/Map";
import Reviews from "./Components/pages/Reviews";
import Login from "./Components/pages/Login";
import Home from "./Components/pages/Home";
import Profile from "./Components/pages/ProfilePage";
import Logout from "./Components/pages/Logout";
import Restaurants from "./Components/pages/Restaurants";

function App() {
  const [query, setQuery] = useState("");
  const [isTyping, SetTyping] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);
  const url = "http://localhost:5000/restaurant/search";

  const findRestaurant = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query === "") {
      SetTyping(false);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(url, { query: query }).then((response) => {
      console.log(response);
      setSearchResults(response.data);

      if (query === "") {
        SetTyping(false);
      } else {
        SetTyping(true);
      }
    });
    console.log(query);
  };

  return (
    <>
      <Router>
        <Navbar
          query={query}
          findRestaurant={findRestaurant}
          handleSubmit={handleSubmit}
        />
        <Switch>
          <Route path="/Login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/Reviews/:restaurantId" exact component={Reviews} />
          <Route path="/Map" exact component={Map} />
          <Route path="/" exact>
            <Home restSearchData={searchResults} typing={isTyping} />
          </Route>
          <Route
            path="/Restaurants/:restaurantId"
            exact
            component={Restaurants}
          />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
