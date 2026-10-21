# thegoatdrink.com

Status: scaffold only (created 2026-10-20). Brand, copy, and product details are all placeholders.

## Layout
- `index.html` is the source of truth. Single self-contained file, all CSS and JS inline, no build step.
  Sections: sticky nav, hero, "Why GOAT" 3-card grid, product section with bullets + price, email capture CTA, footer.
- Brand tokens live at the top of the `<style>` block (`:root` vars). Retheme by changing those first.
  Current placeholder palette: near-black `#0e0e10`, cream ink `#f5f1e8`, electric lime accent `#c8f03c`.
  Fonts: Bricolage Grotesque (headings) + Figtree (body) via Google Fonts.
- `images/` holds page photography (hero.jpg 4:5, product.jpg 1:1). `assets/` holds brand/meta files
  (favicon.png, apple-touch-icon.png, og-image.jpg, logo). See the README in each.
- `ghl-export/` is reserved for the GoHighLevel split (page.html + styles.css) if this ships on GHL,
  same pattern as millennium-nightclub. Empty until then.
- `privacy.html` and `terms.html` are linked in the footer but not created yet.

## Voice
No em-dashes. Short sentences. Conversational, like talking to one person.

## Local preview
Serve the folder statically, then attach the browser pane (preview sandbox cannot spawn servers itself):

    cd "$HOME/Local Sites/thegoatdrink.com" && python3 -m http.server 4180

## Domain
thegoatdrink.com currently forwards (registrar-level) to https://stevelemus.com/goated/, which 404s.
Hosting is undecided. Fix the forward or point DNS at the real host before launch.

## Open items
- Real brand: logo, colors, fonts, product name and flavor(s)
- Copy for every section (all marked "placeholder" in index.html)
- Hero and product photography
- Email form: wire to a GHL form or webhook (currently an alert stub)
- privacy.html, terms.html
- Decide hosting (GHL vs Vercel vs other)
