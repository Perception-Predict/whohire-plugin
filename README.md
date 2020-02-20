# HireWho Web Plugin
This plugin is to render HireWho Jobs for a business on their own websites.

## How it works
The user needs to place the following code in this site to make this work.
```
<div id="hirewho-plugin"></div>
<script>
    const hirewhoConf = {
        'slug': 'ccclean'
    }
</script>
<script src="https://hirewho.co/static/plugin.js"></script>
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