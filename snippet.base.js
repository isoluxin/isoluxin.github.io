const RAIZ = "https://isoluxin.github.io/";
const CL_C = "c";
const CL_ON = "on";
const CL_MAX = "max";
const CL_EXT = "ext";
const CL_BLINK = "bl";
const CL_MIN = "min";
const CL_FAV = "f";
const CL_BAN = "b";
const CL_RET = "r";
const CL_DUD = "du";
const CL_DUR = "d";
const CL_PRELV = "plv";
const CL_LV = "lv";
const CL_VIS = "cv";
const CL_ROT = "rotar";
const EV_CLICK = "click";
const EV_DBLCLICK = "dblclick";
const DT_INDEX = "index";
const DT_ACCION = "accion";
const DT_ID = "id";
const DT_TS = "ts";
const LS_PREFIJO = "ij_";
const LS_ALMACEN = LS_PREFIJO + "DATOS";
const TG_NEWDIV = "<div>";
const TG_NEWSPAN = "<span>";
const TG_NEWLI = "<li>";
const TG_NEWOPTION = "<option>";
const TG_NEWH1 = "<h1>";
const TG_NEWHR = "<hr>";
const AT_TITLE = "title";
const ES_FAV = 1;
const ES_BAN = 2;
const ES_DUD = 3;
const ES_RET = 4;
const SL_CAM = ".cam";
const SL_CAMC = ".cam.c";
const SL_ONOFF = "#onoff";
const SL_LOCALV = "#localVideo";
const SL_AVANCE = "#avance";
const SL_SELECT = "select";
const SL_ASIDENAV = "aside > nav";
const HORA = 3600000;
const T_RET = 900000;

const TOTAL = window.count || 4;
const SES_LIM = 105;
var RLTS = window.all || [];
var CONN = [];
var RMAX = [];

var ALMACEN = {};
window.tInfoScr = [];
window.tSeguro;

var controller;
var videoOn = true;
var audioOn = true;
const initParams = {'Gender': 'm'};

//  Que es esto??
var modal = null;

var camSesion = 0;

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
	//"--": {"p": 2, "h": -6, "n": "Guatemala"},
	"DO": {"p": 2, "h": -4, "l": 1},
	"BR": {"p": 2, "h": -3, "l": 0},

	/* 3 */
	"FR": {"p": 3},
	"PT": {"p": 3},
	"AD": {"p": 3, "n": "Andorra"},
	"IT": {"p": 3},
	"GB": {"p": 3, "h": 1, "n": "GB"},
	"IE": {"p": 3, "h": 1, "n": "Ireland"},
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


function iniciar () {
    $(SL_LOCALV).insertAfter($(".cams"));
	//$(SL_LOCALV)[0] ? $(SL_LOCALV)[0].play() : "";
	RLTS[0].requestLocalCamera();
    $(SL_ONOFF).on(EV_CLICK, function () {
		let $boton = $(this);
        let apagar = $boton.hasClass(CL_ON);
        for (let i in RLTS) {
            if (apagar) {
                RLTS[i].quit();
            } else {
                RLTS[i].init(initParams);
                if (i === 0) {
                    RLTS[i].requestUserCount();
                }
            }
            $(SL_CAMC + i).toggleClass(CL_ON, !apagar);
        }
		if (apagar) {
			persistirDatos();
            estadisticas();
		}
        $boton.toggleClass(CL_ON);
    });
    historial();
    $("button.clon").on(EV_CLICK, function () {
		let $boton = $(this);
		$boton.toggleClass(CL_ON);
		let id = $boton.data(DT_ID);
		if (id) {
			$("div." + id).toggleClass(CL_ON);
		}
	});
	generarSelect();

    $(SL_LOCALV).on(EV_CLICK, function () {
        $(this).toggleClass(CL_MAX);
    }).on(EV_DBLCLICK, function () {
        $(this).toggleClass("ch");
    });

	$("#lanza").on(EV_CLICK, function () {
		persistirDatos();
		setTimeout(function () {
			window.close();
		}, 5000);
	});

	$("#camara").on(EV_CLICK, function () {
		for (let r of RLTS) {
			r.changeCamera();
			console.log("cambiando camara");
		}
	});

	$("#pais").on("keyup", function (e) {
		if (e.keyCode == 13) {
			countryChange.call(this);
		}
	});

	crearGrid();
    cargarDatosPersistidos();
	$(document).on("keydown", controlPorTeclado);
	onlineCountries();
	$("#contador").on(EV_CLICK, onlineCountries);
}

