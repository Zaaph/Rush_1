    (function($) {

        function line_through(clicked_deco) {
            if (typeof line_through.counter === "undefined") {
                line_through.counter = 0;
            }
            if (line_through.counter % 2 === 0 || clicked_deco % 2 === 1) {
                $("textarea").css("text-decoration", "line-through");
            } else if (line_through.counter % 2 === 1) {
                $("textarea").css("text-decoration", "none");
            }
            line_through.counter += 1;
            clicked_deco += 2;
            return clicked_deco;
        }

        function underline(clicked_deco) {
            if (typeof underline.counter === "undefined") {
                underline.counter = 0;
            }
            if (underline.counter % 2 === 0 || clicked_deco % 2 === 1) {
                $("textarea").css("text-decoration", "underline");
            } else if (underline.counter % 2 === 1) {
                $("textarea").css("text-decoration", "none");
            }
            underline.counter += 1;
            clicked_deco += 1;
            return clicked_deco;
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
            var button_ids = new Array;
            var i = 0;
            if ($.isPlainObject(options)) {
                if ($.isArray(options.buttons)) {
                    var buttons_div = document.createElement("div");
                    options.buttons.forEach(function(value) {
                        if (value !== "color") {
                            var button = document.createElement("button");
                        }
                        if (value === "color") {
                            var button = document.createElement("input");
                        }
                        button.id = value;
                        if (value !== "color") {
                            button.innerHTML = value;
                        }
                        if (value === "color") {
                            button.setAttribute("type", "color");
                        }
                        buttons_div.appendChild(button);
                    });
                    document.body.insertBefore(buttons_div, $.this);
                    options.buttons.forEach(function(value) {
                        button_ids[i] = document.getElementById(value);
                        i += 1;
                    });
                    console.log(button_ids);
                    button_ids.forEach(function(button) {
                        var clicked_deco = 0;
                        button.addEventListener("click", function () {
                            if (button.id === "italic") {
                                italic();
                            } else if (button.id === "bold") {
                                bold();
                            } else if (button.id === "line_through") {
                                line_through(clicked_deco);
                            } else if (button.id === "underline") {
                                underline(clicked_deco);
                            }
                        });
                        button.addEventListener("change", function () {
                            if (button.id === "color") {
                                $("textarea").css("color", button.value);
                            }
                        });
                    });
                }
            }
        };
    })(jQuery);

$("textarea").my_wysiwyg(
    {
        option1: "valeur1",
        option2: "valeur2",
        buttons: ["bold", "italic", "color", "line_through", "underline"]
    }
);