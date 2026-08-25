# WhoHire Web Plugin
This plugin is to render WhoHire Jobs for a business on their own websites.

## How it works
The user needs to place the following code in this site to make this work.
```
<div id="whohire-plugin"></div>
<script>
    const hirewhoConf = {
        'slug': 'ccclean'
    }
</script>
<script src="https://cdn.jsdelivr.net/gh/Perception-Predict/whohire-plugin@master/src/main.js"></script>
```

### Specifying a custom div to load jobs
The users can also load jobs in a div different than specified in example above with:
```
<script>
    const hirewhoConf = {
        'slug': 'ccclean',
        'container': 'custom-div-id'
    }
</script>
```

### Campaign tracking

Every job link the plugin renders is tagged so applications coming through an
embedded careers page can be told apart from direct traffic. Without this they
are indistinguishable — someone who found the page through a customer's site
looks the same as someone who typed the address in.

The defaults need no configuration:

```
?utm_source=careers_page&utm_medium=embed
```

A customer running a specific campaign through their careers page can override
any of the five parameters, either in the conf object:

```
<script>
    const hirewhoConf = {
        'slug': 'ccclean',
        'utmSource': 'facebook',
        'utmMedium': 'paid_social',
        'utmCampaign': 'summer_hiring',
        'utmTerm': 'line_cook',
        'utmContent': 'variant_a'
    }
</script>
```

…or as attributes on the container, which is easier inside a site builder:

```
<div id="whohire-plugin"
     data-slug="ccclean"
     data-utm-source="facebook"
     data-utm-medium="paid_social"
     data-utm-campaign="summer_hiring"></div>
```

| Option | Attribute | Default |
|---|---|---|
| `utmSource` | `data-utm-source` | `careers_page` |
| `utmMedium` | `data-utm-medium` | `embed` |
| `utmCampaign` | `data-utm-campaign` | omitted |
| `utmTerm` | `data-utm-term` | omitted |
| `utmContent` | `data-utm-content` | omitted |

Whatever is set here rides along with the candidate through the application and
lands on their record, so applications can be reported by channel. Only
`utm_source` decides the reported channel; the rest are stored for detail.
