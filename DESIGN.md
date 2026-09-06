# Streamify Design Context

Streamify is a language-exchange social app for learners who want to meet, message, and call real practice partners. The interface should feel calm, trustworthy, and socially warm without becoming a marketing page.

## Visual System

- Background: clean app canvas with subtle mint and coral atmospheric accents.
- Surfaces: white or daisyUI base surfaces with fine borders, low shadows, and 8px to 16px radii depending on scale.
- Primary accent: mint/aqua for brand, navigation, and communication actions.
- Secondary accent: coral for social/request moments.
- Support accent: soft lavender for quiet contrast.
- Typography: system sans, strong compact headings, deliberate control text, no decorative mono except where already used for the wordmark.

## Layout

- Auth screens use a split product panel on desktop and a single focused card on mobile.
- Authenticated screens use a stable left rail, sticky top bar, and airy content sections.
- Cards are individual records only: friend cards, recommendation cards, notification rows.
- Avoid nested cards, oversized rounded wrappers, decorative blobs, and one-color themes.

## Interaction

- Existing routes, data fetching, mutations, Stream chat, video call, theme switching, and form behavior are preserved.
- Buttons keep their existing actions and labels.
- Loading, empty, disabled, and selected states should stay stable in size and visually clear.
