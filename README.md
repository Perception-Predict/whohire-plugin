# HireWho Web Plugin
This plugin is to render HireWho Jobs for a business on their own websites.

## How it works
The user needs to place the following code in this site to make this work.
```
<div id="hirewho-plugin"></div>
<script src="https://hirewho.co/static/plugin.js"></script>
<script>
    const plugin = new HireWhoPlugin("your-business-slug-here");
    plugin.load();
</script>
```

### Specifying a custom div to load jobs
The users can also load jobs in a div different than specified in example above with:
```
<script>
    const plugin = new HireWhoPlugin("your-business-slug-here", "custom-div-id-goes-here");
    plugin.load();
</script>
```