function crearGrid () {
	var $templates = $(".templates");
	for (let i = 0; i < TOTAL; i++) {
		//	Cámara:
		var $nuevaCam = $templates.find(SL_CAM).clone();
		$("section.cams").append($nuevaCam);
		$nuevaCam.addClass(CL_C + i);
		$nuevaCam.data(DT_INDEX, i);
        $("#remoteVideo" + i).appendTo($nuevaCam.find(".vid"));
		var botonesCam = $nuevaCam.find("button").each (function (index) {
			$(this)
                .on(EV_CLICK,
				    {index: $(this).closest(SL_CAM).data(DT_INDEX)},
				    clickBotonesCam[index]);
		});

		//	Info:
		$nuevaCam.find(".info").on("mouseover", function () {
			var index = $(this).closest(SL_CAM).data(DT_INDEX);
			clearTimeout(window.tInfoScr[index]);
		}).on("mouseout", function () {
			var $info = $(this);
			var index = $info.closest(SL_CAM).data(DT_INDEX);
			window.tInfoScr[index] = setTimeout(function () {
				$info.scrollTop(0);
			}, 3000);
		});

        //  Chat:
        let $nuevoChat = $nuevaCam.find(".chat");
        $nuevoChat.find("h1").append(CL_C + i);
		$nuevoChat.find("form").on("submit", function () {
			let $input = $(this).find("input[name=texto]");
			if ($input.val() === "") {
				return false;
			}
            let $cam = $(this).closest(SL_CAM);
            let indice = $cam.data(DT_INDEX);
			let $txt = $cam.find(".txt");
            try {
                addTxtAlChat($txt, $input.val(), true);
                RLTS[indice].chat($input.val());
                //console.log("Enviado al chat", indice, "texto", $input.val())
            } catch (err) {
                console.log(err);
            }
			$input.val("");
			return false;
		});

        //  Control:
        rltControl(i);

        //  Pais preferido:
        RLTS[i].setPreferredCountry($(SL_SELECT).val());
	}
	$templates.remove();
}

var clickBotonesCam = [
	maximizar, onoff, retrasar, favorito, banear,
	rotar, chatear, saludar1, saludar2, siguiente
];


function maximizar (e) {
	var index = e.data.index;
	$cam = $(this).closest(SL_CAM);
	$cam.toggleClass(CL_MAX);
	var maxi = $cam.hasClass(CL_MAX);
	$(".chat.on").removeClass(CL_ON);
	if (maxi) {
		$(SL_CAMC + index + " .chat").addClass(CL_ON);
		window.tSeguro = setTimeout(function () {
			$("#seguro").addClass(CL_ON);
		}, 2500);
	} else {
		clearTimeout(window.tSeguro);
		$("#seguro").removeClass(CL_ON);
		$("video").removeClass(CL_ROT);
	}
	for (let i = 0; i < TOTAL; i++) {
		if (i === index) {
			continue;
		}
		if (maxi) {
			var $cam = $(SL_CAMC + i);
			RMAX[i] = $cam.hasClass(CL_ON);
			if (RMAX[i]) {
				RLTS[i].quit();
				$cam.removeClass(CL_ON);
			}
		} else if ($(SL_ONOFF).hasClass(CL_ON) && RMAX[i]) {
			RLTS[i].init(initParams);
			$(SL_CAMC + i).addClass(CL_ON);
		}
	}
}

function saludar (e, txt) {
	let index = e.data.index;
	txt = TXTS[txt];
	let cam = leerDatos(CONN[index]);
	if (cam) {
		txt = txt[getPaisLng(cam.c)];
	}
	if (!txt) {
		return;
	}
	$chat = $(SL_CAMC + index + " .chat");
	$chat.toggleClass(CL_ON, true);
	let $inputs = $chat.find("input");
	$($inputs[0]).val(txt);
	$($inputs[1]).trigger(EV_CLICK);
	$(SL_CAMC + index + " ." + CL_BLINK).removeClass(CL_BLINK);	//TODO BLINK FUNCIONA?
}

