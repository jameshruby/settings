$(function() {
    init();
    
    var timeout;
    $(".boxes-container").on("DOMSubtreeModified", function () {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            $(".boxes-loading").hide();
            init();
        }, 1)
    }); 
    
});

function init() {
    $("*").off();
//
//    if ($(".boxes .box").length > 0) {
//
//        $(".boxes").mixItUp({
//            load: {
//                sort: 'name'
//            },
//            callbacks: {
//                onMixEnd: function (e) {
//                    $(".boxes-loading").fadeOut(1);
//                }
//            },
//            animation: {
//                enable: false
//            }
//        });
//    
//
//
//    }
    
    // Vyhledávání
    
    var timeout;
    
    $("#search").on("keyup", function () {
        clearTimeout(timeout);
        timeout = setTimeout(function (input) {
            // code
            
            
//            $matching = $();
//            var $everything = $()
//            
//            $(".box-title > input").each(function() {
//                $everything = $everything.add($(this));
//            });
//            $(".box tr").each(function() {
//                $everything = $everything.add($(this).find('td').eq(1).find('input'));
//            });
//            
//            var search = input.val().toLowerCase();
//
//            if (search.length == 0 || search == null) {
//                //
//                return false;
//            }
//
//            $everything.each(function () {
//                if ($(this).val().toLowerCase().indexOf(search) >= 0) {
//                    //
//                }
//            });

        }, 250, $(this));
    });
    
    // Roztáhnutí po kliknutí
//    $(document).click(function () {
//        $(".full").removeClass('full');
//        $(".boxes").mixItUp('sort', 'name')
//    });
//
//    $(".box td").click(function (e) {
//        e.stopImmediatePropagation();
//        $(".full").removeClass('full');
//        $(".box td").removeClass("full");
//        $(".boxes").mixItUp('sort', 'name')
//        var index = $(this).index();
//        $(this).parents(".box").find("tr").each(function () {
//            $(this).find("td").eq(index).addClass("full");
//        });
//        $(this).parents(".box").insertBefore($(".box").eq(0));
//        $(this).parents(".box").addClass("full");
//    });

    // Vybírání boxů
    $("input[type=checkbox]").change(function () {
        $(this).parents(".box").toggleClass("chosen");
    });
    
    // Přidávání boxů
    $("#add-box").click(function() {
        var box = '<div class="box" style="display: inline-block"> <div class="box-title"> <input type="text" value="name"> <div class="checkbox"><input type="checkbox"></div></div><div class="box-content"> <table> <tr> <td><input type="text" value="Název"></td><td><input type="text" value="Hodnota"></td></tr></table> <button class="add-row">+</button> </div></div>';
        $(".boxes-container").prepend(box);
        init();
    });


     $("#delete-box").click(function() {
            
               ws.searchServer();     
                
     });

    

    // Přidávání řádků
    $(".add-row").click(function () {
        var table = $(this).parent().find("table");

        var row = $("<tr/>");

        row.append("<td><input type='text' value='Název'></td>");
        row.append("<td><input type='text' value='Hodnota'></td>");

        table.append(row);
    });

    ws = new websockets();

}