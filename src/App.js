import React from "react";
import "./styles.css";

const themes = {
  light: {
    fontColor: "black",
    backgroundColor: "grey"
  },
  dark: {
    fontColor: "white",
    backgroundColor: "black"
  },
  red: {
    fontColor: "white",
    backgroundColor: "red"
  }
};

const ThemeContext = React.createContext(themes.light);
const LangContext = React.createContext();

class ThemeSelector extends React.Component {
  handleSelect = (e) => {
    console.log("selected", e.target.value);

    this.context.themeSetter(e.target.value);
  };

  render() {
    console.log("Object.keys(themes)", Object.keys(themes));
    const keys = Object.keys(themes);

    return (
      <select onChange={this.handleSelect}>
        {keys.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }
}
ThemeSelector.contextType = ThemeContext;

class ThemedButton extends React.Component {
  render() {
    const { theme, toggleFunction, lang } = this.props;
    console.log("button", lang);

    return (
      <button
        style={{ color: theme.fontColor, background: theme.backgroundColor }}
        onClick={toggleFunction}
      >
        {this.props.children}
      </button>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => (
          <LangContext.Consumer>
            {(langValue) => (
              <ThemedButton
                theme={value.theme}
                toggleFunction={value.toggleFn}
                lang={langValue}
              >
                toggle theme
              </ThemedButton>
            )}
          </LangContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class Toolbar extends React.Component {
  render() {
    return (
      <div>
        <Button />
        <ThemeSelector />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    const dataFromContext = this.context;

    console.log("header", dataFromContext);

    return (
      <header>
        <Toolbar />
      </header>
    );
  }
}
Header.contextType = ThemeContext;

class Body extends React.Component {
  render() {
    return <main>{this.props.children}</main>;
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { theme: themes.dark };
  }

  toogleTheme = () => {
    this.setState((state, props) => {
      return {
        theme: state.theme === themes.light ? themes.dark : themes.light
      };
    });
  };

  setTheme = (key) => {
    const theme = themes[key];
    this.setState({ theme });
  };

  render() {
    return (
      <div className="App">
        <LangContext.Provider value="ru">
          <ThemeContext.Provider
            value={{
              theme: this.state.theme,
              toggleFn: this.toogleTheme,
              themeSetter: this.setTheme
            }}
          >
            <Header />
            <Body>
              <h1>Hello CodeSandbox</h1>
            </Body>
          </ThemeContext.Provider>
        </LangContext.Provider>
      </div>
    );
  }
}