function saludar1 (e) {
	saludar(e, 0);
}

function saludar2 (e) {
	saludar(e, 1);
}

function chatear (e) {
	let index = e.data.index;
	let $chat = $(SL_CAMC + index + " .chat");
	$chat.toggleClass(CL_ON);
	if ($chat.hasClass(CL_ON)) {
		$($chat.find("input")[0]).focus();
	}
	$(this).removeClass(CL_BLINK);
}

function marcar (e, estado, clase, saltar) {
	let index = e.data.index;
	let $seleccionados = $(SL_CAMC + index + " .info div." + CL_ON);
	let unico = false;
	if ($seleccionados.length === 0) {
		let vistos = getInfoLineas(index);
		$seleccionados = $(vistos[0]);
		console.log("Marcar:", new Date().getTime() - $seleccionados.data(DT_TS));
		unico = true;
		if (vistos.length > 1 && new Date().getTime() - $seleccionados.data(DT_TS) < 350) {
			$seleccionados = $(vistos[1]);
			console.info("PREVIO!!!");
			unico = false;
		} else if (saltar) {
			RLTS[index].next();
			let idS = $seleccionados.data(DT_ID);
			$("div.info div:first-child").each(function (i, e) {
				if ($(e).hasClass(idS)) {
					RLTS[i].next();
					console.log("Marcar >> Saltando", idS, i);
				}
			});
		}
	}
	$seleccionados.each(function () {
		toggleMarcar($(this).data(DT_ID), estado);
	});
	$seleccionados.toggleClass(clase);
	$seleccionados.removeClass(CL_ON);
	return unico;
}

function banear (e) {
	marcar(e, ES_BAN, CL_BAN, !$("#seguro").hasClass(CL_ON));
}

function favorito (e) {
	marcar(e, ES_FAV, CL_FAV, false);
}

function rotar (e) {
	var index = e.data.index;
	$(SL_CAMC + index + " video").toggleClass(CL_ROT);
}

function onoff (e) {
	let index = e.data.index;
	let $cam = $(SL_CAMC + index);
	let apagar = $cam.hasClass(CL_ON);
	if (apagar) {
		RLTS[e.data.index].quit();
	} else {
		RLTS[e.data.index].init(initParams);
	}
	$cam.toggleClass(CL_ON, !apagar);
	let todosOff = $(".cam." + CL_ON).length === 0;
	$(SL_ONOFF).toggleClass(CL_ON, !todosOff);
	if (todosOff) {
		persistirDatos();
		estadisticas();
	}
}

function siguiente (e) {
	if ($("#seguro").hasClass(CL_ON)) {
		return;
	}
	RLTS[e.data.index].next();
}

function retrasar (e) {
	marcar(e, ES_RET, CL_RET, true);
}


