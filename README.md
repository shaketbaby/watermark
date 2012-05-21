watermark
=========

A very simple and lightweight jQuery plugin to add HTML5 placeholder support, only when browser doesn't support it natively.

## why

I've tried a few watermark plugins in my projects.<br>
They are a few ways this is implemented, but all of them have more or less some issues.<br/>
- watermark is returned from val() function instead of empty string when it only contains watermark
- watermark is used as value during form submition instead of empty string
- watermark is not placed correctly when field is "display:none"
- additional fields get submitted to server which may cause validation/binding errors on server side

## Example

#### HTML

    <input id="sample"  type="text" placeholder="sample">
    <input id="example" type="text" placeholder="example">

#### Javascript

    $.placeholder(); // apply watermark to all input fields with placeholder attribute
    or
    $("#sample").placeholder(); // only apply to some fields by using selector

#### CSS

Every input field with watermark applied will have css class "placeholder" which can be used to define the style

    .placeholder {
      color: #CCC;
    }
