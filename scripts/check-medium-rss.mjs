// Run: node scripts/check-medium-rss.mjs  (needs Node >= 22.18 for TS type stripping)
import assert from "node:assert/strict";
import { parseMediumFeed } from "../src/lib/content/articles/medium.ts";

const [a, b] = parseMediumFeed(`<channel><title>x</title>
<item><title><![CDATA[Latency <b>Lies</b>]]></title>
<link>https://medium.com/@u/latency-lies-abc123?source=rss-1</link>
<category><![CDATA[devops]]></category><category>cicd</category>
<pubDate>Wed, 29 Jul 2026 13:20:00 GMT</pubDate></item>
<item><title>Plain title</title><link>https://medium.com/@u/plain-9</link>
<pubDate>garbage</pubDate></item></channel>`);

assert.equal(a.title, "Latency <b>Lies</b>");
assert.equal(a.url, "https://medium.com/@u/latency-lies-abc123");
assert.equal(a.date, "2026-07-29");
assert.deepEqual(a.tags, ["devops", "cicd"]);
assert.equal(b.title, "Plain title");
assert.equal(b.date, undefined);
assert.deepEqual(b.tags, []);

const res = await fetch("https://medium.com/feed/@wafoaristide");
const live = parseMediumFeed(await res.text());
assert.ok(live.length > 0 && live.every((x) => x.title && x.url && !x.url.includes("?")));
console.log(`ok: fixture + ${live.length} live items`, live.map((x) => `${x.date} ${x.title}`));