function rltControl (index) {
    let rlt = RLTS[index];
	if (!controller) {
		controller = rlt;
		rlt.onModal = modal;
		rlt.onLocalStream = function(s) {
			for (var i = 0; i < TOTAL; i++) {
				RLTS[i].updateStream(s, videoOn, audioOn);
			}
		};

		rlt.onListDevices = function (devices) {
			console.log("OOHH! onListDevices", devices);
			//$('#switchCameraBtn').css('display', devices.length > 1? 'block' : 'none');
		};

		rlt.onUserCount = usuariosOnline;
		// if (index === 0) {
		// 	rlt.requestUserCount();
		// }
	} else {
		rlt.onModal = function(a,b,c,d) {
			console.log("OOHH! onModal controller OK");
			/*
			if (['report', 'reported', 'mod'].indexOf(a) > -1) {
				modal(a,b,c,d);
			}
			*/
		};
	}

	//	onLoading:
	rlt.onLoading = function (on) {
        console.log("ONLOADING", index, on);
		$(SL_CAMC + index).toggleClass(CL_PRELV, on).toggleClass(CL_LV, !on);
	};

    rlt.onQuit = function (d) {
        //console.log("ONQUIT", d);
    };

	//	onStatus:
	rlt.onStatus = function (status, data) {
		function controlSalta (index) {
			if (CONN[index] === -1) {
				setTimeout(function () {
					RLTS[index].next();
				}, 150);
				CONN[index] = null;
			}
		}
		console.log("RLT" + index, status, CONN[index], data);
		switch (status) {
			case 'peerFound':
				camSesion++;
                if (camSesion === SES_LIM) {
					$(SL_ASIDENAV).addClass("lim");
                }
                let obj = preConnect(data);
                CONN[index] = obj.i;
                let $linea = mostrarInfo(index, obj);
                if (controlConnect(obj, $linea, index)) {
					//console.log("(1)PEERFOUND RESET");
                    RLTS[index].reset();
					CONN[index] = -1;
					if (camSesion > SES_LIM) {
						$(SL_CAMC + index + "." + CL_ON).find(".onoff").trigger(EV_CLICK);
					}
				}
				break;
            case 'connecting':
                if (data === false || (RLTS[index].remoteDescription() !== null && CONN[index] === -1)) {
					RLTS[index].next();
				} else if (data === true) {
					$(SL_CAMC + index + "." + CL_ON).addClass(CL_PRELV);
				}
                break;
			case 'connected':
				controlSalta(index);
                if (CONN[index]) {
                    //console.log("onStatus-connected", CONN[index]);
                    postConnect(leerDatos(CONN[index]), index);
					$(SL_CAMC + index + "." + CL_ON).removeClass(CL_PRELV);
                }
				break;
			case 'reset':
				controlSalta(index);
				resetConnect(CONN[index], index);
				$(SL_CAMC + index + "." + CL_ON).removeClass(CL_PRELV).removeClass(CL_LV);
				break;
		}
		if (rlt === controller) {
			/*
			switch (status) {
				case 'audioEnabled': audioOn = data; setButtonEnabled('audio', data); break;
				case 'videoEnabled': videoOn = data; setButtonEnabled('video', data); break;
				case 'streamAvailable':
					if (data.type == 'local')
						$('#localVideo').css('display', data.available? 'block' : 'none');
				break;
			}
			*/
		}
	};

	rlt.onChat = function (text) {
        let $cam = $(SL_CAMC + index);
        addTxtAlChat($cam.find(".txt"), text, false);
		if ($(".cam.max .chat.on").length === 0) {
			$cam.find(".chat").addClass(CL_ON);
		} else if (!$cam.find(".chat").hasClass(CL_ON)) {
            $($cam.find("button")[0]).addClass(CL_BLINK);
        }
        audio4.play();
	};

    rlt.onplaying = function (data) {
        console.log(data);
    };
}

function guardarLog ($chat, obj) {
	let txt = $chat.html().trim();
    if (obj && txt.length > 0) {
        $("div.log")
            .prepend(TG_NEWHR)
            .prepend(txt)
            .prepend($(TG_NEWH1).append(new Date().toLocaleString() + ", " + obj.i + ", " + obj.c + ", " + obj.s + ", " + obj.g));
        }
	if (txt.length < 125) {
		return;
	}
    let id = "cl" + LS_PREFIJO + new Date().toISOString().replace(/[:.-]/g , "_");
	txt = "<div>" + obj.i + "-" + obj.g + "-" + obj.c + "-" + obj.s + "</div>" + txt;
    localStorage[id] = JSON.stringify(txt);
    //console.log("guardarLog", id, txt);
}

function addTxtAlChat ($chat, txt, local) {
	// console.log("addTxtAlChat Index", $chat, $chat.data(DT_INDEX), txt, local);
	$chat.append(
		$(TG_NEWDIV)
			.addClass(local ? "l" : "r")
			.append($(TG_NEWSPAN).append(txt))
			.attr(AT_TITLE, new Date().toLocaleTimeString())
	);
	$chat.scrollTop($chat[0].scrollHeight);
}

function newTag(tag, contenido, clase) {
	if (contenido === "" || contenido == undefined) {
		return;
	}
	return $(tag)
			.append(contenido)
			.addClass(clase);

}

