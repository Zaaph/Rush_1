/*jslint browser:true, this:true*/
    (function($) {
        "use strict";
        function inc_trait() {
            var height_str = $("textarea").css("line-height").slice(0, -2);
            var height = parseInt(height_str) + 1;
            $("textarea").css("line-height", height + "px");
        }

        function dec_trait() {
            var height_str = $("textarea").css("line-height").slice(0, -2);
            var height = parseInt(height_str) - 1;
            $("textarea").css("line-height", height + "px");
        }

        function line_through() {
            if (line_through.counter !== 0 && line_through.counter !== 1) {
                line_through.counter = 0;
            }
            if (line_through.counter % 2 === 0) {
                $("textarea").css("text-decoration", "line-through");
            } else if (line_through.counter % 2 === 1) {
                $("textarea").css("text-decoration", "");
            }
            line_through.counter += 1;
        }

        function underline() {
            if (underline.counter !== 0 && underline.counter !== 1) {
                underline.counter = 0;
            }
            if (underline.counter % 2 === 0) {
                $("textarea").css("text-decoration", "underline");
            } else if (underline.counter % 2 === 1) {
                $("textarea").css("text-decoration", "");
            }
            underline.counter += 1;
        }

        function bold() {
            if (bold.counter !== 0 && bold.counter !== 1) {
                bold.counter = 0;
            }
            if (bold.counter % 2 === 0) {
                $("textarea").css("font-weight", "bold");
            } else if (bold.counter % 2 === 1) {
                $("textarea").css("font-weight", "");
            }
            bold.counter += 1;
        }

        function italic() {
            if (italic.counter !== 0 && italic.counter !== 1) {
                italic.counter = 0;
            }
            if (italic.counter % 2 === 0) {
                $("textarea").css("font-style", "italic");
            } else if (italic.counter % 2 === 1) {
                $("textarea").css("font-style", "");
            }
            italic.counter += 1;
        }

        $.fn.my_wysiwyg = function (parameters) {
            var button_ids = [];
            var i = 0;
            if ($.isPlainObject(parameters)) {
                var options = $.extend({
                    font_size: "12px",
                    color: "black",
                    buttons: null
                }, parameters);
                $(document).ready(function () {
                    $("textarea").css("color", options.color);
                    $("textarea").css("font-size", options.font_size);
                });
                if ($.isArray(options.buttons)) {
                    var buttons_div = document.createElement("div");
                    options.buttons.forEach(function(value) {
                        var button;
                        var label;
                        if (value !== "color" && value !== "font_size") {
                            button = document.createElement("button");
                        }
                        if (value === "color") {
                            button = document.createElement("input");
                            button.setAttribute("type", "color");
                        }
                        if (value === "font_size") {
                            button = document.createElement("input");
                            label = document.createElement("label");
                            button.setAttribute("type", "text");
                            label.setAttribute("for", value);
                            label.innerHTML = "Choose the font-size :";
                            label.style.fontSize = "12px";
                        }
                        button.id = value;
                        if (value !== "color" && value !== "font_size") {
                            button.innerHTML = value;
                        }
                        if (label) {
                            buttons_div.appendChild(label);
                        }
                        buttons_div.appendChild(button);
                    });
                    document.body.insertBefore(buttons_div, $.this);
                    options.buttons.forEach(function (value) {
                        button_ids[i] = document.getElementById(value);
                        i += 1;
                    });
                    button_ids.forEach(function(button) {
                        button.addEventListener("click", function () {
                            if (button.id === "italic") {
                                italic();
                            } else if (button.id === "bold") {
                                bold();
                            } else if (button.id === "line_through") {
                                line_through();
                            } else if (button.id === "underline") {
                                underline();
                            } else if (button.id === "text_right") {
                                $("textarea").css("text-align", "right");
                            } else if (button.id === "text_left") {
                                $("textarea").css("text-align", "left");
                            } else if (button.id === "text_center") {
                                $("textarea").css("text-align", "center");
                            } else if (button.id === "text_justify") {
                                $("textarea").css("text-align", "justify");
                            } else if (button.id === "inc_trait") {
                                inc_trait();
                            } else if (button.id === "dec_trait") {
                                dec_trait();
                            }
                        });
                        button.addEventListener("change", function () {
                            if (button.id === "color") {
                                $("textarea").css("color", button.value);
                            }
                            if (button.id === "font_size") {
                                $("textarea").css("font-size",
                                    (button.value + "px"));
                            }
                        });
                    });
                }
                return this;
            }
        };
    })(jQuery);