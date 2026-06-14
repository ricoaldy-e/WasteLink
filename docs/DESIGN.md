# Design System Inspired by MallSampah

## 1. Visual Theme & Atmosphere

MallSampah's design system embodies a mission-driven, accessible approach to environmental impact. The visual identity centers on vibrant green tones that evoke sustainability and trust, paired with a clean, modern aesthetic that prioritizes clarity and community participation. The design language is bold yet approachable, using generous whitespace and straightforward typography to communicate recycling initiatives and impact metrics. The system balances professional authority with grassroots energy, reflecting MallSampah's role as a connecting platform between collectors, communities, and recycling networks across Indonesia.

**Key Characteristics**
- Bold, purpose-driven green as the dominant brand color
- Clean, high-contrast typography for readability and clarity
- Generous spacing and breathing room in layouts
- Inclusive, accessible design with strong touch targets
- Modern sans-serif typefaces (Red Hat family) for contemporary feel
- Community-focused imagery and mission-aligned messaging
- Functional simplicity with minimal visual decoration

## 2. Color Palette & Roles

### Primary
- **Brand Green** (`#299E63`): Primary interactive elements, CTAs, success states, and key brand touchpoints. Used for buttons, links, and accent highlights throughout the interface.
- **Forest Green** (`#006400`): Deeper accent and secondary branding. Used for hover states and emphasis on key messaging areas.

### Interactive
- **Primary Text** (`#1A202C`): Main body text, navigation items, and default link states. High contrast for readability on light backgrounds.
- **Secondary Text** (`#464F54`): Supplementary text, supporting copy, and secondary navigation. Slightly reduced emphasis from primary text.
- **Tertiary Text** (`#222D33`): De-emphasized text, captions, and tertiary navigation items.

### Neutral Scale
- **Background Light** (`#FFFFFF`): Primary content background and card surfaces.
- **Border Light** (`#E2E8F0`): Subtle borders, dividers, and form input backgrounds. Most-used neutral for structural elements.
- **Divider** (`#E4E5E6`): Secondary border color for less-prominent divisions and separators.

### Surface & Borders
- **Card Background** (`#FFFFFF`): Default surface for cards, containers, and modals.
- **Border Color** (`#E2E8F0`): Primary stroke color for input fields, cards, and structural divisions.

### Semantic / Status
- **Success** (`#299E63`): Positive actions, confirmations, and completed states.

## 3. Typography Rules

### Font Family
**Primary Display Font:** Red Hat Display
- Fallback: `'Red Hat Display', 'Segoe UI', system-ui, sans-serif`

**Primary Body Font:** Red Hat Text
- Fallback: `'Red Hat Text', 'Segoe UI', system-ui, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display Large | Red Hat Display | 64px | 700 | 80px | 0px | Hero headings, page titles |
| Heading 1 | Red Hat Text | 40px | 700 | 48px | 0px | Section headings |
| Heading 2 | Red Hat Text | 32px | 700 | 40px | 0px | Subsection headings |
| Heading 3 | Red Hat Text | 24px | 700 | 32px | 0px | Card titles, component headers |
| Body Large | Red Hat Text | 18px | 500 | 28px | 0px | Large body text, introductions |
| Body Regular | Red Hat Text | 16px | 500 | 24px | 0px | Default body copy, paragraphs |
| Body Small | Red Hat Text | 14px | 500 | 21px | 0px | Secondary text, descriptions |
| Link | Red Hat Text | 16px | 400 | 24px | 0px | Hyperlinks, interactive text |
| Button | Red Hat Text | 16px | 700 | 19px | 0px | Button text, CTAs |
| Caption | Red Hat Text | 12px | 400 | 18px | 0px | Captions, labels, metadata |

### Principles
- **Clarity first:** Choose bold, high-contrast text for accessibility in diverse environments and devices.
- **Hierarchy through weight:** Rely primarily on font weight (400, 500, 700) to establish visual hierarchy rather than excessive size variation.
- **Spacing as breathing:** Generous line heights (1.2–1.75) allow text to breathe and improve scannability on mobile and desktop.
- **Brand voice:** Red Hat family conveys modern, approachable authority aligned with MallSampah's community mission.
- **Performance:** Minimal font variants reduce load times while maintaining visual richness.

## 4. Component Stylings

### Buttons

**Primary Button (Solid Green)**
- Background: `#299E63`
- Text Color: `#FFFFFF`
- Font Size: `16px`
- Font Weight: `700`
- Font Family: `Red Hat Text`
- Padding: `12px 24px`
- Border Radius: `6px`
- Border: `none`
- Height: `44px`
- Box Shadow: `none`
- Hover State: Background `#1F7A4A`, cursor pointer
- Active State: Background `#1A6340`
- Disabled State: Background `#B0D4B8`, Color `#FFFFFF`, cursor not-allowed

