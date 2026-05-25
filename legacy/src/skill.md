---
name: design-system-fpt-telecom
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# FPT Telecom

## Mission
Deliver implementation-ready design-system guidance for FPT Telecom that can be applied consistently across e-commerce storefront interfaces.

## Brand
- Product/brand: FPT Telecom
- URL: https://fpt.vn/vi
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=SF Pro Display`, `font.family.stack=SF Pro Display, -apple-system, system-ui, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=18.4px`
- Typography scale: `font.size.xs=14px`, `font.size.sm=16px`, `font.size.md=18px`, `font.size.lg=20px`, `font.size.xl=24px`, `font.size.2xl=28px`, `font.size.3xl=32px`
- Color palette: `color.text.primary=#3d3d3d`, `color.surface.base=#000000`, `color.text.tertiary=#ffffff`, `color.surface.muted=#4564ed`, `color.surface.raised=#f3f3f3`
- Spacing scale: `space.1=1px`, `space.2=4px`, `space.3=6px`, `space.4=10px`, `space.5=12px`, `space.6=13px`, `space.7=14px`, `space.8=16px`
- Radius/shadow/motion tokens: `radius.xs=4px`, `radius.sm=8px`, `radius.md=12px`, `radius.lg=50px`, `radius.xl=999px` | `shadow.1=rgba(0, 0, 0, 0.08) 0px 4px 4px -8px, rgba(16, 24, 40, 0.02) 0px 4px 16px 10px, rgba(16, 24, 40, 0.03) 0px 2px 32px -4px`, `shadow.2=rgba(0, 0, 0, 0.03) 0px 4px 4px -8px, rgba(16, 24, 40, 0.02) 0px 4px 16px 10px, rgba(16, 24, 40, 0.04) 0px 2px 32px -4px` | `motion.duration.instant=300ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
