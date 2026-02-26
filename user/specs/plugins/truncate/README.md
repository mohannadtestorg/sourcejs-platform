# Truncate utility

[jQuery](https://jquery.com/) plugin.

## Usage

Use the following command to truncate text or list of items:

```
$(selector).truncate(options);
```

## Options

Parameter | Values | Default value | Description
--- | --- | --- | ---
type | "text", "list" | "text" | Type of content to be truncated
position | "end", "middle", "beforeLast", "betweenFirstAndLast" | "end" | Position of the truncation
lines | integer | 1 | Number of lines
lastItemsCount | integer | 1 | Number of items to keep after the "See more" link, when position is set to "beforeLast"
seeMoreLink | true, false | false | Flag to toggle the "See more" link
seeMoreText | string | "See More" | Text to be displayed as the "See more" link
seeLessText | string | "See Less" | Text to be displayed as the "See less" link
seeMoreHtml | html | "" | HTML to be displayed as the "See more" link
seeLessHtml | html | "" | HTML to be displayed as the "See less" link
showRemovedCount | true, false | false | Flag to display the number of removed list items, will be displayed instead of "See more" link
ellipsisChar | string | "&hellip;" | Text to be used at the end of truncated text
isMobile | true, false | false | Flag to indicate mobile view elements
mobileTarget | string | "" | The selector of the target element to slide in on mobile devices
addClass | string | "" | CSS class to be added to the container element after the truncation


## Examples

### Truncate block of text to 5 lines

```
$('.aboutBook').truncate({
    lines: 5,
    seeMoreLink: true,
    seeMoreText: 'Show all',
    seeLessText: 'Show less'
});
```

### Truncate list of authors to 2 lines and add 'loa-height' class

```
$('.creative-work .loa').truncate({
    lines: 2,
    type: 'list',
    addClass: 'loa-height'
});
```

### Truncate list of authors to 2 lines in the middle, ie. keep first X authors and last X authors and add ellipsis in the middle

```
$('.creative-work .loa').truncate({
    lines: 2,
    type: 'list',
    position: 'middle'
});
```

### Truncate list of authors to 2 lines, keep 2 authors after the "See more" link, and use custom HTML for the "See more" link

```
$('.creative-work .loa').truncate({
    lines: 2,
    type: 'list',
    position: 'beforeLast',
    lastItemsCount: 2,
    seeMoreHtml: ' ... More authors <i class="icon-section_arrow_d"></i> ... '
});
```

### Truncate title to 3 lines and add 'min-height' class

```
$('.creative-work__title').truncate({
    lines: 3,
    addClass: 'min-height'
});
```

### Remove truncation and restore original content

```
$('.creative-work .loa').truncate('destroy');
```