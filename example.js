'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _economistComponentLinkButton = require('@economist/component-link-button');

var _economistComponentLinkButton2 = _interopRequireDefault(_economistComponentLinkButton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var exampleOneTrigger = _react2['default'].createElement(
  'a',
  { href: 'https://www.economist.com/user/login', className: 'balloon-link' },
  'Bottom positioned balloon'
);
var exampleTwoTrigger = _react2['default'].createElement(
  _economistComponentLinkButton2['default'],
  { href: 'https://www.economist.com/user/login', className: 'balloon-link' },
  'Top positioned balloon show on Over'
);
var exampleThreeTrigger = _react2['default'].createElement(
  _economistComponentLinkButton2['default'],
  {
    href: 'https://www.economist.com/user/login',
    className: 'balloon-link'
  },
  'Unstyled'
);
exports['default'] = _react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement('div', { className: 'balloon-example no-mobile' }),
  _react2['default'].createElement(
    'div',
    { className: 'balloon-example' },
    _react2['default'].createElement(
      _index2['default'],
      { trigger: exampleOneTrigger },
      _react2['default'].createElement(
        'div',
        null,
        'The position of the balloon, as its width, can be styled by the context.'
      )
    )
  ),
  _react2['default'].createElement(
    'div',
    { className: 'balloon-example right' },
    _react2['default'].createElement(
      _index2['default'],
      { balloonPosition: 'top', showOnHover: true, trigger: exampleTwoTrigger },
      _react2['default'].createElement(
        'div',
        null,
        'The position of the balloon, as its width, can be styled by the context.'
      )
    )
  ),
  _react2['default'].createElement(
    'div',
    { className: 'balloon-example right' },
    _react2['default'].createElement(
      _index2['default'],
      {
        unstyled: true,
        balloonPosition: 'top',
        prefix: 'customClassname',
        trigger: exampleThreeTrigger
      },
      _react2['default'].createElement(
        'div',
        null,
        'The position of the balloon, as its width, can be styled by the context.'
      )
    )
  ),
  _react2['default'].createElement('div', { className: 'balloon-example no-mobile' })
);
module.exports = exports['default'];