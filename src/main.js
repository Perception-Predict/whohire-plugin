// WH-4145: default campaign tagging for links rendered by the embedded
// careers-page plugin, so those applications are separable from direct
// traffic in the source reports. Overridable per install via `utmSource` /
// `utmMedium` / `utmCampaign` in the conf object, or the matching
// `data-utm-*` attributes on the container element.
const DEFAULT_UTM_SOURCE = "careers_page";
const DEFAULT_UTM_MEDIUM = "embed";

/**
 * Class to load HireWho jobs in a div for specific business
 */
class HireWhoPlugin {
  /**
   * Initiate plugin
   * @param {object} conf - contains business slug and optional HTML container ID
   */
  constructor(conf) {
    this.container =
      document.getElementById("hirewho-plugin") ||
      document.getElementById("whohire-plugin");

    // validate
    if (!!conf) {
      if (!conf) throw Error("HireWhoPlugin conf not available");
      if (!conf.slug)
        throw Error("The business slug is needed for HireWho Plugin to load.");
      // set shared variables
      this.slug = conf.slug;
      this.title = conf.title || "Job openings";
      this.container = document.getElementById(conf.container);
      this.utmSource = conf.utmSource || DEFAULT_UTM_SOURCE;
      this.utmMedium = conf.utmMedium || DEFAULT_UTM_MEDIUM;
      this.utmCampaign = conf.utmCampaign || null;
    } else {
      this.slug = this.container.getAttribute("data-slug");
      this.title = this.container.getAttribute("data-title") || "Job openings";
      this.utmSource =
        this.container.getAttribute("data-utm-source") || DEFAULT_UTM_SOURCE;
      this.utmMedium =
        this.container.getAttribute("data-utm-medium") || DEFAULT_UTM_MEDIUM;
      this.utmCampaign = this.container.getAttribute("data-utm-campaign");
    }
  }

  /**
   * Campaign parameters appended to every job link this plugin renders.
   *
   * Without these, an application that came through a customer's embedded
   * careers page is indistinguishable from someone who typed the URL in --
   * both land as plain direct traffic. WH-4145.
   *
   * @returns {string} a query string beginning with "?", never empty
   */
  _utmQuery() {
    const params = new URLSearchParams({
      utm_source: this.utmSource,
      utm_medium: this.utmMedium,
    });
    if (this.utmCampaign) params.set("utm_campaign", this.utmCampaign);
    return `?${params.toString()}`;
  }

  /**
   * Main function to call to load jobs in a div
   */
  load() {
    const url = `https://api.whohire.com/api/job/?slug=${this.slug}&publish=1`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => this._process(data));
    this._insertStyles();
  }

  /**
   * Process jobs to show them on webpage
   * @param {array} jobs - public jobs fetched from API
   */
  _process(jobs) {
    if (!jobs.length) return;
    let html = `<div id="hirewho-jobs">`;
    html += `<h3>${this.title}</h3>`;
    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      const url = `https://app.whohire.com/job/${this.slug}/${job.id}${this._utmQuery()}`;
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

  /**
   * Insert CSS styles
   */
  _insertStyles() {
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

// Fire plugin
new HireWhoPlugin(window.hirewhoConf).load();
