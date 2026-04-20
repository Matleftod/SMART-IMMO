# Agent working rules

## Mission
Improve the visual design quality of the existing HTML mockups while preserving the approved brand direction, client palette, and overall premium tone.

The goal is not to redesign everything.
The goal is to make each section more readable, more intentional, and more visually credible, especially when content length changes.

## Core operating rules
- Work section by section unless explicitly asked to redesign a full page
- Preserve what is already working
- Do not rewrite approved copy
- Treat uploaded client copy or PDF copy as source of truth for text
- Adapt layout and styling to content, not the reverse
- Prefer targeted corrections over broad redesigns
- Do not introduce a new visual language unless explicitly asked

## Mandatory use of Impeccable
For front-end design changes, explicitly use Impeccable skills whenever relevant.

Use the appropriate command depending on the problem:
- `/prompts:critique` for diagnosis only
- `/prompts:layout` when the section structure is no longer adapted to the content
- `/prompts:adapt` when the section still works but needs spacing, wrapping, density, or responsive adjustments
- `/prompts:polish` for finishing passes only
- `/prompts:typeset` only for typography-specific issues
- `/prompts:bolder` only when a section needs a stronger visual idea without changing the overall brand direction
- `/prompts:optimize` only for performance or rendering issues
- `/prompts:colorize` only when token consistency or controlled palette cleanup is needed

Never answer with a generic redesign approach if an Impeccable command is the right tool.

## Priority order
1. Desktop composition quality
2. Reading hierarchy
3. Content fit and clarity
4. Section rhythm and spacing
5. Visual personality
6. Interaction polish
7. Responsive robustness
8. Clean code

## Desktop-first rules
- Always design for desktop first
- Responsive behavior must adapt to the desktop design, not replace it
- Never flatten a strong desktop composition into a mobile-like stacked flow on desktop
- Never let mobile constraints dictate the desktop layout
- Validate large desktop first, then laptop, then smaller screens
- Responsive changes should remain minimal and subordinate unless the user explicitly asks for a mobile redesign

## Content handling rules
- When client text changes, preserve the exact wording
- Do not rewrite, simplify, shorten, paraphrase, or “improve” the copy unless explicitly asked
- If content length breaks the layout, fix the layout
- Do not force longer text into a structure designed for shorter copy
- Treat content updates and design adaptation as separate concerns when possible

## Design principles
- Avoid generic SaaS layouts
- Avoid repetitive card grids with identical spacing
- Avoid uniform section patterns repeated across the page
- Avoid turning every problem into a centered block or stacked single-column layout
- Prefer editorial composition when relevant
- Use asymmetry carefully and only when it improves hierarchy
- Make each section feel intentionally composed
- Keep interaction subtle, useful, and integrated
- Make CTA blocks feel intentional, not default
- Preserve clarity and usability at all times
- Keep motion subtle and purposeful
- Make every section feel designed, not auto-generated

## Section adaptation rules
- If the original section logic still works, improve it instead of replacing it
- If the original section is structurally broken by new content, rebuild it with the same brand direction
- Do not introduce decorative ideas that compete with readability
- Do not use cards, tabs, timelines, ledgers, or split layouts mechanically
- Use stronger structure only when it improves the reading path
- Keep one clear focal point per section
- Avoid multiple competing text zones of equal weight
- Integrate supporting content naturally instead of appending it as a disconnected block

## Hero-specific rules
- A hero should remain a true desktop hero
- Preserve a strong focal composition
- Do not turn a hero into a generic vertical content stack on desktop
- If a hero has a main content zone and a secondary supporting block, preserve that relationship unless explicitly asked to remove it
- A hero should visually fill the screen when that is the intended design
- Secondary content must support the main message, never compete with it

## Typography rules
- Use stronger hierarchy when content gets longer
- Avoid overly generic uppercase micro-label treatment
- Avoid tracking and leading that harm readability
- Keep serif/display text expressive but controlled
- Ensure active content never visually overpowers the main section title unless explicitly intended

## CSS expectations
- Use design tokens where possible
- Normalize spacing scale
- Normalize border radius scale
- Normalize shadow language
- Normalize container widths
- Normalize interactive states
- Keep responsive behavior robust
- Remove decorative effects that do not improve clarity
- Do not use visual treatments that feel trendy but weaken credibility

## Output expectations
When asked to refine a page or section:
- first identify the real problem
- then choose the correct Impeccable skill
- then implement the change
- then explain what changed and why
- then mention remaining weak points only if they are real

## What to avoid
- Mobile-first redesigns imposed on desktop
- Rewriting client copy without permission
- Saving a broken structure with spacing hacks only
- Creating new visual problems while solving content-fit issues
- Generic “clean modern” redesigns
- Overusing cards, vertical stacks, or split layouts without purpose
- Making all sections behave like the same component pattern