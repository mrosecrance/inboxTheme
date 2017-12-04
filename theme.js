var tooLight = function(c) {
    var c = c.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma > 200
};

var image;

var resetImage = function () {
    var imageNum = Math.floor(Math.random() * 1000);
    var imageUrl = "https://unsplash.it/800?image=" + imageNum;
    image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageUrl;
    image.onload = function () {
        var v = new Vibrant(image);
        var swatches = v.swatches();
        var headerSet = false;
        for (var swatch in swatches) {
            if (!headerSet && swatches.hasOwnProperty(swatch) && swatches[swatch] && !tooLight(swatches[swatch].getHex())){
                headerSet = true;
                var header = document.querySelector(".b4");
                header.style.background = swatches[swatch].getHex();

                var searchBar = document.querySelector(".at");
                searchBar.style.background = swatches[swatch].getHex();
                searchBar.style.boxShadow = 'inset -24px 0 12px -12px' + swatches[swatch].getHex();


                var css = document.createElement("style");
                css.type = "text/css";
                css.innerHTML = ".b4 .at::before {box-shadow: inset -24px 0 12px -12px " + swatches[swatch].getHex() + " !important}; .bB .at::before{box-shadow: inset -24px 0 12px -12px " + swatches[swatch].getHex() + " !important}";
                document.body.appendChild(css);
                continue;
            }
            if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                var pinBacking = document.querySelector(".gH");
                pinBacking.style.background = swatches[swatch].getHex();
                var pin = document.querySelector(".b2");

                pin.style.background = swatches[swatch].getHex();
                return;
            }
        }
    };

    image.onerror = function()
    {
        image.src = "https://unsplash.it/800?image=827";
    }
};
var checkAndResetImage = function(){
    var elem = document.querySelector(".ix");
    if (elem == undefined) {
        return;
    }
    var sunnyImage = document.querySelector(".jJ");
    if (sunnyImage == undefined) {
        return;
    }

    elem.innerHTML = '';
    elem.appendChild(image);

};

resetImage();
setInterval(checkAndResetImage, 100);
