var europe = [{
    "path": "128",
    "country": "Island",
    "code": "is",
    "capital":"Rejkjavik"
}, {
    "path": "108",
    "country": "Irska",
    "code": "ie",
    "capital":"Dablin"
}, {
    "path": "104",
    "country": "Velika Britanija",
    "code": "gb",
    "capital":"London"
}, {
    "path": "116",
    "country": "Portugal",
    "code": "pt",
    "capital":"Lisabon"
}, {
    "path": "114",
    "country": "Spanija",
    "code": "es",
    "capital":"Madrid"
}, {
    "path": "110",
    "country": "Francuska",
    "code": "fr",
    "capital":"Pariz"
}, {
    "path": "78",
    "country": "Belgija",
    "code": "be",
    "capital":"Brisel"
}, {
    "path": "74",
    "country": "Holandija",
    "code": "nl",
    "capital":"Amsterdam"
}, {
    "path": "72",
    "country": "Svajcarska",
    "code": "ch",
    "capital":"Bern"
}, {
    "path": "32",
    "country": "Nemacka",
    "code": "de",
    "capital":"Berlin"
}, {
    "path": "76",
    "country": "Luksemburg",
    "code": "lu",
    "capital":"Luksemburg"
}, {
    "path": "20",
    "country": "Danska",
    "code": "dk",
    "capital":"Kopenhagen"
}, {
    "path": "14",
    "country": "Norveska",
    "code": "no",
    "capital":"Oslo"
}, {
    "path": "16",
    "country": "Svedska",
    "code": "se",
    "capital":"Stokholm"
}, {
    "path": "18",
    "country": "Finska",
    "code": "fi",
    "capital":"Helsinki"
}, {
    "path": "22",
    "country": "Estonia",
    "code": "ee",
    "capital":"Talin"
}, {
    "path": "24",
    "country": "Letonija",
    "code": "lv",
    "capital":"Riga"
}, {
    "path": "26",
    "country": "Litvanija",
    "code": "lt",
    "capital":"Vilnjus"
}, {
    "path": "28",
    "country": "Belarus",
    "code": "by",
    "capital":"Minsk"
}, {
    "path": "30",
    "country": "Poljska",
    "code": "pl",
    "capital":"Varsava"
}, {
    "path": "34",
    "country": "Ukrajina",
    "code": "ua",
    "capital":"Kijev"
}, {
    "path": "36",
    "country": "Moldavija",
    "code": "md",
    "capital":"Kisinjev"
}, {
    "path": "60",
    "country": "Ceska",
    "code": "cz",
    "capital":"Prag"
}, {
    "path": "66",
    "country": "Slovacka",
    "code": "sk",
    "capital":"Bratislava"
}, {
    "path": "68",
    "country": "Austrija",
    "code": "au",
    "capital":"Beč"
}, {
    "path": "64",
    "country": "Slovenija",
    "code": "si",
    "capital":"Ljubljana"
}, {
    "path": "62",
    "country": "Madjarska",
    "code": "hu",
    "capital":"Budimpesta"
}, {
    "path": "38",
    "country": "Rumunija",
    "code": "ro",
    "capital":"Bukurest"
}, {
    "path": "58",
    "country": "Hrvatska",
    "code": "hr",
    "capital":"Zagreb"
}, {
    "path": "46",
    "country": "Srbija",
    "code": "rs",
    "capital":"Beograd"
}, {
    "path": "54",
    "country": "Crna Gora",
    "code": "me",
    "capital":"Podgorica"
}, {
    "path": "52",
    "country": "Albanija",
    "code": "al",
    "capital":"Tirana"
}, {
    "path": "50",
    "country": "Makedonija",
    "code": "mk",
    "capital":"Skoplje"
}, {
    "path": "40",
    "country": "Bugarska",
    "code": "bg",
    "capital":"Sofija"
}, {
    "path": "42",
    "country": "Grcka",
    "code": "gr",
    "capital":"Atina"
}, {
    "path": "118",
    "country": "Andora",
    "code": "ad",
    "capital":"Andora"
}];
var continents = new Array();   
continents['europe'] = europe;

var current_selection = null;
var current_rotation = null;
var current_continent = null;

var game = new game(20);

$(document).ready(function() {
    $("#menu_btn").click(function() {
        $("#menu").fadeIn();
    });
    $("#modal_menu_btn").click(function() {
        $("#menu").fadeIn();
        $('#gameover').fadeOut();
    });

    $(".kontinenti img").click(function() {
        if($(this).hasClass('unavailable')){
            alert("Currently unavailable");
        }else{
            game.start($(this).data('kontinent'));
        }
    });
});


