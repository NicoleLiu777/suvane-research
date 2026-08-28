import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the SUVANÉ Research decision surface", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>SUVANÉ Research<\/title>/);
  assert.match(html, /Should we pilot an AI companion/);
  assert.match(html, /Human-in-the-loop by design/);
});

test("renders an honest Ask surface before client retrieval", async () => {
  const response = await render("/ask");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Start with the decision, not the search terms/);
  assert.match(html, /Generate decision brief/);
  assert.match(html, /This is decision support, not medical advice/);
  assert.doesNotMatch(html, /6 sources/);
});
