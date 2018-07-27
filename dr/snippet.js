(function () {

    const RAIZ = "https://isoluxin.github.io/dr/";

    function defacing () {
        const CSS = [
            "defacing.css",
            "propios.css"
        ];
        for (let css of CSS) {
            $("head").append('<link type="text/css" rel="stylesheet" href="' + RAIZ + css + '" />');
        }
        $.getScript(RAIZ + "codigo.js");
    }

    $(document).ready(function() {
        defacing();
    });

}());