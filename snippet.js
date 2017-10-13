(function () {

    const RAIZ = "https://isoluxin.github.io/";
    const CSS = [
        "estilos.css",
        "estilos.chat.css",
        "estilos.info.css"
    ];

    // const $html = $('<aside><nav><a id="lanza" href target="_blank" rel="noopener noreferrer">N</a><button id="onoff" class="onoff"></button><button data-id="historial" class="clon">H</button><button data-id="log" class="clon">L</button><button id="paisesOk" class="clon on">P</button><button id="avance" class="clon">A</button><select></select><div class="stat rot"><div id="contador"></div></div></nav><div class="log clon"></div><div class="historial clon"><ul id="historialLog"></ul><button>eliminar</button></div></aside><section class="cams"></section><section class="templates"><div class="cam"><div class="vid"></div><nav><div class="row"><button>&#128470;</button><button class="onoff"></button><button>&#8986;</button><button>&hearts;</button><button>&#x26D4;</button></div><div class="row"><button>&#x2711;</button><button>&#x270B;</button><button>&#128076;</button><button>&#x279C;</button></div></nav><div class="info"></div><div class="chat clon"><div><h1></h1><div class="txt"></div><form autocomplete="off"><input type="text" name="texto" /><input type="submit" value="&#x27A7;" /></form></div></div></div></section>');
    var $temp = $("<div>");
    var $elementosOriginales;

    (function defacing () {
        $elementosOriginales = $("body > *");
        $("link[rel='stylesheet']").remove();
        $temp.load(RAIZ + "snippet.html", snippetCargado);
        // snippetCargado();
    }());

    function snippetCargado () {
        $("body").append($temp.html());
        // $html.appendTo($("body"));
        $.getScript(RAIZ + "snippet.base.js", function () {
            for (let css of CSS) {
                $("head").append('<link type="text/css" rel="stylesheet" href="' + RAIZ + css + '" />');
            }
            $elementosOriginales.remove();
        });
    }

}());
