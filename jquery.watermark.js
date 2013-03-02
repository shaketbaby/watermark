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
            return $input.attr(placeholderAttr);
        }
    	
		function defer(fn) {
            // move function to the end of event processing queue
            // to avoid conflicting with other plug-ins.
            setTimeout(fn, 0);
		}
        
        function onKeyPress() {
            var $this = $(this);
            $this.removeClass(placeholderClass);
            defer(function () {
                if (val($this).indexOf(placeholderValue($this)) >= 0) {
                    $this.val(val($this).replace(placeholderValue($this), ""));
                }
            });
        }
        
        function onFocus() {
            var $this = $(this);
            defer(function () { 
                if (val($this) === placeholderValue($this)) {
                    $this.selectRange(0, 0);
                }
            });
        }

        function onBlur() {
            var $this = $(this);
            defer(function() {
                if ($.trim(val($this)) === "" || val($this) === placeholderValue($this)) {
                    $this.addClass(placeholderClass).val(placeholderValue($this));
                }
            });
        }

        this.each(function() {
            $(this).focusin(onFocus)
				   .click(onFocus)
				   .keypress(onKeyPress)
				   .focusout(onBlur)
				   .focusout();
        });

        $.fn.val = function() {
            if (arguments.length === 0 && this.hasClass(placeholderClass)) {
                return "";
            }
            return $val.apply(this, arguments);
        };

        $.fn.selectRange = function (start, end) {
            return this.each(function () {
                if (this.setSelectionRange) {
                    this.focus();
                    this.setSelectionRange(start, end);
                } else if (this.createTextRange) {
                    var range = this.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', end);
                    range.moveStart('character', start);
                    range.select();
                }
            });
        };

        $("form").submit(function() {
            $("input." + placeholderClass).val("");
        });
    }
})();
