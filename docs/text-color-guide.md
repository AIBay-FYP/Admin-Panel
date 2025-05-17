# Text Color Adjustments Guide

Here's how to adjust text colors throughout your Admin UI to ensure better readability with the dark/gradient background:

## 1. Color Variables in globals.css

Your globals.css now includes these text color variables:

```css
/* Text color variables */
--text-primary: rgba(255, 255, 255, 0.95);  /* Nearly white text for primary content */
--text-secondary: rgba(255, 255, 255, 0.7); /* Slightly dimmed for secondary content */
--text-tertiary: rgba(255, 255, 255, 0.5);  /* More dimmed for less important text */
--text-accent: #22d3ee;                     /* Cyan accent for highlights */
```

## 2. Using Tailwind Opacity Classes

When dealing with white text on dark backgrounds:

- For primary content: `text-white` or `text-white/95`
- For secondary content: `text-white/70` or `text-white/80` 
- For tertiary content: `text-white/50` or `text-white/40`
- For disabled content: `text-white/30`

## 3. Component Text Color Updates (Already Applied)

- **MetricCard**: Updated title to `text-white/80` for better readability
- **ToggleSwitch**: Changed to use white text with proper opacity
- **Sidebar2**: Added header with `text-white/80` color

## 4. Components That Still Need Updates

### Table Component

Replace the current table with this version:

```jsx
<table className="w-full bg-white/5 backdrop-blur-md rounded-lg text-sm border border-white/10">
  <thead className="bg-white/10 border-b border-white/10">
    <tr>
      {columns.map((col, index) => (
        <th
          key={index}
          className={`px-4 py-3 text-left text-white/70 font-medium ${
            index === 0 ? "rounded-tl-lg" : index === columns.length - 1 ? "rounded-tr-lg" : ""
          }`}
        >
          {col.header}
        </th>
      ))}
      <th className="px-4 py-3 text-left text-white/70 font-medium">
        Status
      </th>
      {details && (
        <th className="px-4 py-3 text-left text-white/70 font-medium rounded-tr-lg">
          {Document ? "Document" : "More"}
        </th>
      )}
    </tr>
  </thead>

  <tbody>
    {data.map((row, rowIndex) => (
      <tr
        key={rowIndex}
        className={`border-b border-white/5 hover:bg-white/10 transition-colors ${
          rowIndex === data.length - 1 ? "rounded-b-lg" : ""
        }`}
      >
        {/* Table cell content with updated text colors */}
        {/* ... */}
      </tr>
    ))}
  </tbody>
</table>
```

### Form Components

For inputs and form elements:

```jsx
<label className="text-white/80 text-sm font-medium">Label</label>
<input 
  className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-teal-500/50 focus:outline-none"
  placeholder="Placeholder"
/>
```

### Headings

Update your heading styles:

```jsx
<h1 className="text-white text-3xl font-bold">Primary Heading</h1>
<h2 className="text-white/90 text-2xl font-semibold">Secondary Heading</h2>
<h3 className="text-white/80 text-xl font-medium">Tertiary Heading</h3>
```

### Button Text

For button text:

```jsx
<button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded">
  Primary Button
</button>
<button className="border border-white/20 hover:bg-white/10 text-white/80 font-medium py-2 px-4 rounded">
  Secondary Button
</button>
```

## 5. General Text Guidelines

- Use higher opacity text (`text-white/90` or `text-white`) for important information
- Use medium opacity text (`text-white/70` or `text-white/80`) for descriptions
- Use lower opacity text (`text-white/50`) for supplementary information
- Use even lower opacity (`text-white/30`) for disabled or inactive elements
- Use accent colors (`text-cyan-400` or `text-teal-300`) sparingly for emphasis

Follow these guidelines as you continue updating your UI to ensure consistent and readable text throughout your application.
