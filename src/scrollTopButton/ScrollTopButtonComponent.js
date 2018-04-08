import React from 'react';
import { Button, Popover, OverlayTrigger, Glyphicon } from 'react-bootstrap';

const ScrollTopButton = () => {

    const popoverHover = (
        <Popover id="popoverScrollTop">
            <strong>Scroll top</strong>
        </Popover>
    );
    var scrollTop = function() {
        window.scrollTo(0, 0)
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
                onClick={scrollTop}>
                <Glyphicon glyph="glyphicon glyphicon-arrow-up" />
            </Button>
        </OverlayTrigger>
    )
};

export default ScrollTopButton;