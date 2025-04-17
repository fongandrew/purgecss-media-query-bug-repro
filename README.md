# PurgeCSS Media Query Test

This is an issue repro to see how PurgeCSS handles CSS variables (custom properties) in media queries nested within selectors (which should be valid in any browser that supports native CSS selector nesting -- i.e. most browsers as of 2025).

To test, run `npm install`, followed by `npm run purge`. This will process [`input.css`](./input.css) and write [`output.css`](./output.css).

The expected result is that variables nested under a `@media` query count as usage and are not purged. The actual result is that they are treated as unused and purged.

As a partial workaround, `&` can be added to the safelist, and nested media queries can be implemented like this:

```css
.text {
  font-size: 1rem;

  @media (max-width: 768px) {
    & {
      font-size: var(--mobile-text-size);
    }
  }
}
```

However, this results in the variable *always* counting as used and never being purged, even if the class it is tied to is itself purged.
