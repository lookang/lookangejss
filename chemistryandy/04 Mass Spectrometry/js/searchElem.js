$(function(){
    var elemSel = [
        "Boron", "Neon", "Magnesium", "Silicon", "Chlorine",
        "Potassium", "Titanium", "Chromium", "Iron", "Nickel", 
        "Copper", "Zinc", "Gallium", "Germanium", "Selenium", 
        "Bromine", "Krypton", "Rubidium", "Strontium", "Zirconium",
        "Molybdenum", "Ruthenium", "Palladium", "Silver", "Cadmium",
        "Indium", "Tin", "Antimony", "Tellurium", "Xenon",
        "Barium", "Lanthanum", "Cerium", "Neodymium", "Samarium",
        "Europium", "Gadolinium"
    ];

    $("#selectElement").autocomplete({  source: elemSel,
                                        select: function(event,ui){
                                            var elem2 = ui.item.id;
                                        },
                                        open: function(event, ui){
                                            $("#selectElement")
                                        }
                                    });
});


