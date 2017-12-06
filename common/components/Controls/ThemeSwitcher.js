import React from 'react';
import CSSModules from 'react-css-modules';


class ThemeSwitcher extends React.PureComponent {
  state = {
    active: false,
  };

  css = `
    :root {
      filter: invert(100%);
      background: #fefefe;
    }
    * {
      background-color: inherit;
    }
    img {
      filter: invert(100%);
    }
  `;

  toggle = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }));
  };

  render() {
    return (
      <div styleName="theme-control">
        <button
          styleName="theme-switcher"
          aria-pressed={this.state.active.toString()}
          onClick={this.toggle}
        >
          {
            this.state.active ? (
              <img
                styleName="theme-switcher-icon"
                alt="Night mode off"
                src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3LjUzOSA0Ny41MzkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ3LjUzOSA0Ny41Mzk7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjQuOTk3LDQ3LjUxMUMxMS4yMTQsNDcuNTExLDAsMzYuMjk4LDAsMjIuNTE1QzAsMTIuOTY5LDUuMzE0LDQuMzkyLDEzLjg2OSwwLjEzMiAgICBjMC4zODUtMC4xOTEsMC44NDgtMC4xMTcsMS4xNTEsMC4xODZzMC4zODEsMC43NjYsMC4xOTIsMS4xNUMxMy42NTEsNC42NCwxMi44Niw4LjA1LDEyLjg2LDExLjYwMSAgICBjMCwxMi42ODEsMTAuMzE2LDIyLjk5NywyMi45OTcsMjIuOTk3YzMuNTksMCw3LjAzMy0wLjgwOSwxMC4yMzYtMi40MDNjMC4zODYtMC4xOTEsMC44NDgtMC4xMTcsMS4xNTEsMC4xODYgICAgYzAuMzA0LDAuMzAzLDAuMzgxLDAuNzY2LDAuMTkyLDEuMTVDNDMuMTk2LDQyLjE1MywzNC41OTcsNDcuNTExLDI0Ljk5Nyw0Ny41MTF6IE0xMi4yNDgsMy4zNzJDNS44NjIsNy42MDgsMiwxNC43MDksMiwyMi41MTUgICAgYzAsMTIuNjgsMTAuMzE2LDIyLjk5NiwyMi45OTcsMjIuOTk2YzcuODU0LDAsMTQuOTgxLTMuODk4LDE5LjIwNy0xMC4zNDNjLTIuNjY4LDAuOTUtNS40NjQsMS40My04LjM0NiwxLjQzICAgIGMtMTMuNzgzLDAtMjQuOTk3LTExLjIxNC0yNC45OTctMjQuOTk3QzEwLjg2MSw4Ljc2MSwxMS4zMjcsNi4wMDUsMTIuMjQ4LDMuMzcyeiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
              />
            ) : (
              <img
                styleName="theme-switcher-icon"
                alt="Night mode on"
                src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjkgMTI5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjkgMTI5IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KICA8Zz4KICAgIDxnPgogICAgICA8cGF0aCBkPSJtNjQuNSw5Mi42YzE1LjUsMCAyOC0xMi42IDI4LTI4cy0xMi42LTI4LTI4LTI4LTI4LDEyLjYtMjgsMjggMTIuNSwyOCAyOCwyOHptMC00Ny45YzExLDAgMTkuOSw4LjkgMTkuOSwxOS45IDAsMTEtOC45LDE5LjktMTkuOSwxOS45cy0xOS45LTguOS0xOS45LTE5LjljMC0xMSA4LjktMTkuOSAxOS45LTE5Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiAgICAgIDxwYXRoIGQ9Im02OC42LDIzLjZ2LTEyLjljMC0yLjMtMS44LTQuMS00LjEtNC4xcy00LjEsMS44LTQuMSw0LjF2MTIuOWMwLDIuMyAxLjgsNC4xIDQuMSw0LjFzNC4xLTEuOCA0LjEtNC4xeiIgZmlsbD0iI0ZGRkZGRiIvPgogICAgICA8cGF0aCBkPSJtNjAuNCwxMDUuNnYxMi45YzAsMi4zIDEuOCw0LjEgNC4xLDQuMXM0LjEtMS44IDQuMS00LjF2LTEyLjljMC0yLjMtMS44LTQuMS00LjEtNC4xcy00LjEsMS44LTQuMSw0LjF6IiBmaWxsPSIjRkZGRkZGIi8+CiAgICAgIDxwYXRoIGQ9Im05Ni40LDM4LjVsOS4xLTkuMWMxLjYtMS42IDEuNi00LjIgMC01LjgtMS42LTEuNi00LjItMS42LTUuOCwwbC05LjEsOS4xYy0xLjYsMS42LTEuNiw0LjIgMCw1LjggMC44LDAuOCAxLjgsMS4yIDIuOSwxLjJzMi4xLTAuNCAyLjktMS4yeiIgZmlsbD0iI0ZGRkZGRiIvPgogICAgICA8cGF0aCBkPSJtMjMuNSwxMDUuNmMwLjgsMC44IDEuOCwxLjIgMi45LDEuMiAxLDAgMi4xLTAuNCAyLjktMS4ybDkuMS05LjFjMS42LTEuNiAxLjYtNC4yIDAtNS44LTEuNi0xLjYtNC4yLTEuNi01LjgsMGwtOS4xLDkuMWMtMS42LDEuNi0xLjYsNC4yIDAsNS44eiIgZmlsbD0iI0ZGRkZGRiIvPgogICAgICA8cGF0aCBkPSJtMTIyLjUsNjQuNmMwLTIuMy0xLjgtNC4xLTQuMS00LjFoLTEyLjljLTIuMywwLTQuMSwxLjgtNC4xLDQuMSAwLDIuMyAxLjgsNC4xIDQuMSw0LjFoMTIuOWMyLjIsMS40MjEwOWUtMTQgNC4xLTEuOCA0LjEtNC4xeiIgZmlsbD0iI0ZGRkZGRiIvPgogICAgICA8cGF0aCBkPSJtMTAuNiw2OC43aDEyLjljMi4zLDAgNC4xLTEuOCA0LjEtNC4xIDAtMi4zLTEuOC00LjEtNC4xLTQuMWgtMTIuOWMtMi4zLDAtNC4xLDEuOC00LjEsNC4xIDAsMi4zIDEuOSw0LjEgNC4xLDQuMXoiIGZpbGw9IiNGRkZGRkYiLz4KICAgICAgPHBhdGggZD0ibTEwMi42LDEwNi44YzEsMCAyLjEtMC40IDIuOS0xLjIgMS42LTEuNiAxLjYtNC4yIDAtNS44bC05LjEtOS4xYy0xLjYtMS42LTQuMi0xLjYtNS44LDAtMS42LDEuNi0xLjYsNC4yIDAsNS44bDkuMSw5LjFjMC44LDAuOCAxLjksMS4yIDIuOSwxLjJ6IiBmaWxsPSIjRkZGRkZGIi8+CiAgICAgIDxwYXRoIGQ9Im0zOC40LDM4LjVjMS42LTEuNiAxLjYtNC4yIDAtNS44bC05LjEtOS4xYy0xLjYtMS42LTQuMi0xLjYtNS44LDAtMS42LDEuNi0xLjYsNC4yIDAsNS44bDkuMSw5LjFjMC44LDAuOCAxLjgsMS4yIDIuOSwxLjJzMi4xLTAuNCAyLjktMS4yeiIgZmlsbD0iI0ZGRkZGRiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg=="
              />
            )
          }
        </button>
        <style media={this.state.active ? 'screen' : 'none'}>
          {
            this.state.active ? this.css.trim() : this.css
          }
        </style>
      </div>
    );
  }
}

export default CSSModules(ThemeSwitcher, {});
