var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var pokemon;
var lever = 2;
function getPokemon() {
    return __awaiter(this, void 0, void 0, function () {
        var listPokemon, arrID, i, i, data, keke;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    document.querySelector('#app').innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
                    listPokemon = [];
                    arrID = [];
                    for (i = 0; i < lever; i++) {
                        arrID.push(Math.round(Math.random() * 1000));
                    }
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < lever)) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon/".concat(arrID[i]))];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, data.json()];
                case 3:
                    keke = _a.sent();
                    pokemon = {
                        id: keke.id,
                        name: keke.name,
                        image: keke.sprites.front_default,
                        type: keke.types[0].type.name
                    };
                    listPokemon.push(pokemon);
                    listPokemon.push(pokemon);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    listPokemon = _.shuffle(listPokemon);
                    return [2 /*return*/, listPokemon];
            }
        });
    });
}
function htmlItemPokemon(item) {
    return "\n            <div class=\"detailItem\">\n                <div data=\"".concat(item.id, "\" class=\"item idPokemon-").concat(item.id, "\">\n                    <img src=\"").concat(item.image, "\">\n                    <p>#").concat(item.id, "</p>\n                </div>\n            </div>\n            ");
}
function renderPokemon() {
    return __awaiter(this, void 0, void 0, function () {
        var listPokemon, html, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getPokemon()];
                case 1:
                    listPokemon = _a.sent();
                    html = listPokemon.map(function (item) {
                        return htmlItemPokemon(item);
                    });
                    document.querySelector('#app').innerHTML = html.join('');
                    item = document.querySelectorAll('.item');
                    setTimeout(function () {
                        for (var i = 0; i < item.length; i++) {
                            var element = item[i];
                            element.classList.add('before');
                        }
                    }, 1000);
                    return [2 /*return*/];
            }
        });
    });
}
renderPokemon();
var closeTime = function (item, time) {
    setTimeout(function () {
        closeImg(item);
    }, time);
};
var timeoutId = closeTime();
var countItem = lever * 2;
var checkChoose = 0;
var choose = [];
var checkTimeOut = false;
$(document).on('click', '.before', function () {
    checkChoose += 1;
    clearTimeout(timeoutId);
    if (choose.length == 2) {
        choose.forEach(function (element) {
            element.addClass('before');
        });
    }
    if (checkChoose == 1) {
        choose = [];
        var item = $(this).removeClass('before');
        choose.push(item);
    }
    else {
        checkChoose = 0;
        var item = $(this).removeClass('before');
        choose.push(item);
        if (checkTrueFalse(choose)) {
            chooseTrue(choose);
            countItem -= 2;
            if (countItem == 0) {
                lever = lever + 1;
                countItem = lever * 2;
                setTimeout(function () {
                    $('h2').html("Ke Ke lever ".concat(lever - 1));
                    alert("Bạn giỏi quá Tới màng tiếp theo nào");
                    renderPokemon();
                }, 0);
            }
        }
        else {
            closeTime(choose, 1000);
        }
        checkTimeOut = true;
    }
});
function closeImg(listItem) {
    listItem.forEach(function (element) {
        element.addClass('before');
    });
}
function checkTrueFalse(listItem) {
    if (listItem[0].attr('data') != listItem[1].attr('data')) {
        return false;
    }
    else {
        return true;
    }
}
function chooseTrue(listItem) {
    listItem.forEach(function (element) {
        element.addClass('chooseTrue');
        element.removeClass('before');
    });
    setTimeout(function () {
        listItem.forEach(function (element) {
            element.remove();
        });
    }, 500);
}
