import React, { Component } from 'react';
import PrimaryAppBar from './components/PrimaryAppBar';
import ChefHomePage from './components/ChefHomePage'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './assets/site.scss';

const theme = createMuiTheme({
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      text: { // Name of the rule
        color: 'white', // Some CSS
      },
    }
  },
  typography: {
    useNextVariants: true,
  },
  palette: {
    action: { disabled: '#fff5' },
    primary: { main: '#333', contrastText: '#fff' },
    secondary: { main: '#ff007f', contrastText: '#fff' }
  }
});

class App extends Component {
  render() {
    const chefsData = {
      chefsName: "Edward Lee",
      chefsDesc: "Authentic southern cooking with Korean twist"
      
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <PrimaryAppBar></PrimaryAppBar>
          <ChefHomePage {...chefsData}></ChefHomePage>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
