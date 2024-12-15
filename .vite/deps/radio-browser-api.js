import "./chunk-G3PMV62Z.js";

// node_modules/radio-browser-api/dist/dev/index.modern.js
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var s2 = arguments[e2];
      for (var a2 in s2) ({}).hasOwnProperty.call(s2, a2) && (t2[a2] = s2[a2]);
    }
    return t2;
  }, t.apply(null, arguments);
}
var e = { name: "name", url: "url", homepage: "homepage", favicon: "favicon", tags: "tags", country: "country", state: "state", language: "language", votes: "votes", codec: "codec", bitrate: "bitrate", lastCheckOK: "lastCheckOK", lastCheckTime: "lastCheckTime", clickTimeStamp: "clickTimeStamp", clickCount: "clickCount", clickTrend: "clickTrend", random: "random" };
var s = { byUuid: "byUuid", byName: "byName", byNameExact: "byNameExact", byCodec: "byCodec", byCodexExact: "byCodecExact", byCountry: "byCountry", byCountryExact: "byCountryExact", byCountryCodeExact: "byCountryCodeExact", byState: "byState", byStateExact: "byStateExact", byLanguage: "byLanguage", byLanguageExact: "byLanguageExact", byTag: "byTag", byTagExact: "byTagExact" };
var a = class {
  constructor(t2, e2 = true) {
    if (this.appName = void 0, this.hideBroken = void 0, this.baseUrl = void 0, this.fetchConfig = { method: "GET", redirect: "follow" }, this.appName = t2, this.hideBroken = e2, !t2) throw new Error("appName is required");
    this.fetchConfig.headers = { "user-agent": this.appName };
  }
  async resolveBaseUrl(t2 = {}) {
    let e2;
    const s2 = await fetch("http://all.api.radio-browser.info/json/servers", t2);
    if (s2.ok) return e2 = await s2.json(), e2;
    throw s2;
  }
  setBaseUrl(t2) {
    this.baseUrl = t2;
  }
  getBaseUrl() {
    return this.baseUrl;
  }
  async getCountries(t2, e2, s2) {
    return this.runRequest(this.buildRequest("countries", t2, e2), s2);
  }
  async getCountryCodes(t2, e2, s2) {
    return t2 = t2 ? `${t2.toUpperCase()}` : "", this.runRequest(this.buildRequest("countrycodes", t2, e2), s2);
  }
  async getCodecs(t2, e2) {
    return this.runRequest(this.buildRequest("codecs", "", t2), e2);
  }
  async getCountryStates(t2, e2, s2) {
    return this.runRequest(this.buildRequest("states", t2, e2), s2);
  }
  async getLanguages(t2, e2, s2) {
    return this.runRequest(this.buildRequest("languages", t2, e2), s2);
  }
  async getTags(t2, e2, s2) {
    return t2 = t2 ? t2.toLowerCase() : "", this.runRequest(this.buildRequest("tags", t2, e2), s2);
  }
  async getStationsBy(t2, e2, a2, i, n = false) {
    if (!s[t2]) throw new Error(`search type does not exist: ${t2}`);
    e2 = e2 ? e2.toLowerCase() : "";
    const o = await this.runRequest(this.buildRequest(`stations/${t2.toLowerCase()}`, e2, a2), i);
    return this.normalizeStations(o, n);
  }
  normalizeStations(t2, e2 = false) {
    const s2 = [], a2 = {};
    for (const i of t2) {
      if (e2) {
        const t4 = `${i.name.toLowerCase().trim()}${i.url.toLowerCase().trim()}`;
        if (a2[t4]) continue;
        a2[t4] = true;
      }
      const t3 = { changeId: i.changeuuid, id: i.stationuuid, name: i.name, url: i.url, urlResolved: i.url_resolved, homepage: i.homepage, favicon: i.favicon, country: i.country, countryCode: i.countrycode, state: i.state, votes: i.votes, codec: i.codec, bitrate: i.bitrate, clickCount: i.clickcount, clickTrend: i.clicktrend, hls: Boolean(i.hls), lastCheckOk: Boolean(i.lastcheckok), lastChangeTime: new Date(i.lastchangetime), lastCheckOkTime: new Date(i.lastcheckoktime), clickTimestamp: new Date(i.clicktimestamp), lastLocalCheckTime: new Date(i.lastlocalchecktime), language: i.language.split(","), lastCheckTime: new Date(i.lastchecktime), geoLat: i.geo_lat, geoLong: i.geo_long, tags: Array.from(new Set(i.tags.split(","))).filter((t4) => t4.length > 0 && t4.length < 10) };
      s2.push(t3);
    }
    return s2;
  }
  async getAllStations(t2, e2, s2 = false) {
    const a2 = await this.runRequest(this.buildRequest("stations", "", t2), e2);
    return this.normalizeStations(a2, s2);
  }
  async searchStations(t2, e2, s2 = false) {
    const a2 = await this.runRequest(this.buildRequest("stations/search", void 0, t2), e2);
    return this.normalizeStations(a2, s2);
  }
  async getStationsByClicks(t2, e2) {
    return this.resolveGetStations("topclick", t2, e2);
  }
  async getStationsByVotes(t2, e2) {
    return this.resolveGetStations("topvote", t2, e2);
  }
  async getStationsByRecentClicks(t2, e2) {
    return this.resolveGetStations("lastclick", t2, e2);
  }
  async sendStationClick(t2, e2) {
    return this.runRequest(this.buildRequest("url", t2, void 0, false), e2);
  }
  async voteForStation(t2, e2) {
    return this.runRequest(this.buildRequest("vote", t2), e2);
  }
  async getStationsById(t2, e2) {
    const s2 = t2.join(","), a2 = await this.runRequest(this.buildRequest(`stations/byuuid?uuids=${s2}`, void 0, void 0, false), e2);
    return this.normalizeStations(a2);
  }
  async getStationByUrl(t2, e2) {
    const s2 = await this.runRequest(this.buildRequest(`stations/byurl?url=${t2}`, void 0, void 0, false), e2);
    return this.normalizeStations(s2);
  }
  async resolveGetStations(t2, e2, s2) {
    const a2 = e2 ? `/${e2}` : "", i = await this.runRequest(this.buildRequest(`stations/${t2}${a2}`, void 0, void 0, false), s2);
    return this.normalizeStations(i);
  }
  buildRequest(e2, s2, a2, i = true) {
    let n;
    return s2 = s2 ? `/${encodeURIComponent(s2)}` : "", a2 && (n = t({}, a2), "tagList" in n && Array.isArray(n.tagList) && (n.tagList = [...n.tagList]), i && void 0 === n.hideBroken && (n.hideBroken = this.hideBroken)), `${e2}${s2}${n ? this.createQueryParams(n) : ""}`;
  }
  async runRequest(e2, s2 = {}) {
    const a2 = t({}, this.fetchConfig, s2, { headers: t({}, this.fetchConfig.headers, s2.headers) });
    if (!this.baseUrl) {
      const t2 = await this.resolveBaseUrl(), e3 = Math.floor(Math.random() * t2.length);
      this.baseUrl = `https://${t2[e3].name}`;
    }
    const i = await fetch(`${this.baseUrl}/json/${e2}`, a2);
    if (i.ok) return i.json();
    throw i;
  }
  createQueryParams(t2) {
    let e2 = "";
    if (t2) for (const [s2, a2] of Object.entries(t2)) {
      let t3 = s2.toLowerCase();
      switch (t3) {
        case "hasgeoinfo":
          t3 = "has_geo_info";
          break;
        case "hidebroken":
          t3 = "hidebroken";
          break;
        case "taglist":
          t3 = "tagList";
      }
      e2 += `&${t3}=${encodeURIComponent(a2)}`;
    }
    return e2.length ? `?${e2.slice(1)}` : "";
  }
};
a.version = "6.0.2";
export {
  a as RadioBrowserApi,
  e as StationSearchOrder,
  s as StationSearchType
};
//# sourceMappingURL=radio-browser-api.js.map
