# Tooltip JS

Lightweight javascript plugin for HTML5 tooltips with CSS animations. No dependencies needed, just plain Javascript.

### Moral License / Support me

You can buy a moral license and support me with buying me a cup of coffee via [PayPal](https://www.paypal.me/jakobploens/3,50).

### Installation

1. Include tooltip.js and tooltip.css.
2. Call with `new Tooltip(element, options)`.

Be careful: The `Tooltip()` function expects a single element as parameter. If you want to use more than element to have a tooltip (which is usually the case), use the Tooltips function with a string selector:

```javascript
var hints = new Tooltips('.trigger', options);

// Get all tooltip instances
console.log(hints.tooltips);
```

The plugin is also shipped with a jQuery-Plugin, if jQuery is used. You can use it the following way:

```javascript
$('.trigger').tooltip(options);
```

### Options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `speed` | integer | 100 (ms) | Needed if a CSS transition is used. Waits with removing until animation is over (= speed). |
| `delay` | integer | 0 (ms) | Time to wait with hiding and removing tooltip when leaving target. |
| `offset` | integer | 5 (px) | Distance between cursor and tooltip (y-axis only). |
| `position` | string | 'auto' | Define a position instead of auto calculating. |
| `fixed` | boolean | false | If set to true, tooltip get's fixed class, no matter what `inFixedPosition()` returns. |
| `follow` | boolean | false | If set to true, tooltip follows the mouse instead of having a fixed, calculated position. |
| `html` | boolean | false | If set to true, injects HTML instead of plain text. |
| `trigger` | string | 'mouseenter' | Event which triggers the tooltip. |
| `triggerOff` | string | 'mouseleave' | Event which triggers the remove of the tooltip. |
| `dataAttr` | string | 'tooltip' | Data attribute where the content is stored. |
| `class` | string | 'tooltip' | Base class for tooltip. |
| `classFixed` | string | 'tooltip--fixed' | Class for tooltip if target is fixed. |
| `classLeft` | string | 'tooltip--left' | Class for tooltip on the left side. |
| `classRight` | string | 'tooltip--right' | Class for tooltip on the right side. |
| `classTop` | string | 'tooltip--top' | Class for tooltip on the top. |
| `classBottom` | string | 'tooltip--bottom' | Class for tooltip on the bottom. |
| `classShown` | string | 'tooltip--is-shown' | Class for active and shown tooltip. |

Options can either be set by giving the plugin's function the options object, or by setting the matching `data`-attribute:

1. `new Tooltip(document.querySelector('.trigger'));`
2. `<span class="trigger" data-tooltip="This is the content" data-offset="10" data-follow="true">Trigger</span>`

Options are prioritized in this order: data-attribute > jQuery plugin options > default options.