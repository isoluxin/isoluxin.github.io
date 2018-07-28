(function () {

    const RAIZ = "https://isoluxin.github.io/";

    const TG_NEWOPTION = "<option>";

    const COUNTRIES = {
        /* 1 */
        "ES": {"p": 1, "l": 1},
        /* 2 */
        "AR": {"p": 2, "h": -3, "l": 1},
        "CO": {"p": 2, "h": -5, "l": 1},
        "MX": {"p": 2, "h": -5, "l": 1},
        "VE": {"p": 2, "h": -4, "l": 1},
        "PE": {"p": 2, "h": -5, "l": 1},
        "CL": {"p": 2, "h": -3, "n": "Chile", "l": 1},
        "PR": {"p": 2, "h": -4, "n": "Puerto Rico", "l": 1},
        "CR": {"p": 2, "h": -6, "n": "Costa Rica", "l": 1},
        "UY": {"p": 2, "h": -3, "n": "Uruguay", "l": 1},
        "EC": {"p": 2, "h": -5, "l": 1},
        "NG": {"p": 2, "h": -6, "l": 1},
        "PA": {"p": 2, "h": -5, "l": 1},
        "HN": {"p": 2, "h": -6, "n": "Honduras", "l": 1},
        "PY": {"p": 2, "h": -4, "n": "Paraguay", "l": 1},
        "SV": {"p": 2, "h": -6, "n": "El Salvador", "l": 1},
        "GT": {"p": 2, "h": -6, "n": "Guatemala", "l": 1},
        "DO": {"p": 2, "h": -4, "l": 1},
        "BR": {"p": 2, "h": -3, "l": 0},
    
        /* 3 */
        "FR": {"p": 3},
        "PT": {"p": 3, "h": 0},
        "AD": {"p": 3, "n": "Andorra"},
        "IT": {"p": 3},
        "GB": {"p": 3, "h": 0, "n": "GB"},
        "IE": {"p": 3, "h": 0, "n": "Ireland"},
        "US": {"p": 3, "h": -4},
        "CA": {"p": 3, "h": -6},
        "MZ": {"p": 3, "n": "Mozambique"},
        /* 9 */
        "DZ": {"n": "Algeria"},
        "BE": {"n": "Belgium"},
        "CN": {"n": "China"},
        "DE": {"n": "Germany"},
        "JO": {"n": "Jordan"},
        "MA": {"n": "Morocco", "h": 1},
        "SE": {"n": "Sweden"},
        "CH": {"n": "Switzerland"},
        "TH": {"n": "Thailand"},
        "AU": {"h": 10}
    };

    const GENEROS = {"m": 1, "male": 1, "c": 2, "couple": 2, "f": 3, "female": 3};

    const TXTS = [
        ["hi", "hola"],
        ["I don't bite", "no muerdo :P"],
        ["wait", "espera"],
        ["do not be ashamed, I like to be watched :)", "no me importa, puedes mirar :P"]
    ];

    const audio1 = new Audio(RAIZ + "MOUSE_CLICK.ogg");
    const audio2 = new Audio(RAIZ + "beep.ogg");
    const audio3 = new Audio(RAIZ + "lb.ogg");
    const audio4 = new Audio(RAIZ + "Kia.ogg");
    const audio5 = new Audio(RAIZ + "COMM_SqueeChirp.ogg");

    var RLTS = [];

    (function generarGui () {
        $("body").append(
            $("<nav>")
                .append($('<div id="contador">'))
                .append($("<button>"))
                .append($("<button>"))
                .append($("<button>"))
                .append($("<button>"))
                .append(crearComboPaises())
        );
        $("#localVideo").on("click", function () {
            $(this).toggleClass("max");
        });
    }());

    (function iniciar () {
        RLTS.push(rlt);
        onlineCountries();
        for (let rlt of RLTS) {
            rltController(rlt);
        }
    }());
    
    function crearComboPaises () {
        var $select = $("<select>");
        for (let p of Object.keys(COUNTRIES)) {
            if (COUNTRIES[p].p) {
                $(TG_NEWOPTION).val(p).text(p).appendTo($select);
            }
        }
	    $(TG_NEWOPTION).val("").text("").appendTo($select);
        $select.on("change", cambioPais);
        return $select;
    }

    function cambioPais () {
        let a = $(this).val().toUpperCase();
        for (let rlt of RLTS) {
            rlt.setPreferredCountry(a);
        }
    }

    function onlineCountries () {
        $.getJSON("https://omecam.com/onlineCountries?room=Adult", function (data) {
            usuariosOnline(data["ALL"], data);
        });
    }
    
    function usuariosOnline (c, p) {
        $("#contador").html(c);
        $("nav > select").find("option").each(function (i, obj) {
            var $op = $(obj);
            if (p[$op.val()]) {
                $op.html($op.val() + " (" + p[$op.val()] + ")");
            }
        });
    }

    function rltController (rlt) {
        rlt.setPreferredGender("f");
        rlt.onStatus = function (status, data) {
            console.log("rltController::onStatus", status, data);
            if (status === "connected") {
                $("#remoteVideo").show();
                $("#flag")
                    .html(data.Country + " - " + data.State)
                    .removeClass(function (index, className) {
                        return (className.match (/(^|\s)flag-\S+/g) || []).join(' ');
                    })
                    .addClass("flag-" + data.Country.toLowerCase());
                $("#gender")
                    .removeClass(function (index, className) {
                        return (className.match (/(^|\s)gndr_\S+/g) || []).join(' ');
                    })
                    .addClass("gndr_" + (data.Gender === 'f' ? 'female' : (data.Gender === 'c' ? 'couple' : 'male')));
            }
        };
    }

}());