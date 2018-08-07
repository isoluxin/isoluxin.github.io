(function () {

    const RAIZ = location.protocol === "file:" ? "../" : "https://isoluxin.github.io/";

    const TG_NEWOPTION = "<option>";
    const CL_ON = "on";

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

    const GENEROS = {"m": "male", "c": "couple", "f": "female"};

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
        document.title = "Document";
        $("body").append(
            $("<nav>")
                .append($('<div id="contador">'))
                .append($('<button>C-CH</button>').on("click", function () {
                    aplicarRuletas("changeCamera");
                }))
                .append($('<button class="on">C-ON</button>').on("click", function () {
                    $(this).toggleClass(CL_ON);
                    aplicarRuletas("setVideo", $(this).hasClass(CL_ON));
                }))
                .append($('<button class="on">A-ON</button>').on("click", function () {
                    $(this).toggleClass(CL_ON);
                    aplicarRuletas("setAudio", $(this).hasClass(CL_ON));
                }))
                .append($('<button data-f="">F-T</button>').on("click", filtrarPorGenero))
                .append($('<button data-f="f">F-F</button>').on("click", filtrarPorGenero))
                .append($('<button data-f="c">F-C</button>').on("click", filtrarPorGenero))
                .append(crearComboPaises())
        ).append($('<div id="hud">'));
        $("#localVideo").on("click", function () {
            $(this).toggleClass("max");
        });

        function filtrarPorGenero () {
            $("button[data-f]").removeClass(CL_ON);
            $(this).addClass(CL_ON);
            aplicarRuletas("setPreferredGender", $(this).data("f"));
        }

        function crearComboPaises () {
            var $select = $("<select>");
            for (let p of Object.keys(COUNTRIES)) {
                if (COUNTRIES[p].p) {
                    $(TG_NEWOPTION).val(p).text(p).appendTo($select);
                }
            }
            $(TG_NEWOPTION).val("").text("").appendTo($select);
            $select.on("change", function () {
                aplicarRuletas("setPreferredCountry", $(this).val().toUpperCase());
            });
            return $select;
        }
    }());

    (function iniciar () {
        RLTS.push(window.rlt || {});
        onlineCountries();
        for (let rlt of RLTS) {
            rltController(rlt);
        }
    }());

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
        rlt.onStatus = function (status, data) {
            switch (status) {
                case "peerFound":
                    console.log("rltController-peerFound", data);
                    rlt.user = storage.get(data);
                    rlt.iLocal = infoLocal(rlt.user);
                    addToHud(rlt.user, rlt.iLocal);
                    if (!controlConexion(rlt.user, data)) {
                        rlt.reset();
                    }
                    break;

                case "connected":
                    if (!rlt.user || !rlt.iLocal) {
                        console.error("rltController-connected: falta info!!", rlt.user, rlt.iLocal);
                    }
                    guiDRConnected(rlt.user, rlt.iLocal);
                    audioConexion(rlt.user);
                    conexionRealizada(rlt.user);
                    break;

                case "reset":
                    guardarChat();
                    rlt.user = null;
                    rlt.iLocal = null;
                    break;

                default:
                    break;
            }
        };

        var bakOnChat = rlt.onChat;
        rlt.onChat = function () {
            bakOnChat();
            audio4.play();
        };
    }

    function guiDRConnected (user, iLocal) {
        $("#remoteVideo").show();
        $("#flag")
            .html(iLocal.str)
            .removeClass(function (index, className) {
                return (className.match (/(^|\s)flag-\S+/g) || []).join(' ');
            })
            .addClass(`flag flag-${iLocal.pais.toLowerCase()}`);
        $("#gender")
            .removeClass(function (index, className) {
                return (className.match (/(^|\s)gndr_\S+/g) || []).join(' ');
            })
            .addClass("gndr_" + GENEROS[user.ge]);
    }

    function controlConexion (user, data) {
        if (user.bloq) {
            return false;
        }
        return true;
    }

    function audioConexion (user) {
        if (user.co === RLTS[0].localDescription().State) {  //TODO PROBAR
            audio5.play();
        } else if (user.ge === "f") {
            audio3.play();
        } else if (user.ge === "c") {
            audio2.play();
        } else {
            audio1.play();
        }
    }

    function conexionRealizada (user) {
        user.cn = user.cn + 1;
        user.vi.push(Date.now());
        storage.set(user.id, null, user);
        $("#hud > .fila:first-child").addClass("vi");
    }

    function guardarChat () {
        let $conversacion = $("#conversation");
        let mensajes = $conversacion.children();
        if (mensajes.length > 6) {
            let contenido = "";
            for (let mens of mensajes) {
                contenido += mens.innerHTML;
            }
            storage.saveChat(contenido);
        }
        $conversacion.empty();
    }

    function aplicarRuletas (funcion, parametro) {
        for (let rlt of RLTS) {
            rlt[funcion](parametro);
        }
    }

    function infoLocal (user) {
        let pais = COUNTRIES[user.pa];
        let paisStr = (pais && pais.n) ? pais.n : user.pa;
        return {
            str: function () {
                return paisStr + (user.co ? (" (" + user.co) + ")" : "");
            }(),
            pais: user.pa,
            paisStr: paisStr,
            idioma: function () {
                if (pais) {
                    if (pais.l) {
                        return pais.l;
                    }
                    if (pais.p < 3) {
                        return 1;
                    }
                }
                return 0;
            }(),
            hora: function () {
                let ahora = new Date();
                if (!(pais && pais.h)) {
                    return ahora.toLocaleTimeString();
                }
                return diez(ahora.getUTCHours() + pais.h) + ":" + diez(ahora.getMinutes());
            }()
        };
    }

    function diez (s) {
        return (s < 10 ? "0" : "") + s;
    }

    function addToHud (user, iLocal) {
        $("#hud").prepend(
            $("<div>")
                .addClass("fila")
                .toggleClass("bl", user["bloq"] === true)
                .toggleClass("fa", user["fav"] === true)
                .toggleClass("sa", user["salt"] === true)
                .data("id", user.id)
                .html(`${iLocal.hora} ${user.ge.toUpperCase()} ${iLocal.str} ${user.id}`)
                .append(`<a onclick="favorito(this);">F</a>`)
                .append(`<a onclick="salta(this);">S</a>`)
                .append(`<a onclick="bloquea(this);">B</a>`)
                .attr("title", user.na)
        );
    }

    window.favorito = function (e) {
        let $p = $(e).parent();
        $p.toggleClass("fa", marcar($p, "fav"));
    };

    window.salta = function (e) {
        let $p = $(e).parent();
        $p.toggleClass("sa", marcar($p, "salt"));
    };

    window.bloquea = function (e) {
        let $p = $(e).parent();
        $p.toggleClass("bl", marcar($p, "bloq"));
    };

    function marcar ($target, propiedad) {
        var id = $target.data("id");
        var obj = storage.set(id, propiedad);
        return obj[propiedad];
    }

    window.storage = {
        set: function (id, propiedad, valor) {
            var user = window.storage.get({Id: id});
            if (propiedad) {
                user[propiedad] = valor ? valor : !user[propiedad];
            } else {
                user = valor;
            }
            //console.log("storage-set", user);
            localStorage["dr_u_" + id] = JSON.stringify(user);
            return user;
        },
        get: function (data) {
            var user = localStorage["dr_u_" + data.Id];
            if (user) {
                return JSON.parse(user);
            }
            return {
                id: data.Id,
                ge: data.Gender,
                pa: data.Country,
                co: data.State,
                na: data.Browser + "|" + data.CamName,
                cn: 0,
                vi: [],
                sa: 0
            };
        },
        saveChat: function (obj) {
            var key = "dr_c_" + new Date().toJSON();
            localStorage[key] = JSON.stringify(obj);
            return key;
        }
    };
/*
    window.addHud = function () {
        var simulacion = [
            {Id: "564dsf564sd", Gender: "f", Country: "ES", State: "Madrid", UserAgent: "Gecko"},
            {Id: "5646874ds8f", Gender: "f", Country: "ES", State: "Madrid", UserAgent: "Gecko"},
            {Id: "231we5ds65d6s", Gender: "c", Country: "CL", State: "Valencia", UserAgent: "Gecko"}
        ];
        for (let data of simulacion) {
            var user = storage.get(data);
            //storage.set(user.id, null, user);
            addToHud(user, infoLocal(user));
        }
    }

    addHud();
*/
    //  TODO: on adv -> next

}());