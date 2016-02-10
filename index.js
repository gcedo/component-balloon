'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _economistComponentLinkButton = require('@economist/component-link-button');

var _economistComponentLinkButton2 = _interopRequireDefault(_economistComponentLinkButton);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

/* eslint-disable no-console */

var Balloon = (function (_React$Component) {
  _inherits(Balloon, _React$Component);

  _createClass(Balloon, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        className: _react2['default'].PropTypes.string,
        children: _react2['default'].PropTypes.node,
        shadow: _react2['default'].PropTypes.bool,
        balloonPosition: _react2['default'].PropTypes.oneOf(['top', 'bottom']),
        unstyled: _react2['default'].PropTypes.bool,
        prefix: _react2['default'].PropTypes.string,
        showOnHover: _react2['default'].PropTypes.bool,
        showOnHoverDelay: _react2['default'].PropTypes.number,
        trigger: _react2['default'].PropTypes.element.isRequired
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        shadow: true,
        balloonPosition: 'bottom',
        unstyled: false,
        prefix: 'balloon',
        showOnHoverDelay: 100
      };
    }
  }]);

  function Balloon(props) {
    _classCallCheck(this, Balloon);

    _React$Component.call(this, props);
    this.state = {
      visibility: 'not-visible'
    };

    this.hoverHandlers = this.props.showOnHover ? {
      onMouseOver: this.changeVisibility.bind(this, 'visible'),
      onMouseOut: this.changeVisibility.bind(this, 'not-visible')
    } : {};
  }

  Balloon.prototype.handleClickOutside = function handleClickOutside() {
    this.setState({
      visibility: 'not-visible'
    });
  };

  Balloon.prototype.calculatePosition = function calculatePosition() {
    // Reset position before calculate the new position.
    this.setState({
      position: {}
    });
    var availableWidth = document.body.getBoundingClientRect().width;
    var balloon = this.refs.balloon;
    var balloonContent = this.refs.balloonContent;
    var balloonContentWidth = balloonContent.offsetWidth;
    var centerLeftOffsetBalloon = balloon.offsetLeft + balloon.offsetWidth / 2;
    var centerRightOffsetBalloon = availableWidth - (balloon.offsetLeft + balloon.offsetWidth / 2);
    var position = undefined;
    if (centerLeftOffsetBalloon < balloonContentWidth / 2) {
      // Put Ballon on the left or will be partially not visible.
      position = { left: 0 };
    } else if (centerRightOffsetBalloon < balloonContentWidth / 2) {
      // Put Ballon on the right or will be partially not visible.
      position = { right: 0 };
    } else {
      // Center the Balloon, it will be totally visible.
      position = { left: Math.round(balloon.offsetWidth / 2 - balloonContent.offsetWidth / 2) };
    }
    return position;
  };

  Balloon.prototype.toggleState = function toggleState(event) {
    event.stopPropagation();
    event.preventDefault();
    this.changeVisibility();
    // Required for preventDefault on Safari.
    return false;
  };

  Balloon.prototype.changeVisibility = function changeVisibility(visibility) {
    if (!visibility) {
      visibility = this.state.visibility === 'not-visible' ? 'visible' : 'not-visible';
    }
    var position = visibility === 'visible' && this.props.unstyled === false ? this.calculatePosition() : {};
    this.setState({
      visibility: visibility,
      position: position
    });
  };

  Balloon.prototype.hoverHandler = function hoverHandler(visibility) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.changeVisibility, this.showOnHoverDelay, visibility);
  };

  Balloon.prototype.render = function render() {
    var TriggerLink = this.props.trigger.type;
    var TriggerLinkClassName = this.props.prefix + '__link' + (typeof this.props.trigger.props.className !== 'undefined' ? ' ' + this.props.trigger.props.className : '');
    /* eslint-disable undefined see https://github.com/eslint/espree/issues/116 */
    var TriggerLinkNewProps = _extends({}, this.props.trigger.props, this.hoverHandlers);
    TriggerLinkNewProps.className = TriggerLinkClassName;
    var className = this.props.className ? ' ' + this.props.className : '';
    var prefix = ' ' + this.props.prefix + '--';
    var shadow = this.props.shadow ? ' ' + prefix + 'shadow' : '';
    var balloonDefaultClassname = this.props.unstyled ? '' : 'balloon ';
    var balloonContentDefaultClassname = this.props.unstyled ? 'content ' : 'balloon-content ';
    return _react2['default'].createElement(
      'div',
      { ref: 'balloon', className: '' + balloonDefaultClassname + prefix + 'position-' + this.props.balloonPosition + ' ' + prefix + this.state.visibility + className },
      _react2['default'].createElement(TriggerLink, _extends({}, TriggerLinkNewProps, {
        onClick: this.toggleState.bind(this)
      })),
      _react2['default'].createElement(
        'div',
        _extends({
          ref: 'balloonContent',
          className: '' + balloonContentDefaultClassname + shadow,
          style: this.state.position
        }, this.hoverHandlers),
        this.props.children
      )
    );
  };

  return Balloon;
})(_react2['default'].Component);

exports['default'] = Balloon;
exports['default'] = _reactClickOutside2['default'](Balloon);
module.exports = exports['default'];