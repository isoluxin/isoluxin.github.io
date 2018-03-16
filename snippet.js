(function () {

    const RAIZ = "https://isoluxin.github.io/";
    const CSS = [
        "estilos.css",
        "estilos.chat.css",
        "estilos.info.css"
    ];

    var $temp = $("<div>");
    var $elementosOriginales;

    function defacing () {
        $elementosOriginales = $("body > *");
        $("link[rel='stylesheet']").remove();
        $temp.load(RAIZ + "snippet.html", snippetCargado);
    }

    function snippetCargado () {
        $("body").append($temp.html());
        $.getScript(RAIZ + "snippet.base.js", function () {
            for (let css of CSS) {
                $("head").append('<link type="text/css" rel="stylesheet" href="' + RAIZ + css + '" />');
            }
            $elementosOriginales.remove();
        });
    }

    $(document).ready(function() {
        defacing();
    }

}());