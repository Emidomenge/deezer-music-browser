import React from 'react';
import {
  Button, Popover, OverlayTrigger, Glyphicon,
} from 'react-bootstrap';
import { scroller } from 'react-scroll';

const ScrollTopButton = () => {
  const popoverHover = (
    <Popover id="popoverScrollTop">
      <strong>Go back to top</strong>
    </Popover>
  );
  const scrollTop = function () {
    scroller.scrollTo('header', {
      duration: 1000,
      delay: 50,
      smooth: true,
    });
  };

  return (
    <OverlayTrigger
      trigger={['hover']}
      placement="right"
      overlay={popoverHover}
    >
      <Button
        bsStyle="primary"
        className="scrollTopBtn"
        onClick={scrollTop}
      >
        <Glyphicon glyph="glyphicon glyphicon-arrow-up" />
      </Button>
    </OverlayTrigger>
  );
};

export default ScrollTopButton;
