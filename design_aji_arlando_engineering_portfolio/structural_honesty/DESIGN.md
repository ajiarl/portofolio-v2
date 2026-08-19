---
name: Structural Honesty
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5a632e'
  on-secondary: '#ffffff'
  secondary-container: '#dce5a3'
  on-secondary-container: '#5f6732'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c18'
  on-tertiary-container: '#84847f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#dfe8a6'
  secondary-fixed-dim: '#c3cc8c'
  on-secondary-fixed: '#191e00'
  on-secondary-fixed-variant: '#434b18'
  tertiary-fixed: '#e4e3dd'
  tertiary-fixed-dim: '#c7c7c1'
  on-tertiary-fixed: '#1b1c18'
  on-tertiary-fixed-variant: '#464743'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  metadata:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: '1'
spacing:
  unit: 4px
  gutter: 1px
  margin-page: 40px
  grid-column: repeat(12, 1fr)
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
This design system is built on the principles of **Structural Honesty** and the **Engineering Notebook** aesthetic. It reflects the meticulous nature of a fullstack developer through precise alignment, systematic information density, and a calm, functional confidence. 

The visual direction avoids superficial decoration in favor of "blueprint" aesthetics. It utilizes visible structural markers, metadata-rich headers, and a strictly utilitarian approach to layout. The emotional response should be one of total clarity, reliability, and technical mastery—reminiscent of a well-maintained physical engineering log or a high-end technical manual.

## Colors
The palette is grounded in the "Laboratory Bone" background to provide a softer, more organic reading surface than pure white, reducing eye strain during deep technical reviews.

- **Primary (Deep Ink):** Used for all primary content, heavy headings, and structural borders. It provides maximum contrast against the bone surface.
- **Accent (Circuit Board Olive):** A deliberate, low-vibrancy green used strictly for functional status, active states, or highlighting critical technical successes (e.g., "Build: Success").
- **Neutral (Soft Grey):** Specifically reserved for grid lines, hair-thin borders, and secondary metadata to maintain hierarchy without cluttering the visual field.

## Typography
The typography strategy creates a tension between the expressive, characterful headings and the rigid, technical body text.

- **Headings:** Use **Bricolage Grotesque** for names and major section headers. Its quirky, geometric nature adds a human, creative signature to the developer's identity.
- **Body & Technical Data:** Use **JetBrains Mono** for all interface elements, descriptions, and code. This reinforces the "Engineering Notebook" feel.
- **Metadata:** Smaller mono-spaced type should be used for technical annotations (e.g., timestamps, version numbers) to provide high information density without distracting from the primary narrative.

## Layout & Spacing
The layout follows a strict **12-column fixed grid** on desktop, transitioning to a **4-column fluid grid** on mobile. 

- **Visible Infrastructure:** 1px hairline borders in `#E5E4DE` should be used to visualize the grid columns or to wrap major content sections. 
- **Alignment:** Every element must snap to the grid. Use hard edges and avoid asymmetrical margins.
- **Metadata Headers:** Every page or major section should start with a "blueprint" header—a horizontal bar containing the section title on the left and technical metadata (Build Date, Commit Hash, Status) on the right, separated by thin vertical lines.

## Elevation & Depth
This design system rejects shadows and blurs. Depth is communicated solely through **Tonal Layering** and **Line Weight**.

- **Z-Index Strategy:** Higher elevation is represented by a slight shift in background color from `#F5F4EF` to white, or by increasing the border-weight of a container from 1px to 2px.
- **Flat Depth:** UI elements exist on a single 2D plane. Use `#E5E4DE` lines to define the "rooms" of the interface. 
- **Strictly No Shadows:** Do not use box-shadows or drop-shadows. Hierarchy is achieved through typography size and the containment of elements within defined boxes.

## Shapes
Shapes are strictly **sharp (0px)**. The design system uses rectangles and squares to maintain the engineering schematic aesthetic. 

Rounded corners, pills, and circles are prohibited, except for literal circular indicators like status pips or person avatars (which should still preferably be square if the brand allows). This rigidity emphasizes the "Structural Honesty" of the grid.

## Components

### Buttons
Buttons are rectangular with 1px `Deep Ink` borders. The default state is a transparent background; the hover state is a solid `Deep Ink` fill with `Laboratory Bone` text. No transitions or easing—interactions should be instant and digital.

### Chips / Tags
Small, 1px bordered boxes using `JetBrains Mono` at the `metadata` size. Use the `Circuit Board Olive` color for the border and text when the tag indicates a specific technology or category.

### Input Fields
Simple underlines or 4-sided boxes with 1px `Soft Grey` borders. Labels are always positioned above the input in `label-caps` style. The focus state changes the border to `Deep Ink`.

### Technical Cards
Content is wrapped in a 1px `Soft Grey` border. The "Header" of the card is a separate sub-box with a `Soft Grey` background, containing the card title and a "Ref No." or timestamp.

### Lists
Lists are separated by 1px horizontal hairlines. Each list item should be numbered (e.g., 01, 02, 03) to emphasize the sequential, logbook nature of the data.

### Progress Indicators
Use a simple stepped bar or a percentage readout in `JetBrains Mono`. Avoid smooth animations; increments should feel discrete.