function game(limit) {
    this.limit = limit;
    this.type='country'; //default is to play with countries
    this.score = 0;
    this.left = limit; //how many countries left
    this.timer=new Date();
    this.start = function(continent) {
        this.clearup(); //Clear things from previous start
        current_continent = continent;
        var path ='svg/'+ current_continent + '.svg';

        if ($("#city").prop("checked")) {
            this.type="capital";
        }else{
            this.type="country";
        }

        //---Find .svg file of the continent---
        xhr = new XMLHttpRequest();
        xhr.open("GET", path, false);
        xhr.overrideMimeType("image/svg+xml");
        xhr.send("");
        $("#map").html(xhr.responseXML.documentElement);
        //-------------------------------------

        $("#menu").fadeOut();
        this.addList();
        this.rotateList();

        var that = this; //so we can pass this object to another function
        $("#labels li").bind("click", that, function() {
            that.listClicked(this);
        });
        $("#map path").bind("click", that, function() {
            that.pathClicked(this);
        });
    };

    this.end = function() {
        $('#gameover').fadeIn();
    };

    this.check = function(id) {
        if (id == continents[current_continent].find(current_selection,this.type)) {
            return true;
        } else {
            return false;
        }
    };

    this.rotateList = function() {
        $("#labels li").each(function() {
            var sign = 1 + Math.floor(Math.random() * 2);
            if (sign == 1) {
                var random = 1 + Math.floor(Math.random() * 8);
            } else {
                var random = 1 - Math.floor(Math.random() * 8);
            }
            $(this).css("transform", "rotate(" + random + "deg)");
        });
    };

    this.clearup = function() { //when the game starts, clear all the previus variables
        $("#labels li").unbind();
        $("#map path").unbind();
        $("#labels ul").html("");
        current_selection = null;
        current_rotation = null;
        this.changeScore(0);
        this.left = this.limit;
    };

    this.addList = function() {
        var shuffled = continents[current_continent].shuffle();
        for (var i = 0; i < this.limit; i++) {
            if(this.type=='capital'){
                $("#labels ul").append('<li>' + shuffled[i].capital + "</li>");
            }else{
                $("#labels ul").append('<li>' + shuffled[i].country + "</li>");
            }
            
        }
    };

    this.removeList = function() {
        $(".clicked").addClass('remove'); //mark for remove by adding class removal (this was added because of the wierd bug when user clicks on two elements fast while in the removal process, causing them to both disappear)
        $(".clicked").css('opacity', '0');

        var previous_selection = current_selection; //I'm not even going to bother explaining to future me.
        current_selection = null;
        setTimeout(function() {
            $(".remove").css('visibility', 'hidden');
            $(".remove").removeClass();
            if (current_selection == previous_selection)
                current_selection = null;
        }, 400);

        this.left--;
        if (this.left == 0) //GAME OVER
            this.end();
    };

    this.listClicked = function(that) {
        if ($(that).hasClass('clicked')) { //If the user clicked the same again
            current_selection = null;
            $(that).removeClass('clicked');
            $(that).css('transform', current_rotation + 'scale(1)');
        } else {
            //Reset previous
            if (current_rotation !== null)
                $(".clicked").css("transform", current_rotation);
            $(".clicked").removeClass('clicked');
            //--------------
            $(that).addClass('clicked');

            current_rotation = $(that).css('transform');
            current_selection = $(that).html();
            $('.clicked').css('transform', current_rotation + ' scale(0.9)');
        }
    };

    this.pathClicked = function(that) {
        if (current_selection == null) //If clicked when nothing is selected break the function
            return -1;
        var id = $(that).attr('id').substring(4); //svg id's begin with string "path", so we need to remove that
        if (game.check(id)) { //if correct
            $(that).attr("style", "fill:green !important");
            console.log("Country guessed");
            this.changeScore();
        } else {
            $(that).css("fill", "red");
            console.log("Country missed");
        }
        this.removeList();
    };

    this.changeScore = function(val) {
        if (val == undefined) { //if value is not defined, then just increment the score, else set the score to the given value
            this.score++;
        } else {
            this.score = val;
        }
        var percent = Math.round(this.score / this.limit * 100);
        $("#score").html(percent + "%");
        $("#gameover .score").html(percent + "%");
    };
}

Array.prototype.find = function(value,type) { //if number passed, returns country name, else if string is passed, returns the id of the string
    if (!isNaN(value)) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].path == value) {
                return this[i].country;
            }
        }
        return false;
    } else {
        for (var i = 0; i < this.length; i++) {
            if(type=='capital'){
                if (this[i].capital == value) {
                    return this[i].path;
                }
            }else{
                if (this[i].country == value) {
                    return this[i].path;
                }
            }  
        }
        return false;
    }
}
Array.prototype.shuffle = function() {
    var o = this;
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}