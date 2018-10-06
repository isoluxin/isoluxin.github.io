//"{"id":"5xpVp89J8TI","ge":"f","pa":"TN","na":"chrome|camera 1, facing front","cn":1,"vi":[1536253795403],"sa":0,"bloq":true}"

(function normalizarUsuarios () {
    let usuarios = 0;
    let tratados = 0;
    let claves = Object.keys(localStorage);
    for (let k of claves) {
        if (!k.startsWith("dr_u_")) {
            continue;
        }
        usuarios++;
        let obj = JSON.parse(localStorage[k]);
        let modificado = false;
        if (!obj.vi || obj.vi.length === 0) {
            obj.vi = [Date.now()];
            modificado = true;
        } else if (new Date(obj.vi[0]).toString() === "Invalid Date") {
            obj.vi[0] = Date.now();
            modificado = true;
        }
        if (modificado) {
            tratados++;
            localStorage[k] = JSON.stringify(obj);
        }
    }
    console.info("normalizarUsuarios: tratados:", tratados, "de", usuarios, "|Claves:", claves.length);
}());

(function quitarAntiguos () {
    const dia = 1000*60*60*24;
    let usuarios = 0;
    let eliminados = 0;
    let favoritos = 0;
    let ahora = Date.now();
    let claves = Object.keys(localStorage);
    for (let k of claves) {
        if (!k.startsWith("dr_u_")) {
            continue;
        }
        usuarios++;
        let obj = JSON.parse(localStorage[k]);
        if (obj.fav) {
            favoritos++;
            console.log(obj);
        } else {
            if (ahora - new Date(obj.vi[0]) > dia * 20) {
                localStorage.removeItem(k);
                eliminados++;
            }
        }
    }
    console.info("quitarAntiguos: eliminados:", eliminados, "de", usuarios, "|Favoritos:", favoritos, "|Claves:", claves.length);
}());