**Secondary Button (Green Outline)**
- Background: `transparent`
- Text Color: `#299E63`
- Font Size: `16px`
- Font Weight: `700`
- Font Family: `Red Hat Text`
- Padding: `12px 24px`
- Border: `1px solid #299E63`
- Border Radius: `6px`
- Height: `44px`
- Box Shadow: `none`
- Hover State: Background `rgba(41, 158, 99, 0.08)`, Border `#1F7A4A`
- Active State: Background `rgba(41, 158, 99, 0.15)`
- Disabled State: Border `#D4E4DB`, Color `#B0D4B8`, cursor not-allowed

**Ghost Button (Text Only)**
- Background: `transparent`
- Text Color: `#299E63`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: `Red Hat Text`
- Padding: `8px 12px`
- Border: `none`
- Border Radius: `0px`
- Height: `auto`
- Box Shadow: `none`
- Hover State: Text Color `#1F7A4A`, text-decoration underline
- Active State: Text Color `#1A6340`
- Disabled State: Color `#B0D4B8`, cursor not-allowed

### Cards & Containers

**Default Card**
- Background: `#FFFFFF`
- Border: `1px solid #E2E8F0`
- Border Radius: `8px`
- Padding: `24px`
- Box Shadow: `rgba(18, 44, 77, 0.04) 0px 1px 12px 0px`
- Hover State: Box Shadow `rgba(18, 44, 77, 0.08) 0px 4px 16px 0px`

**Card with Icon**
- Background: `#FFFFFF`
- Border: `1px solid #E2E8F0`
- Border Radius: `8px`
- Padding: `20px`
- Display: flex, gap `16px`
- Icon Size: `48px` × `48px`
- Icon Background: `rgba(41, 158, 99, 0.12)`
- Icon Border Radius: `6px`
- Icon Color: `#299E63`

**Hero Section Background**
- Background: Linear gradient from `#299E63` (left) to `#1F7A4A` (right)
- Padding: `80px 64px`
- Min Height: `500px`
- Overlay: Diagonal geometric accent with opacity `0.1`

**Stats Container**
- Background: `#299E63`
- Border Radius: `8px`
- Padding: `32px 24px`
- Display: grid, 4 columns
- Gap: `24px`
- Stat Text Color: `#FFFFFF`
- Stat Number Font Size: `24px`, Weight `700`
- Stat Label Font Size: `14px`, Weight `500`

### Inputs & Forms

**Text Input**
- Background: `#FFFFFF`
- Border: `1px solid #E2E8F0`
- Border Radius: `6px`
- Padding: `12px 16px`
- Font Size: `16px`
- Font Family: `Red Hat Text`
- Color: `#1A202C`
- Placeholder Color: `#464F54`
- Height: `44px`
- Focus State: Border `#299E63`, Box Shadow `0px 0px 0px 3px rgba(41, 158, 99, 0.1)`
- Error State: Border `#DC2626`, Background `#FEE2E2`

