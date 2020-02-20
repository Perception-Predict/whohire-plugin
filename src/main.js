class HireWhoPlugin {
    constructor(slug, container) {
        if (!slug) throw Error("The business slug is needed for HireWho Plugin to load.");
        if (!container) container = "hirewho-plugin";
        this.slug = slug;
        this.container = document.getElementById(container);
    }

    load() {
        this.container.innerHTML = "<p>This is loaded via plugin</p>";
    }
}