/*  ALMACENAMIENTO  */

function leerDatos (id) {
    if (!id || id === -1) {
        return null;
    }
    if (ALMACEN[id]) {
        return ALMACEN[id];
    }
    let similar = idSimilar(id);
	ALMACEN[id] = similar ? jQuery.extend({}, similar) : {};
    return ALMACEN[id];
}

function idSimilar(id) {
	id = id.substring(0, id.length - 2);
	let clave = Object.keys(ALMACEN).find(function (e) {
		return e.startsWith(id);
	});
	return clave ? ALMACEN[clave] : null;
}

function cargarDatosPersistidos () {
	let datos = localStorage[LS_ALMACEN];
	datos = datos ? JSON.parse(datos) : {};
	const tCache = HORA * 11;
	let ahora = new Date().getTime();
    for (let key of Object.keys(datos)) {
        let obj = datos[key];
		let maxT = (obj.e !== ES_FAV) ? tCache : HORA * 360;
        if ((obj && !Array.isArray(obj.t)) ||
                (obj && obj.t.length === 0 && obj.e !== ES_FAV && obj.e !== ES_BAN) ||
                (obj && (ahora - obj.t[obj.t.length - 1] > maxT))) {
			//console.info("Borrando:", obj);
            delete datos[key];
        }
        if (!Array.isArray(obj.t) || obj.t.length === 0) {
        	obj.t = [ahora];
        }
    }
	ALMACEN = datos;
	persistirDatos();
	estadisticas();
}

function persistirDatos () {
	localStorage[LS_ALMACEN] = JSON.stringify(ALMACEN);
	$(SL_ASIDENAV).addClass("sv");
	setTimeout(function () {
    	$(SL_ASIDENAV).removeClass("sv");
	}, 500);
}

/*  ************************   */

function preConnect (remoto) {
    //console.log("preConnect", remoto.Id);
    let obj = leerDatos(remoto.Id);
	if (Object.keys(obj) === 0) {
		console.warn("No está:", remoto.Id, obj);
	}
    let objNuevo = (Object.keys(obj).length === 0);
    obj.i = remoto.Id;
	let g = obj.g;
    obj.g = getGenero(remoto.Gender);
	if (g != null && g !== obj.g && obj.e !== ES_FAV) {
		obj.e = ES_DUD;
	}
    obj.c = remoto.Country;
    obj.s = remoto.State;
    obj.n = remoto.Browser;
	obj.v = (obj.v ? obj.v : 0) + 1;
    if (!remoto.HasVideo) {
        obj.r = true;
    }
    if (objNuevo) {
        obj.t = [];
    }
    return obj;
}

function mostrarInfo (index, obj) {
    let ahora = new Date();
    $linea = $(TG_NEWDIV);
    $linea
        .data(DT_ID, obj.i)
        .addClass(obj.e === ES_FAV ? CL_FAV : null)
        .addClass(obj.e === ES_BAN ? CL_BAN : null)
		.addClass(obj.e === ES_DUD ? CL_DUD : null)
        .addClass("g" + obj.g)
		.addClass(obj.o > 30 ? CL_DUR : null)
        .append(newTag(TG_NEWSPAN, horaLocal(obj.c), CL_MIN))
        .append(newTag(TG_NEWSPAN, getPais(obj.c), "p" + paisOk(obj.c)))
        .append(newTag(TG_NEWSPAN, obj.s, CL_MIN + " " +
            ((obj.c === $(SL_SELECT).val() ||
                obj.c === RLTS[index].localDescription().Country) ? "" : CL_EXT)))
		.append(newTag(TG_NEWSPAN, obj.r ? "&#128249;" : null, "tachado"))
        .append(newTag(TG_NEWSPAN, obj.i, CL_EXT + " " + CL_MIN))
        .append(newTag(TG_NEWSPAN, obj.t.length === 0 ? "&#x2731;" : obj.t.length))
        .append(newTag(TG_NEWSPAN, obj.t.length === 0 ? null :
            getUltimoVisto(ahora.getTime(), obj.t[obj.t.length - 1])))
		.append(newTag(TG_NEWSPAN, obj.o > 0 ? "&#128336; " + (obj.o / 60).toFixed(1) : null))
        .attr(AT_TITLE, obj.s + ", " + obj.n + ", " + obj.i + "\n" + getConexiones(obj.t))
        .on(EV_CLICK, function () {
            $(this).toggleClass(CL_ON);
        });
	$(SL_CAMC + index + " .info").prepend($linea);
	// console.log("mostrarInfo" + index, $linea.parent().html());
    return $linea;
}