**Select / Dropdown**
- Background: `#FFFFFF`
- Border: `1px solid #E2E8F0`
- Border Radius: `6px`
- Padding: `12px 16px`
- Font Size: `16px`
- Height: `44px`
- Focus State: Border `#299E63`
- Arrow Icon Color: `#299E63`

**Form Label**
- Font Size: `14px`
- Font Weight: `600`
- Color: `#1A202C`
- Margin Bottom: `8px`
- Display: block

### Navigation

**Header Navigation Bar**
- Background: `#FFFFFF`
- Border Bottom: `1px solid #E2E8F0`
- Height: `64px`
- Padding: `12px 24px`
- Display: flex, justify-content space-between, align-items center
- Box Shadow: `rgba(18, 44, 77, 0.04) 0px 1px 12px 0px`

**Logo**
- Font Size: `24px`
- Font Weight: `700`
- Color: `#299E63`
- Font Family: `Red Hat Text`

**Nav Link**
- Color: `#1A202C`
- Font Size: `16px`
- Font Weight: `400`
- Padding: `8px 16px`
- Border Radius: `4px`
- Hover State: Color `#299E63`, Background `rgba(41, 158, 99, 0.08)`
- Active State: Color `#299E63`, Border Bottom `2px solid #299E63`

**Dropdown Menu**
- Background: `#FFFFFF`
- Border: `1px solid #E2E8F0`
- Border Radius: `6px`
- Box Shadow: `0px 10px 25px rgba(0, 0, 0, 0.1)`
- Padding: `8px 0px`
- Min Width: `200px`

### Badges

**Success Badge**
- Background: `rgba(41, 158, 99, 0.12)`
- Text Color: `#1F7A4A`
- Font Size: `12px`
- Font Weight: `600`
- Padding: `4px 12px`
- Border Radius: `4px`
- Border: `1px solid #299E63`

**Neutral Badge**
- Background: `#E2E8F0`
- Text Color: `#464F54`
- Font Size: `12px`
- Font Weight: `600`
- Padding: `4px 12px`
- Border Radius: `4px`
- Border: `none`

## 5. Layout Principles

### Spacing System
**Base Unit:** `4px`

**Spacing Scale:**
- `8px`: Tight spacing, button padding, minor gaps
- `12px`: Button padding, input padding
- `16px`: Content padding, horizontal margins, standard gaps
- `20px`: Card padding, section margins
- `24px`: Large padding, generous gaps, component spacing
- `32px`: Section breaks, major layout divisions
- `48px`: Large gaps between major sections
- `60px`: Vertical section padding
- `64px`: Hero section padding, large container padding
- `80px`: Full-section padding, max emphasis spacing
- `88px`: Major section vertical spacing
- `108px`: Extra-large vertical gaps for distinct sections

**Usage Context:**
- Micro spacing (`8px–12px`): Buttons, form controls, icon spacing
- Standard spacing (`16px–24px`): Card content, horizontal margins, standard component gaps
- Section spacing (`32px–48px`): Between content sections, grid gaps
- Page spacing (`60px–108px`): Hero sections, full-page vertical rhythm

### Grid & Container
**Max Width:** `1200px` (centered with auto margin)

**Column Strategy:** 12-column responsive grid
- Desktop (1200px+): 12 columns, `24px` gutter
- Tablet (768px–1199px): 8 columns, `20px` gutter
- Mobile (< 768px): 4 columns, `16px` gutter

**Section Patterns:**
- Full bleed hero with gradient overlay
- Centered content container with max-width constraint
- Two-column layout (image + text) on desktop, stacked on mobile
- Four-column card grid on desktop, collapsing to 2 columns on tablet and 1 on mobile

### Whitespace Philosophy
Whitespace is treated as a primary design element to enhance clarity and reduce cognitive load. The system embraces generous padding and margins to create visual breathing room, especially in hero sections and between major content blocks. Whitespace guides the eye toward key CTAs and messaging without requiring visual borders or heavy design elements. This approach reflects MallSampah's mission to make recycling feel accessible and approachable rather than overwhelming.

