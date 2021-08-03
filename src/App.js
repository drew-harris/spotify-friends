import "./styles/App.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Login } from "./components/routes/Login";
import { Home } from "./components/routes/Home";
import { Register } from "./components/routes/Register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      paper: "#282828",
      default: "#191414",
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#1DB954",
      dark: "#1DB954",
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#1DB954",
      main: "#1DB954",
      dark: "#FFFFFF",
      contrastText: "#ffcc00",
    },
    contrastThreshold: 3,
  },
  props: {
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export { App };