function postConnect (obj, index) {
    if (!obj) {
        return;
    }
    let $linea = getInfoLinea(index, obj.i) || mostrarInfo(index, obj);
	let ahora = new Date().getTime();
	$linea.data(DT_TS, ahora);
    obj.t = obj.t || [];
    obj.t.push(ahora);
    $linea.addClass(CL_LV + " " + CL_VIS);
}

function controlConnect (obj, $linea, index) {
    if (obj.e === ES_BAN ||
            (obj.r && obj.g !== 3 && obj.e !== ES_FAV) ||
            (obj.t.length > 3 && obj.g < 2 && obj.e !== ES_FAV) ||
            ($("#paisesOk").hasClass(CL_ON) && paisOk(obj.c) === -1 && obj.e !== ES_FAV && obj.g < 2) ||
			(obj.e === ES_RET && obj.t.length > 0 && new Date().getTime() - obj.t[obj.t.length - 1] < T_RET)) {
        if ($linea) {
            $linea.addClass("sa");
        }
        return true;
    }

    //  Misma comunidad:
    if (obj.s === RLTS[index].localDescription().State) {
        audio5.play();
    }

    if ((obj.g < 2) && obj.e !== ES_FAV) {
        audio1.play();
		/*
        if ($(SL_AVANCE).hasClass(CL_ON)) {
            if (obj.t.length !== 1) {
                return true;
            }
            window.timer = setTimeout(function (index) {
                var desc = RLTS[index].remoteDescription();
                if (!desc || !$(SL_LOCALV).hasClass(CL_ON)) {
                    return;
                }
                if (getGenero(desc.Gender) === 1) {
                    rlt.next();
                }
            }(index), 4000);
        }
		*/
        return;
    } else if (obj.g === 2 && obj.e !== ES_FAV) {
        audio2.play();
        return;
    }
    audio3.play();
}


function resetConnect (id, index) {
	//console.log("resetConnect", id, index);

	let $linea = getInfoLinea(index);
	if (!id) {
		id = $linea.data(DT_ID);
		//console.warn("resetConnect sin ID", index, id, $linea);
	}
	let obj = leerDatos(id);
	console.log("resetConnect", obj);

	//	Control tiempo online:
	if ($linea.length > 0 && obj && obj.t) {
		let ultCon = obj.t[obj.t.length - 1];
		let tOnline = (new Date().getTime() - ultCon) / 1000;
		if (tOnline > 7) {
			obj.o = obj.o || 0;
			obj.o += parseInt(tOnline);
		}
	}

	//	Control indicadores + chat:
	$linea.removeClass(CL_LV);
	let $cam = $(SL_CAMC + index);
	let $chat = $cam.find(".txt");
	guardarLog($chat, obj);
	$chat.empty();
	$cam.find("input[name=texto]").val("");
	$cam.find("." + CL_BLINK).removeClass(CL_BLINK);
	if (!$cam.hasClass(CL_MAX)) {
		$chat.closest(".chat").removeClass(CL_ON);
	}
}

/***************************************/

function getGenero (g) {
	var r = GENEROS[g];
	return r ? r : 0;
}

function getInfoLinea (index, id) {
    let $linea = $(SL_CAMC + index + " div.info > div:first-child");
	if (!id) {
		return $linea;
	}
    if ($linea.data(DT_ID) === id) {
        return $linea;
    }
    return $linea;
}

function getInfoLineas (index, n) {
	return $(SL_CAMC + index + " div.info > div." + CL_VIS);
}

function getUltimoVisto (ts1, ts2) {
    return formatearSegundos(((ts1 - ts2) / 1000));
}

