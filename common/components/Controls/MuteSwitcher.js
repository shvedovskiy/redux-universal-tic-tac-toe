import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';


class MuteSwitcher extends React.PureComponent {
  static propTypes = {
    onToggleMute: PropTypes.func.isRequired,
  };

  state = {
    active: false,
  };

  toggle = () => {
    this.setState((prevState) => {
      this.props.onToggleMute(!prevState.active);
      return {
        active: !prevState.active,
      };
    });
  };

  render() {
    return (
      <div styleName="mute-control">
        <button
          styleName="mute-switcher"
          aria-pressed={this.state.active.toString()}
          onClick={this.toggle}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80">
            {
              this.state.active ? (
                <g fill="#808080">
                  <polygon points="14.025,38.004 14.025,61.993 31.548,61.993 55.537,85.982 55.537,14.018 31.552,38.004" />
                </g>
              ) : (
                <g fill="#808080">
                  <polygon points="14.025,38.004 14.025,61.993 31.548,61.993 55.537,85.982 55.537,14.018 31.552,38.004" />
                  <path d="M67.41,34.095l-4.243,4.239c6.43,6.432,6.43,16.896,0,23.324L67.41,65.9C76.179,57.129,76.179,42.864,67.41,34.095z"/>
                  <path d="M75.89,25.616l-4.241,4.239c11.105,11.105,11.105,29.176,0,40.284l4.241,4.241C89.337,60.934,89.337,39.06,75.89,25.616z" />
                </g>
              )
            }
          </svg>
        </button>
      </div>
    );
  }
}


export default CSSModules(MuteSwitcher, {});
