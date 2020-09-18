import React, { useState } from 'react';

var styles = {"attrSection":"_1-wtg","attrImageSection":"_2sohj","attrListSection":"_2vJBP","attributeList":"_3afez","attributList":"_1ryT8","item":"_VrCvP","activeAttr":"_3FIQ_","itemHeader":"_1-xF_","itemDescription":"_ve3dP","activeItemDescription":"_1lLZK","activeSelectorActive":"_2CMVI","activeSelector":"_1Ekp3","arrowDown":"_18n05"};

var CardView = function CardView(_ref) {
  var items = _ref.items,
      activeColor = _ref.activeColor,
      imageHeight = _ref.imageHeight,
      imageWidth = _ref.imageWidth;
  var navigations = items;

  var _useState = useState(navigations[0].image),
      itemLink = _useState[0],
      setItemLink = _useState[1];

  var _useState2 = useState(navigations[0]),
      selectedItem = _useState2[0],
      setSelectedItem = _useState2[1];

  var handleClick = function handleClick(item) {
    setItemLink(item.image);
    setSelectedItem(item);
  };

  var renderNav = function renderNav(items) {
    return items.map(function (item) {
      return /*#__PURE__*/React.createElement("li", {
        key: item.id
      }, /*#__PURE__*/React.createElement("div", {
        className: selectedItem.id === item.id ? styles.item + ' ' + styles.activeAttr : styles.item,
        onClick: function onClick() {
          return handleClick(item);
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          backgroundColor: activeColor || '#2590ef'
        },
        className: selectedItem.id === item.id ? styles.activeSelectorActive : styles.activeSelector
      }), /*#__PURE__*/React.createElement("i", {
        className: styles.arrowDown
      }), /*#__PURE__*/React.createElement("p", {
        className: styles.itemHeader
      }, item.header), /*#__PURE__*/React.createElement("p", {
        className: selectedItem.id === item.id ? styles.activeItemDescription : styles.itemDescription
      }, item.description)));
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.attrSection
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.attrImageSection
  }, /*#__PURE__*/React.createElement("img", {
    src: itemLink,
    className: styles.attrImage,
    style: {
      height: imageHeight || '',
      width: imageWidth || ''
    },
    alt: "logo"
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.attrListSection
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.attributeList
  }, /*#__PURE__*/React.createElement("ul", null, renderNav(navigations)))));
};

export { CardView };
//# sourceMappingURL=index.modern.js.map