function formatearSegundos (sec) {
	let days = Math.floor(sec/86400);
	let leftSec = sec - days * 86400;

	let hrs = Math.floor(leftSec/3600);
	leftSec = leftSec - hrs * 3600;
	hrs = hrs > 0 ? hrs + ":" : "";

	let min = Math.floor(leftSec/(60));
	leftSec = Math.floor(leftSec - min * 60);

	return hrs + diez(min) + ":" + diez(leftSec);
}

function diez (s) {
    return (s < 10 ? "0" : "") + s;
}

function getPais (p) {
	let pais = COUNTRIES[p];
	return (pais && pais.n) ? pais.n : p;
}

function paisOk (p) {
	let pais = COUNTRIES[p];
	return (pais && pais.p) ? pais.p : -1;
}

function getPaisLng (p) {
	let pais = COUNTRIES[p];
	if (pais) {
		if (pais.l) {
			return pais.l;
		}
		if (pais.p < 3) {
			return 1;
		}
	}
	return 0;
}

function horaLocal (p) {
	let pais = COUNTRIES[p];
	let ahora = new Date();
	if (!(pais && pais.h)) {
		return ahora.toLocaleTimeString();
	}
	return diez(ahora.getUTCHours() + pais.h) + ":" + diez(ahora.getMinutes());
}

function horaLocal2 (p) {
	let pais = COUNTRIES[p];
	let h = (pais && pais.h) ? pais.h : 0;
	let fecha = new Date();
	fecha.setTime(fecha.getTime() + h * 3600000);
	return fecha.toLocaleTimeString();
}

//  CONTROL FAVORITOS Y BANEOS:

function toggleMarcar (id, tipo) {
    let obj = leerDatos(id);
    if (!obj) {
        return;
    }
    if (obj.e === tipo) {
        delete obj.e;
    } else {
        obj.e = tipo;
    }
    console.log("toggleMarcar", tipo, id, obj);
}

function getConexiones (conarray) {
    let str = "";
    for (let i = 0; i < conarray.length; i++) {
        str += (i === 0 ? "" : ", " ) +
                new Date(conarray[i]).toLocaleTimeString();
    }
    return str;
}

function generarSelect () {
	var $select = $(SL_SELECT);
	for (let p of Object.keys(COUNTRIES)) {
		if (COUNTRIES[p].p) {
			$(TG_NEWOPTION).val(p).text(p).appendTo($select);
		}
	}
	$(TG_NEWOPTION).val("").text("").appendTo($select);
	$select.on("change", countryChange);
}

function countryChange () {
	let a = $(this).val().toUpperCase();
	console.log("countryChange", a);
	for (let rlt of RLTS) {
		rlt.setPreferredCountry(a);
	}
}

function estadisticas () {
	let g3 = 0, g2 = 0, r = 0, f = 0, b = 0;
	let ides = Object.keys(ALMACEN);
	for (let i = 0; i < ides.length; i++) {
		let obj = ALMACEN[ides[i]];
		if (obj.e !== ES_FAV && obj.e !== ES_BAN) {
			if (obj.g === 2) {
				g2++;
			} else if (obj.g === 3) {
				g3++;
			}
		} else if (obj.e === ES_FAV) {
			f++;
		} else if (obj.e === ES_BAN) {
			b++;
		}
		r += obj.v;
        /*if (Array.isArray(obj.t)) {
            r += obj.t.length;
        }*/
	}
	$(".stat div:not(#contador)").remove();
	if (ides.length === 0) {
		return;
	}

	$(".stat")
		.append(newTag(TG_NEWDIV, parseInt(g3 * 100 / ides.length) + "% (" + g3 + ")"))
		.append(newTag(TG_NEWDIV, g2))
		.append(newTag(TG_NEWDIV, f))
		.append(newTag(TG_NEWDIV, parseInt(b * 100 / ides.length) + "% (" + b + ")"))
		.append(newTag(TG_NEWDIV, parseInt((r - ides.length) * 100 / r) + "%"))
		.append(newTag(TG_NEWDIV, ides.length));
}

