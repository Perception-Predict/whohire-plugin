class HireWhoPlugin {
    constructor(conf) {
        if (!conf) throw Error("HireWhoPlugin conf not available");
        if (!conf.slug) throw Error("The business slug is needed for HireWho Plugin to load.");
        if (!conf.container) container = "hirewho-plugin";
        this.slug = conf.slug;
        this.container = document.getElementById(container);
        this.title = conf.title || "Job openings";
    }

    load() {
        const url = `https://hirewho.co/api/job/?slug=${this.slug}&publish=1`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.process(data));
        this.insertStyles();
    }

    process(jobs) {
        if (!jobs.length) return;
        let html = `<div id="hirewho-jobs">`;
        html += `<h3>${this.title}</h3>`;
        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            const url = `https://hirewho.co/job/${this.slug}/${job.id}`;
            html += `<div class="hirewho-job">`;
            html += `  <div>`;
            html += `    <div class="job-title">${job.title}</div>`;
            html += `    <div class="job-position">${job.position}</div>`;
            html += `    <div class="job-location">${job.city}, ${job.state}</div>`;
            html += `  </div>`;
            html += `  <div>`;
            html += `    <a href="${url}" target="_blank">View job</a>`;
            html += `  </div>`;
            html += "</div>";
        }
        html += `</div>`;
        this.container.innerHTML = html;
    }

    insertStyles() {
        const style = document.createElement("style");
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
        const { sheet } = style;
        sheet.insertRule(
            `
            #hirewho-jobs h3 {
                text-align: center;
                margin-bottom: 0;
                font-size: 1.5rem;
            }
            `,
            0
        );
        sheet.insertRule(
            `
            .hirewho-job {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                border-bottom: 1px solid #ddd;
                padding: 1rem 0;
            }
        `,
            0
        );
        sheet.insertRule(
            `
            .hirewho-job:last-child {
                border-bottom: none;
            }
        `,
            0
        );
        sheet.insertRule(
            `
            .job-title {
                font-size: 1.2rem;
            }
        `,
            0
        );
        sheet.insertRule(
            `
            .job-position, .job-location {
                color: #555;
                padding-top: .25rem;
            }
        `,
            0
        );
        sheet.insertRule(
            `
            .hirewho-job a {
                display: inline-block;
                padding: .375rem .75rem;
                color: white;
                text-decoration: none;
                background-color: rgb(8, 45, 250);
                border-radius: .25rem;
            }
        `,
            0
        );
    }
}

const e = new HireWhoPlugin(window.hirewhoConf);
e.load();
