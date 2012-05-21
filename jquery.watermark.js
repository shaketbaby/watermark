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
        
        function placeholderValue($input) {
            return $input.attr(placeholderAttr) + "\u00A0\u00A0";
        }
    	
		function defer(fn) {
            // move function to the end of event processing queue
            // to avoid conflicting with other plug-ins.
            setTimeout(fn, 0);
		}
        
        function onFocus() {
            var $this = $(this);
            $this.removeClass(placeholderClass);
			defer(function() {
                if (val($this) === placeholderValue($this)) {
                    $this.val('');
                }
            });
        }
        
        function onBlur() {
            var $this = $(this);
            defer(function() {
                if ($.trim(val($this)) === "") {
                    $this.addClass(placeholderClass).val(placeholderValue($this));
                }
            });
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