function historial () {
	let $historial = $("#historialLog");
	$historial.empty();
	let claves = Object.keys(localStorage);
	for (let clave of claves) {
		if (clave.indexOf("cl" + LS_PREFIJO) === 0) {
			$historial.append(
				$(TG_NEWLI)
					.data(DT_ID, clave)
					.append(newTag(TG_NEWDIV, clave))
					.append(JSON.parse(localStorage[clave]))
					.addClass(localStorage[clave].length < 400 ? "short" : "")
					.on(EV_CLICK, function () {
						$(this).toggleClass(CL_ON);
					})
			);
		}
	}
	$historial.next().off(EV_CLICK).on(EV_CLICK, function () {
		let $reg = $("#historialLog li." + CL_ON);
		$reg.each(function () {
			localStorage.removeItem($(this).data(DT_ID));
		});
		$reg.remove();
	});

	//	Estadísticas 2:
	$("#est2").off(EV_CLICK).on(EV_CLICK, estadisticasH);
}

function onlineCountries () {
	$.getJSON("https://www.omecam.com:3053/onlineCountries", function (data) {
		usuariosOnline(data["ALL"], data);
	});
}

function usuariosOnline (c, p) {
	$("#contador").html(c);
	$(SL_SELECT).find("option").each(function (i, obj) {
		var $op = $(obj);
		if (p[$op.val()]) {
			$op.html($op.val() + " (" + p[$op.val()] + ")");
		}
	});
}

function estadisticasH () {

	function estadisticas2 () {
		let epais = {};
		let ides = Object.keys(ALMACEN);
		for (let i = 0; i < ides.length; i++) {
			let obj = ALMACEN[ides[i]];
			let contadores = epais[obj.c] || {f: 0, g3: 0, g2: 0, g1: 0, v: 0, b: 0};
			if (obj.e === ES_FAV) {
				contadores.f++;
			} else if (obj.e === ES_BAN) {
				contadores.b++;
			} else if (obj.g === 3) {
				contadores.g3++;
			} else if (obj.g === 2) {
				contadores.g2++;
			} else if (obj.g === 1) {
				contadores.g1++;
			}
			contadores.v += obj.v;
			epais[obj.c] = contadores;
		}
		return epais;
	}

	function mostrar () {
		let r = $("#est2").data("est");
		if (!r) {
			r = [];
			let o = estadisticas2();
			let claves = Object.keys(o);
			for (let k of claves) {
				o[k].s = k;
				r.push(o[k]);
			}
			$("#est2").data("est", JSON.stringify(r));

		} else {
			r = JSON.parse(r);
		}
		r.sort(function (a, b) {
			let p = $("#est2 > span.on").html() || "v";
			return a[p] < b[p];
		});
		let re = "";
		for (let c of r) {
			let s = c.s;
			delete c.s;
			re += s + ":" + JSON.stringify(c) + "<br>";
		}
		$("#est2 > pre").html(re);
	}

	//	Eventos:
	$("#est2 > span").off("click").on("click", function () {
		$("#est2 > span.on").removeClass("on");
		$(this).addClass("on");
		mostrar();
	});

	mostrar();
}

function controlPorTeclado (e) {
	let keycode = (e.keyCode ? e.keyCode : e.which);
	if (e.target.tagName === "INPUT") {
		return;
	}
	if ($("#seguro").hasClass(CL_ON)) {
		console.log("controlPorTeclado seguro");
		return;
	}
	//console.log(e.key, e.target.tagName);
	switch (e.key) {
		case "j": banear({data:{index:0}}); break;
		case "k": banear({data:{index:1}}); break;
		case "m": banear({data:{index:2}}); break;
		case ",": banear({data:{index:3}}); break;
		case "l": siguiente({data:{index:0}}); break;
		case "ñ": siguiente({data:{index:1}}); break;
		case ".": siguiente({data:{index:2}}); break;
		case "-": siguiente({data:{index:3}}); break;
		case "u": retrasar({data:{index:0}}); break;
		case "i": retrasar({data:{index:1}}); break;
		case "o": retrasar({data:{index:2}}); break;
		case "p": retrasar({data:{index:3}}); break;
		default: null;
	}
	if (e.keyCode === 27) {
		$(SL_ONOFF).trigger(EV_CLICK);
	}
	return false;
}

iniciar();
