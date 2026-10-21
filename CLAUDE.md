# thegoatdrink.com

Affiliate landing page for GOATED, the nootropic performance drink by IQ Health LLC (Boise, ID).
Steve is an affiliate; every CTA sends people to the IQ Health product page with his ref code.

- Repo: https://github.com/conceptosdesign/thegoatdrink-com (main, pushes auto-deploy)
- Vercel: project `thegoatdrink-com` in team conceptosdesigns-projects, prod at https://thegoatdrink-com.vercel.app
- Custom domain: thegoatdrink.com and www.thegoatdrink.com are attached to the Vercel project (added 2026-10-20,
  ownership verified, www 308-redirects to the apex). Domain is at GoDaddy on GoDaddy nameservers with GoDaddy
  forwarding turned on (that is where the old forward to stevelemus.com/goated/ comes from). To go live Steve must,
  in GoDaddy DNS: turn OFF forwarding, delete the forwarding A records (3.33.130.190 / 15.197.148.33), then add
  A @ -> 216.150.1.1 and CNAME www -> 45c4b84eb929b254.vercel-dns-016.com (Vercel's rank 1 values from the
  domains config API; 76.76.21.21 / cname.vercel-dns.com are the older fallbacks). Alternative: switch nameservers
  to ns1/ns2.vercel-dns.com and let Vercel manage DNS. Check with `vercel domains inspect thegoatdrink.com`.

## Layout
- `index.html` is the source of truth. Single self-contained file, all CSS and JS inline, no build step.
  Sections: sticky nav, hero (12 pack shot + 0 sugar stamp), ticker, Why GOATED (6 cards), sugar comparison,
  What's inside (nutrition panel + 3 Smart Fuel blends + vitamins), reported results (4 stats), how to use,
  the 12 pack offer (black, box art), FAQ, final CTA, footer with affiliate + FDA disclosures.
- Brand tokens are the `:root` vars at the top of the style block, sampled from the sell sheet
  (`GOATED-Performance-Drink.pdf`): teal `#40b8b0`, pink `#c880a8`, black `#0b0a09`, white base.
  Fonts: Montserrat 800/900 (uppercase headings), Figtree (body), Mr Dafoe (script accents like "The Sauce").
- `images/`: hero-12pack.jpg (from brainiqhealth.com), box-12pack / tray-24 / can-single / nutrition-facts
  (cropped from the PDF via the JXA pdf2png recipe at 3600px). `assets/`: logo-mark.png (crown G, transparent),
  favicon, apple-touch-icon, og-image.jpg. `reference-sugar-matters.jpg` is reference only, not deployed.
- `ghl-export/` is empty and unused; this site ships on Vercel, not GHL.

## CTAs and the failsafe
- All CTAs are `<a class="cta" href="/go" rel="nofollow sponsored">`. `/buy` is an alias.
- `api/go.js` is a Vercel function: it fetches the product URL server-side (3.5s timeout, 5 min in-memory cache).
  2xx and final URL still under `/product/` => 302 to the product link. Anything else (404, 5xx, timeout,
  product bounced to /shop/) => 302 to the fallback https://brainiqhealth.com/ref/conceptosdesign/.
  Both URLs live at the top of that file. Test locally with `node` by requiring the module (see git history).
- `vercel.json` has the /go and /buy rewrites, cleanUrls, and 1 year immutable caching on images.
- `.vercelignore` keeps the PDF, CLAUDE.md, READMEs and the reference image out of the deploy.

## Facts used on the page (all from the sell sheet or the IQ Health product page)
12 fl oz, 0 cal, 0g sugar, allulose. Vit C 180mg, B3 32mg, B6 25mg, B12 200mcg. Smart Fuel blend 685mg
(green tea caffeine, capsanthin, ginseng, oligonol), Restore blend 300mg (BCAA 2:1:1), Vision blend 60mg
(lutein, marigold, vit A, capsanthin). Price $42 / 12 pack, free US shipping over $149. Flavor: The Sauce.
Result stats (87/92/78/65%) are IQ Health's claims and are labeled as such. Karate Combat performance partner.

## Voice
No em-dashes. Short sentences. Conversational.

## Local preview
    cd "$HOME/Local Sites/thegoatdrink.com" && python3 -m http.server 4180
then attach the `thegoatdrink` entry in ~/Desktop/Claude Code/.claude/launch.json. Note `/go` 404s under the
static server; test the function with node or on the Vercel URL.

## Open items
- Attach thegoatdrink.com in Vercel + fix registrar DNS (Steve)
- privacy.html and terms.html are linked in the footer but do not exist yet
- og-image.jpg is the bare product shot; add a wordmark if wanted
