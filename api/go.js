// /go : affiliate CTA with a failsafe.
// Checks the product page server-side. If it answers 2xx and still looks like a
// product page, send the visitor there. Anything else (404, 5xx, timeout, network
// error, product moved to the shop page) falls back to the IQ Health homepage link.
// Result is cached in memory for a few minutes so the hop stays fast.

const PRIMARY  = 'https://brainiqhealth.com/product/goated-drink-brain-and-body-fuel-12-pack/ref/conceptosdesign/';
const FALLBACK = 'https://brainiqhealth.com/ref/conceptosdesign/';
const TIMEOUT_MS = 3500;
const CACHE_MS   = 5 * 60 * 1000;

let cache = { ok: null, at: 0 };

async function primaryIsUp() {
  const now = Date.now();
  if (cache.ok !== null && now - cache.at < CACHE_MS) return cache.ok;
  let ok = false;
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
    const r = await fetch(PRIMARY, {
      method: 'GET',
      redirect: 'follow',
      signal: ctl.signal,
      headers: { 'user-agent': 'thegoatdrink.com link check', 'accept': 'text/html' },
    });
    clearTimeout(t);
    // 2xx and the final URL still lives under /product/ (WooCommerce bounces
    // removed products to the shop or home page, often with a 200).
    ok = r.ok && /\/product\//.test(r.url || PRIMARY);
  } catch (e) {
    ok = false;
  }
  cache = { ok, at: now };
  return ok;
}

module.exports = async (req, res) => {
  const up = await primaryIsUp();
  const target = up ? PRIMARY : FALLBACK;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  res.statusCode = 302;
  res.setHeader('Location', target);
  res.end();
};

module.exports.PRIMARY = PRIMARY;
module.exports.FALLBACK = FALLBACK;
module.exports.primaryIsUp = primaryIsUp;
