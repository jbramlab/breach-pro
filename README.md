# Breach Pro

Rainbow Six Siege strategy site: attack and defence plans for every bomb site on the ranked maps, adjusted for squad size (solo queue to five-stack) and rank. Slogan: "Breach smarter". Live at breachpro.co.uk (planned).

## Plan

- Flow: pick a map, then a site, then your squad and rank, and get the strat with in-game images rather than text only.
- "Briefing room" home page with a quick map, site and squad picker.
- Built as an installable web app, because most players use it on their phone during a match. App stores maybe later.
- Community section for clips and suggestions, fed from the Breach Pro Discord server and moderated there. A "strat of the week" slot.
- Ember colour theme: dark charcoal, amber and burnt orange.
- Hosted on Cloudflare.

## Layout

| Folder | What goes here |
| --- | --- |
| `site` | The web app (pages, styles, scripts, manifest, service worker). |
| `site/assets/maps` | Map and site images. |
| `data` | Strats as structured data (map, site, side, squad size, rank, operators, loadouts, steps). |
| `bot` | Breach Pro Discord bot: clip collection, moderation reports to the mods channel. |

## Rules for content

- Suggested loadouts never include laser sights.
- No personal names anywhere on the site.
- Fan site, not affiliated with Ubisoft. Follow Ubisoft's fan content guidelines, so no paid membership.

## Status

Design stage. Site files are on my PC and will be added here.