### Border Radius Scale
- `0px`: Sharp corners for grid-based, structured layouts (rarely used)
- `4px`: Subtle rounding for badges, small UI elements
- `5px`: Image corners, subtle visual softness
- `6px`: Primary component rounding (buttons, inputs, cards)
- `8px`: Card and container rounding, larger components
- `12px`: Extra-large buttons and hero sections

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | `box-shadow: none` | Flat cards, backgrounds, body text |
| Raised | `box-shadow: rgba(18, 44, 77, 0.04) 0px 1px 12px 0px` | Default cards, navigation bar, subtle elevation |
| Elevated | `box-shadow: rgba(18, 44, 77, 0.08) 0px 4px 16px 0px` | Hovered cards, modals, interactive states |
| Floating | `box-shadow: rgba(18, 44, 77, 0.12) 0px 10px 25px 0px` | Dropdown menus, floating action buttons, overlays |

**Shadow Philosophy:**
The shadow system uses a consistent shadow color (`rgba(18, 44, 77, 0.04–0.12)`) that matches the primary text color at varying opacities. Shadows are restrained and subtle, avoiding heavy drop shadows that would clash with the clean, modern aesthetic. Elevation is used sparingly to distinguish interactive layers (cards on hover, modals, dropdowns) without creating visual heaviness. The system prioritizes clarity and whitespace over depth, with shadows serving as understated guides rather than dramatic flourishes.

## 7. Do's and Don'ts

### Do
- Use `#299E63` (Brand Green) as the primary action color for all CTAs, links, and interactive states.
- Maintain minimum `16px` font size for body text to ensure readability on all devices.
- Apply `24px` padding to all card and container elements for consistent spacing.
- Use `6px` border radius for buttons and form inputs; `8px` for cards and larger containers.
- Center content with a max-width of `1200px` and provide breathing room on all sides.
- Leverage the Red Hat typeface family (Display for headlines, Text for body) consistently across all elements.
- Provide generous whitespace between sections; use `48px–80px` vertical gaps between major content blocks.
- Test all touch targets on mobile; maintain minimum `44px` height for interactive elements.
- Use the subtle shadow (`rgba(18, 44, 77, 0.04) 0px 1px 12px 0px`) for cards in default state.
- Always include hover and active states for buttons and interactive elements.
- Ensure color contrast ratios meet WCAG AA standards (minimum 4.5:1 for normal text).

### Don't
- Mix multiple green shades outside the defined palette (`#299E63`, `#1F7A4A`, `#006400`).
- Use shadows heavier than the floating level (`rgba(18, 44, 77, 0.12) 0px 10px 25px 0px`).
- Apply padding smaller than `8px` or larger than `108px` outside of justified edge cases.
- Set font sizes below `12px` for body text or captions.
- Create text color contrasts below `#464F54` (secondary gray) without significant visual hierarchy.
- Use primary text color (`#1A202C`) for links; always use green (`#299E63`).
- Stretch content wider than `1200px` without a clear layout justification.
- Ignore focus states for keyboard navigation; all interactive elements must have visible focus indicators.
- Combine multiple border radii values inconsistently within a single component.
- Overload pages with heavy imagery or dense information; respect whitespace conventions.
- Use decorative shadows or gradients that obscure content or reduce readability.

## 8. Responsive Behavior

### Breakpoints

| Breakpoint Name | Width | Key Changes |
|-----------------|-------|-------------|
| Mobile | 320px–767px | Single column layout, 4-column grid, `16px` gutter, stacked hero sections |
| Tablet | 768px–1199px | Two-column layout where applicable, 8-column grid, `20px` gutter, larger touch targets |
| Desktop | 1200px+ | Full multi-column layouts, 12-column grid, `24px` gutter, max-width container `1200px` |

