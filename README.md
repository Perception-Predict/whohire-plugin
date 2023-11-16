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
