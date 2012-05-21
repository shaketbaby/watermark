(function() {
    var placeholderAttr = "placeholder",
        placeholderClass = placeholderAttr,
        placeholderSupportedNatively = (placeholderAttr in document.createElement("input"));

    $.placeholder = function() {
        if (!placeholderSupportedNatively) {
            placeholder.call($("input[placeholder]"));
        }
    }

    $.fn.placeholder = function() {
        if (!placeholderSupportedNatively) {
            placeholder.call(this);
        }
    };

    function placeholder() {
        var $val = $.fn.val;

        function val($input) {
            return $val.call($input);
        }
        
        function onFocus() {
            if (this.hasClass(placeholderClass)) {
                this.removeClass(placeholderClass).val('');
            }
        }
        
        function onBlur() {
            // move function to the end of event processing queue
            // to avoid conflicting with other plug-ins.
            setTimeout(function() {
                if ($.trim(val(this)) === "") {
                    this.addClass(placeholderClass).val(this.attr(placeholderAttr));
                }
            }, 0);
        }

        this.each(function() {
            $(this).focusin(onFocus).focusout(onBlur).focusout();
        });

        $.fn.val = function() {
            if (arguments.length === 0 && this.hasClass(placeholderClass)) {
                return "";
            }
            return $val.apply(this, arguments);
        };

        $("form").submit(function() {
            $("input." + placeholderClass).val("");
        });
    }
})();