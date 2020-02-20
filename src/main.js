class HireWhoPlugin {
    constructor(conf) {
        if (!conf) throw Error("HireWhoPlugin conf not available");
        if (!conf.slug) throw Error("The business slug is needed for HireWho Plugin to load.");
        if (!conf.container) container = "hirewho-plugin";
        this.slug = conf.slug;
        this.container = document.getElementById(container);
    }

    load() {
        console.log("load called on HireWhoPlugin");
        this.container.innerHTML = "<p>This is loaded via plugin</p>";
    }
}

const e = new HireWhoPlugin(window.hirewhoConf);
e.load();
