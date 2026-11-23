# Design notes

Game AI Atlas should feel like a printed field guide or an atlas index, not a SaaS dashboard.

## Direction

- **Editorial, not decorative.** Big serif titles, small mono labels, hairlines and index numbers.
- **Warm and quiet.** Paper, ink and a single vermilion accent. No gradients, glassmorphism or neon.
- **Simple, with personality.** Generous whitespace, asymmetric typography and small cartographic marks.
- **Content first.** Search, game entries and project records are the visual hierarchy.

## Typography

- **Display:** Fraunces Variable. Used for the wordmark, hero titles, game/project titles, section titles and large numbers.
- **Body:** IBM Plex Sans Variable.
- **Labels and metadata:** IBM Plex Mono. Uppercase, small, letter-spaced.

Do not replace these with Inter, system UI or a generic rounded sans. The contrast between Fraunces, Plex Sans and Plex Mono is a core part of the identity.

## Palette

Light:

- Paper `#f1ecdf`
- Paper deep `#e8e1d0`
- Ink `#1e1c18`
- Muted `#6b6558`
- Line `#d2c8b5`
- Accent `#cf4b2b`
- Accent strong `#a83a1f`

Dark:

- Paper `#14130f`
- Paper deep `#1a1814`
- Ink `#f1ead9`
- Muted `#aaa18f`
- Line `#373229`
- Accent `#f57d58`
- Accent strong `#ffa485`

Use the accent for emphasis, not for large surfaces. Most of the page should be paper, ink and hairlines.

## Shapes and components

- Use **1px hairlines** and **2px radii**. Avoid large rounded cards, floating glass panels and heavy shadows.
- Game cards are index cards: number, title, description, metadata, footer, small arrow.
- Project entries on the home, tools and related sections are flat ledger rows with a top border and a bottom rule.
- Project rows on a game page are numbered catalogue records.
- Badges look like little printed stamps: uppercase mono, transparent background, 1px border.
- Buttons are rectangular and typographic. Primary actions use vermilion; secondary actions are outlined.
- The search box is a printed index field with a small offset shadow, not a pill.
- The crosshair mark is the atlas motif. It appears in the brand, the hero and the favicon.
- Use dotted rules in metadata lists; use dashed rules only for empty states.

## Avoid

- Purple or indigo gradients.
- Glowing borders, glassmorphism, blurred cards.
- Generic SaaS hero copy with three feature cards and a gradient CTA.
- Large pill badges with pastel backgrounds.
- Icon-heavy cards where typography would be enough.
- More than one accent color on the same screen.
- Horizontal scroll on mobile.

## Accessibility

- Keep body text at least 16px.
- Maintain AA contrast in both color schemes.
- Do not rely on color alone for status; pair stamps with labels.
- Keep keyboard focus visible.
- Respect `prefers-reduced-motion`.
- Every internal link must use `withBase()` so GitHub Pages project paths work.
