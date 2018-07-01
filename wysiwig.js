    (function($) {

        function line_through() {
            if (typeof line_through.counter === "undefined") {
                line_through.counter = 0;
            }
            if (line_through.counter % 2 === 0 || clicked_deco % 2 === 1) {
                $("textarea").css("text-decoration", "line-through");
            } else if (line_through.counter % 2 === 1) {
                $("textarea").css("text-decoration", "none");
            }
            line_through.counter += 1;
        }

        function underline() {
            if (typeof underline.counter === "undefined") {
                underline.counter = 0;
            }
            if (underline.counter % 2 === 0 || clicked_deco % 2 === 1) {
                $("textarea").css("text-decoration", "underline");
            } else if (underline.counter % 2 === 1) {
                $("textarea").css("text-decoration", "none");
            }
            underline.counter += 1;
        }

        function bold() {
            if (typeof bold.counter === "undefined") {
                bold.counter = 0;
            }
            if (bold.counter % 2 === 0) {
                $("textarea").css("font-weight", "bold");
            } else if (bold.counter % 2 === 1) {
                $("textarea").css("font-weight", "normal");
            }
            bold.counter += 1;
        }

        function italic() {
            if (typeof italic.counter === "undefined") {
                italic.counter = 0;
            }
            if (italic.counter % 2 === 0) {
                $("textarea").css("font-style", "italic");
            } else if (italic.counter % 2 === 1) {
                $("textarea").css("font-style", "normal");
            }
            italic.counter += 1;
        }

        $.fn.my_wysiwyg = function (options) {
            var button_ids = new Array; //On crée un tableau qui servira a stocker nos boutons
            var i = 0; //On initialise le compteur
            if ($.isPlainObject(options)) { //On vérifie que le paramètre options passé en argument est bien un objet
                if ($.isArray(options.buttons)) { //On vérifie que l'on a un array nommé buttons a l'intérieur de notre objet options
                    var buttons_div = document.createElement("div"); //On crée la div pour stocker les boutons
                    options.buttons.forEach(function(value) { //Pour chacun des éléments (value) du tableau buttons dans l'objet options :
                        if (value !== "color") {
                            var button = document.createElement("button"); //On crée un bouton si l'élément est différent de "color"
                        }
                        if (value === "color") {
                            var button = document.createElement("input"); //On crée un input si l'élement est égal à "color"
                            button.setAttribute("type", "color"); //On donne a l'input le type "color" pour pouvoir choisir la couleur
                        }
                        button.id = value; //On donne un élément un id correspondant à son nom (l'élément "color" aura l'id "color" et ainsi de suite)
                        if (value !== "color") {
                            button.innerHTML = value; //Si ce n'est pas color le texte du bouton correspondra a son nom
                        }
                        buttons_div.appendChild(button); //On ajoute le bouton dans la div
                        //On recommence jusqu'à ce qu'on ait fait tous les éléments du tableau buttons
                    });
                    document.body.insertBefore(buttons_div, $.this); //On insère la div avant $.this, qui correspond à $("textarea") dans ce contexte
                    options.buttons.forEach(function(value) { //Une fois que les boutons sont insérés, on les stocke dans le tableau créé plus tôt
                        button_ids[i] = document.getElementById(value);
                        i += 1;
                        //Ça permet d'avoir un tableau qui contient les boutons en mode document.children[0] toussa
                    });
                    button_ids.forEach(function(button) { //Pour chacun des boutons qu'on vient de créer :
                        button.addEventListener("click", function () { //On ajoute un évènement onclick
                            if (button.id === "italic") {
                                italic(); // On applique la fonction italic() sur le bouton "italic"
                            } else if (button.id === "bold") {
                                bold();//la fonction bold() sur le bouton "bold"
                            } else if (button.id === "line_through") {
                                line_through(); //etc
                            } else if (button.id === "underline") {
                                underline();
                            }
                            //si le bouton ne correspond a aucune de nos conditions, il n'aura pas d'évènement onclick
                        });
                        button.addEventListener("change", function () { // On utilise un évènement onchange pour la couleur
                            if (button.id === "color") {
                                $("textarea").css("color", button.value); //Lorsque la valeur est changée, la couleur du texte prend la valeur de la couleur choisie
                            }
                        });
                    });
                }
            }
        };
    })(jQuery);

$("textarea").my_wysiwyg(
  /*l'objet options :*/  { 
        option1: "valeur1",
        option2: "valeur2",
        buttons: ["bold", "italic", "color", "line_through", "underline"] //Le tableau buttons de l'objet options
    }
);