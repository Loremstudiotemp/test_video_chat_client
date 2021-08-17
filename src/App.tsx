import "./App.css";
import Bob from "./Bob";
import React from "react";
import Alice from "./Alice";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Button, Container, CssBaseline } from "@material-ui/core";

function App() {
  return (
    <Container maxWidth={"md"}>
      <CssBaseline />
      <Router>
        <Box textAlign={"center"} mb={5}>
          <Button component={Link} to={"/"}>
            Home page
          </Button>
          <Button component={Link} to={"/alice"}>
            Caller page
          </Button>
          <Button component={Link} to={"/bob"}>
            Receiver page
          </Button>
          <br />
        </Box>

        <Switch>
          <Route path={"/alice"}>
            <Alice />
          </Route>

          <Route path={"/bob"}>
            <Bob />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
