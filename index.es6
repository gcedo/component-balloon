import React from 'react';
import Button from '@economist/component-link-button';
import enhanceWithClickOutside from 'react-click-outside';
/* eslint-disable no-console */
export default class Balloon extends React.Component {

  static get propTypes() {
    return {
      className: React.PropTypes.string,
      children: React.PropTypes.node,
      shadow: React.PropTypes.bool,
      balloonPosition: React.PropTypes.oneOf(['top', 'bottom']),
      unstyled: React.PropTypes.bool,
      prefix: React.PropTypes.string,
      showOnHover: React.PropTypes.bool,
      showOnHoverDelay: React.PropTypes.number,
      trigger: React.PropTypes.element.isRequired,
    };
  }

  static get defaultProps() {
    return {
      shadow: true,
      balloonPosition: 'bottom',
      unstyled: false,
      prefix: 'balloon',
      showOnHoverDelay: 100,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      visibility: 'not-visible',
    };

    this.hoverHandlers = (this.props.showOnHover) ? {
      onMouseOver: this.changeVisibility.bind(this, 'visible'),
      onMouseOut: this.changeVisibility.bind(this, 'not-visible'),
    } : {};
  }

  handleClickOutside() {
    this.setState({
      visibility: 'not-visible',
    });
  }

  calculatePosition() {
    // Reset position before calculate the new position.
    this.setState({
      position: {},
    });
    const availableWidth = document.body.getBoundingClientRect().width;
    const balloon = this.refs.balloon;
    const balloonContent = this.refs.balloonContent;
    const balloonContentWidth = balloonContent.offsetWidth;
    const centerLeftOffsetBalloon = balloon.offsetLeft + balloon.offsetWidth/2;
    const centerRightOffsetBalloon = availableWidth - (balloon.offsetLeft + balloon.offsetWidth/2);
    let position = undefined;
    if (centerLeftOffsetBalloon<(balloonContentWidth/2)){
      // Put Ballon on the left or will be partially not visible.
      position = { left: 0 };
    } else if(centerRightOffsetBalloon<(balloonContentWidth/2)) {
      // Put Ballon on the right or will be partially not visible.
      position = { right: 0 };
    } else {
      // Center the Balloon, it will be totally visible.
      position = { left: Math.round((balloon.offsetWidth / 2) - (balloonContent.offsetWidth / 2)) };
    }
    return position;
  }

  toggleState(event) {
    event.stopPropagation();
    event.preventDefault();
    this.changeVisibility();
    // Required for preventDefault on Safari.
    return false;
  }

  changeVisibility(visibility) {
    if(!visibility){
      visibility = (this.state.visibility === 'not-visible') ? 'visible' : 'not-visible';
    }
    const position = (visibility === 'visible' && this.props.unstyled === false) ? this.calculatePosition() : {};
    this.setState({
      visibility,
      position,
    });
  }

  hoverHandler(visibility) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.changeVisibility, this.showOnHoverDelay, visibility);
  }

  render() {
    const TriggerLink = this.props.trigger.type;
    const TriggerLinkClassName = `${this.props.prefix}__link${(typeof this.props.trigger.props.className !== `undefined`) ?
      ` ${this.props.trigger.props.className}` : `` }`;
    /* eslint-disable undefined see https://github.com/eslint/espree/issues/116 */
    const TriggerLinkNewProps = {
      ...this.props.trigger.props,
      ...this.hoverHandlers,
    };
    TriggerLinkNewProps.className = TriggerLinkClassName;
    const className = (this.props.className) ? ` ${this.props.className}` : ``;
    const prefix = ` ${this.props.prefix}--`;
    const shadow = (this.props.shadow) ? ` ${prefix}shadow` : ``;
    const balloonDefaultClassname = (this.props.unstyled) ? '' : 'balloon ';
    const balloonContentDefaultClassname = (this.props.unstyled) ? 'content ' : 'balloon-content ';
    return (
      <div ref="balloon" className={`${balloonDefaultClassname}${prefix}position-${this.props.balloonPosition} ${prefix}${this.state.visibility}${className}`}>
        <TriggerLink {...TriggerLinkNewProps}
          onClick={this.toggleState.bind(this)}
        />
        <div
          ref="balloonContent"
          className={`${balloonContentDefaultClassname}${shadow}`}
          style={this.state.position}
          {...this.hoverHandlers}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(Balloon);
