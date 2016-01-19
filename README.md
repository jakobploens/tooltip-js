# Tooltip JS

Lightweight javascript plugin for HTML5 tooltips with CSS animations. ~~No dependencies needed~~ jQuery is still needed, unfortunately. Working on it!

### Roadmap

Next aim is to make jQuery unnecessary and relay just on plain vanilla Javascript without any dependencies.

### Installation

1. Include jQuery.
2. Include tooltip.js and tooltip.css.
3. Call with `$(element).tooltip(options);`.

### Options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `speed` | integer | 100 (ms) | Needed if an CSS transform is animated. Waits with removing until animation is over (= speed). |
| `delay` | integer | 0 (ms) | Time to wait with hiding and removing tooltip when leaving target. |
| `offset` | integer | 5 (px) | Distance between cursor and tooltip (y-axis only). |
| `position` | string | 'auto' | Define a position instead of auto calculating. |
| `follow` | boolean | false | If set to true, tooltip follows the mouse instead of having a fixed, calculated position. |
| `html` | boolean | false | If set to true, injects HTML instead of plain text. |
| `trigger` | string | 'mouseenter' | Event which triggers the tooltip. |
| `dataAttr` | string | 'tooltip' | Data attribute where the content is stored. |
| `class` | string | 'tooltip' | Base class for tooltip. |
| `classFixed` | string | 'tooltip--fixed' | Class for tooltip if target is fixed. |
| `classLeft` | string | 'tooltip--left' | Class for tooltip on the left side. |
| `classRight` | string | 'tooltip--right' | Class for tooltip on the right side. |
| `classTop` | string | 'tooltip--top' | Class for tooltip on the top. |
| `classBottom` | string | 'tooltip--bottom' | Class for tooltip on the bottom. |
| `classShown` | string | 'tooltip--is-shown' | Class for active and shown tooltip. |

Options can either be set by giving the plugin's function the options object, or by setting the matching `data`-attribute:

1. `$('.trigger').tooltip();`
2. `<span class="trigger" data-tooltip="This is the content" data-offset="10" data-follow="true">Trigger</span>`
