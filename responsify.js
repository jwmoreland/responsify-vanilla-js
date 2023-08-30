var processedElements = [];

function responsifyImg(imgElement) {
    var owidth, oheight,
        twidth, theight,
        fx1, fy1, fx2, fy2,
        width, height, top, left, scale, transformOrigin;

    imgElement.style.maxWidth = 'none';
    owidth = imgElement.offsetWidth;
    oheight = imgElement.offsetHeight;
    
    // Replacing $this.parent().width() with imgElement.parentElement.offsetWidth, and so on
    twidth = imgElement.parentElement.offsetWidth;
    theight = imgElement.parentElement.offsetHeight;

    scale = 1;
    transformOrigin = 'center';

    // Replacing $this.attr('data-focus-left') with imgElement.getAttribute('data-focus-left'), and so on
    fx1 = Number(imgElement.getAttribute('data-focus-left'));
    fy1 = Number(imgElement.getAttribute('data-focus-top'));
    fx2 = Number(imgElement.getAttribute('data-focus-right'));
    fy2 = Number(imgElement.getAttribute('data-focus-bottom'));

    console.log({
        'fx1' : fx1,
        'fy1' : fy1,
        'fx2' : fx2,
        'fy2' : fy2
    });

  // The logic for `letterbox` remains the same because Boolean(...) works the same way in both vanilla JS and jQuery
    letterbox = Boolean(imgElement.getAttribute('data-cover'));
    letterbox = letterbox ? letterbox : false;

    // const styleProps = getImgStyleProps(owidth, oheight, twidth, theight, fx1, fy1, fx2, fy2, letterbox, scale, transformOrigin);

    if( owidth/oheight > twidth/theight ) {                 // If image is taller than bounding box
        var fwidth = (fx2-fx1) * owidth;
        if ( fwidth/oheight > twidth/theight ) { // If focal width
            height = oheight*twidth/fwidth;
            width = owidth*twidth/fwidth;
            left = -fx1*width;
            top = (theight-height)/2;
            if(!letterbox) {
                if(height < theight) {
                    var fxcenter = (fx1 + ((fx2 - fx1)/2)) * 100;
                    scale = theight/height;
                    transformOrigin = fxcenter + '% center';
                }
            }
        } else {
            height = theight;
            width = theight*owidth/oheight;
            left = twidth/2 - (fx1 + fx2)*width/2;
            left = left>0?0:left;
            left = (twidth - left - width)>0?(twidth-width):left;
            top = 0;
        } 
    } else {
        var fheight = (fy2-fy1) * oheight;
        if ( fheight/owidth > theight/twidth ) {
            width = owidth*theight/fheight;
            height = oheight*theight/fheight;
            top = -fy1*height;
            left = (twidth-width)/2;
            if(!letterbox) {
                if(width < twidth) {
                    var fycenter = (fy1 + (fy2 - fy1)/2) * 100;
                    scale = twidth/width;
                    transformOrigin = 'center ' + fycenter + '%';
                }
            }
        } else {
            width = twidth;
            height = twidth*oheight/owidth;
            top = theight/2 - (fy1 + fy2)*height/2;
            // if top > 0, it will leave blank on the top, so set it to 0;
            top = top>0?0:top;
            // if height - top < theight, it will leave blank on the bottom, so set top = height - theight
            top = (theight - top - height)>0?(theight-height):top;
            left = 0;
        }
    }
    
    imgElement.parentElement.style.overflow = "hidden";

    imgElement.style.position = "absolute";
    imgElement.style.height = height + "px";
    imgElement.style.width = width + "px";
    imgElement.style.left = left + "px";
    imgElement.style.top = top + "px";
    imgElement.style.transform = "scale(" + scale + ")";
    imgElement.style.transformOrigin = transformOrigin;
}

function responsify(input) {
    // Check if the input is a string (assumed to be a selector)
    if (typeof input === 'string') {
        let images = document.querySelectorAll(input);
        images.forEach(img => {
            responsifyImg(img);
            addProcessedElement(img);
        });
    } else if (Array.isArray(input) && input.every(item => item instanceof HTMLImageElement)) {
        // Check if the input is an array of image elements
        input.forEach(img => {
            responsifyImg(img);
            addProcessedElement(img);
        });
    } else {
        console.error("The input to responsify should be either a selector string or an array of image elements.");
    }
}

function addProcessedElement(imgElement) {
    // Check if the imgElement is not already in the processedElements array
    if (!processedElements.includes(imgElement)) {
        processedElements.push(imgElement);
    }
}

window.addEventListener('resize', function() {
    processedElements.forEach(img => responsifyImg(img));
});


module.exports = responsify;