### Touch Targets
- Minimum size: `44px` × `44px` for all interactive elements (buttons, links, form controls)
- Mobile: Increase padding on buttons from `12px 24px` to `16px 32px` for easier tapping
- Spacing between targets: Minimum `8px` to prevent accidental touches
- Icon sizes: `24px` for navigation, `48px` for prominent CTAs

### Collapsing Strategy
- **Hero sections:** Full viewport height on desktop, `60vh` on tablet, `50vh` on mobile; text overlays adjust from `80px` to `60px` to `40px` padding
- **Two-column layouts:** Desktop side-by-side; tablet and mobile stack vertically with image above text
- **Card grids:** Desktop 4 columns → Tablet 2 columns → Mobile 1 column
- **Navigation:** Desktop horizontal nav bar; tablet condenses links; mobile collapses to hamburger menu with slide-out drawer
- **Stats blocks:** Desktop 4 columns inline → Tablet 2×2 grid → Mobile single column
- **Padding reduction:** Desktop `24px` → Tablet `20px` → Mobile `16px` for cards and containers
- **Typography scaling:** Headings reduce by `4px–8px` at each breakpoint; body text remains `16px` for readability

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Brand Green (`#299E63`) for buttons, links, active states
- **Secondary CTA:** Forest Green (`#006400`) for hover and emphasis
- **Background:** White (`#FFFFFF`) for cards and main surfaces
- **Border:** Light Gray (`#E2E8F0`) for dividers, form borders, subtle structure
- **Body Text:** Dark Slate (`#1A202C`) for primary content
- **Secondary Text:** Medium Gray (`#464F54`) for support copy and tertiary content
- **Success:** Brand Green (`#299E63`)
- **Hover Background:** `rgba(41, 158, 99, 0.08)` for subtle interactive feedback

### Iteration Guide

1. **Color Consistency:** Apply `#299E63` to all primary CTAs, links, and success states. Use `#1A202C` for body text and `#E2E8F0` for all borders and dividers.

2. **Typography System:** Use Red Hat Display for display/headline text (64px–40px weights 700); Red Hat Text for body (16px weight 500), links (16px weight 400), and buttons (16px weight 700). Never deviate from the defined hierarchy table.

3. **Spacing Discipline:** Base all margins, padding, and gaps on the scale (8px, 12px, 16px, 24px, 32px, 48px, 60px, 64px, 80px, 88px, 108px). Justify any deviation and document it.

4. **Component Sizing:** All buttons are `44px` height with `6px` radius. Cards and containers use `8px` radius. Form inputs are `44px` height with `6px` radius and `12px` padding.

5. **Shadow Protocol:** Use only three shadow levels: subtle (`rgba(18, 44, 77, 0.04) 0px 1px 12px 0px`), elevated (`rgba(18, 44, 77, 0.08) 0px 4px 16px 0px`), floating (`rgba(18, 44, 77, 0.12) 0px 10px 25px 0px`). Never introduce custom shadows.

6. **Container Max-Width:** Center all primary content with `max-width: 1200px` and `margin: 0 auto`. Maintain minimum `24px` padding on left/right at all breakpoints.

7. **Focus & Interactive States:** Every button and link must have a visible focus state (e.g., border `#299E63`, box-shadow with green tint). Hover states transition from `#299E63` to `#1F7A4A`. Ensure WCAG AA contrast compliance (4.5:1).

8. **Responsive Breakpoints:** Apply three breakpoints (320px mobile, 768px tablet, 1200px desktop). Reflow grids: 4 columns mobile → 8 columns tablet → 12 columns desktop. Adjust heading sizes and padding proportionally.

9. **Whitespace & Breathing:** Use `48px–80px` vertical gaps between major sections. Never compress padding below `16px` on mobile or `24px` on desktop for content containers. Embrace empty space as a design feature.

10. **Touch & Accessibility:** Minimum touch target `44px` × `44px`. Test keyboard navigation. Apply focus indicators to all interactive elements. Ensure all text meets WCAG AA readability standards (font size ≥ 16px body, ≤ 7:1 contrast ratio preferred).