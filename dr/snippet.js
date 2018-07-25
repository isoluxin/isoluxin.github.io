(function () {

    const RAIZ = "https://isoluxin.github.io/";
    const CSS = [
        "defacing.css",
        "propios.css"
    ];

    function defacing () {
        for (let css of CSS) {
            $("head").append('<link type="text/css" rel="stylesheet" href="' + RAIZ + css + '" />');
        }
    }

    $(document).ready(function() {
        defacing();
    });

}());