# CV Template Builder

A modern, interactive CV/Resume builder application built with React, TypeScript, and Tailwind CSS. Create, edit, and export professional CVs with multiple template options.

## Features

### 🖼️ Template Gallery
- Visual template showcase with live previews
- Side-by-side comparison of all available templates
- Interactive selection with detailed descriptions
- Smooth transition from gallery to editor

### 🎨 Multiple Templates (11 Unique Designs)
- **Professional Timeline**: Features a timeline-based work experience section with elegant accent colors
- **Modern Header**: Clean design with a colored header section and traditional layout
- **Minimalist Two-Column**: Clean two-column layout with left-aligned dates and section labels for easy scanning
- **Decorative Pattern**: Unique geometric SVG pattern header with colored accent bars on each section
- **Centered Classic**: Centered layout with bordered header, highlighted summary box, and pill-shaped skill badges
- **Accent Tabs**: Stylish colored tab-style section headers with circular icon backgrounds for contact information
- **Full Header**: Bold full-width colored header with integrated summary and contact grid, underlined section titles
- **Light Contact**: Minimalist design with subtle light background on contact section and 3-column skills grid
- **Bookmark Ribbon**: Elegant design with decorative SVG bookmark ribbon and clean bordered sections
- **Sidebar Labels**: Sophisticated two-column layout with section labels on left and content on right with border separators
- **Gray Background**: Modern light gray background with vertical dividers between titles/companies and comma-separated skills

### ✏️ Full Editing Capabilities
- Edit personal information (name, email, phone, location, LinkedIn)
- Add/edit/remove work experience entries
- Add/edit/remove education entries
- Manage skills (comma-separated list)
- Real-time preview of changes

### 📥 Export Options
- **PDF Export**: High-quality multi-page PDF generation with A4 standard dimensions
- **DOCX Export**: Microsoft Word-compatible documents using docx library
- **Page Break Preview**: Visual indicators show exactly where pages will break
- **WYSIWYG**: What You See Is What You Get - preview matches exported PDF exactly

### 🎯 Modern UI/UX
- Responsive design with Tailwind CSS
- Toggle editor visibility for focused preview
- Template selection with visual indicators
- Clean, professional interface

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **html2canvas** - HTML to canvas conversion for PDF
- **jsPDF** - PDF generation
- **docx** - DOCX file generation
- **file-saver** - File download functionality
- **classnames** - Conditional class management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cv-templates
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Browsing Templates
1. When you first open the app, you'll see the **Template Gallery**
2. Browse through visual previews of all available templates
3. Click on any template card to select it
4. Click "Start Editing Your CV" or "Edit This Template" to begin

### Selecting a Template
1. In the gallery view, compare templates side-by-side
2. Each template shows a live preview with your data
3. Click on a template card to select it (marked with a blue ring)
4. You can switch templates anytime from the editor view

### Editing Your CV
1. Fill in your personal information
2. Add work experience entries with responsibilities
3. Add education details
4. List your skills (comma-separated)
5. Watch the preview update in real-time

### Exporting Your CV
1. Review your CV in the preview - you'll see page break lines showing where pages split
2. Click "Export PDF" to download as a multi-page PDF (A4 format, 210mm × 297mm)
3. Click "Export DOCX" to download as Word document
4. Files are named automatically based on your name
5. PDF export automatically creates multiple pages if content is longer than one page

### Navigation
- Click "Back to Templates" to return to the gallery view
- Click "Hide Editor" to see a full-width preview
- Click "Show Editor" to return to edit mode

## Project Structure

```
src/
├── components/
│   ├── CVTemplate.tsx        # Template 1: Professional Timeline
│   ├── CVTemplate2.tsx       # Template 2: Modern Header
│   ├── CVEditor.tsx          # CV editing interface
│   ├── TemplateSelector.tsx  # Compact template selector (used in editor)
│   └── TemplateGallery.tsx   # Full-page gallery view with previews
├── data/
│   ├── defaultCV.ts          # Default CV data
│   └── templates.ts          # Template definitions
├── types/
│   └── cv.types.ts           # TypeScript type definitions
├── utils/
│   ├── exportPDF.ts          # PDF export functionality
│   └── exportDOCX.ts         # DOCX export functionality
├── App.tsx                   # Main application component with routing
├── index.css                 # Global styles and Tailwind imports
└── main.tsx                  # Application entry point
```

## Customization

### Adding New Templates
1. Create a new component in `src/components/CVTemplateX.tsx`
2. Add template definition to `src/data/templates.ts`
3. Update the switch statement in `App.tsx` to render the new template

### Changing Accent Colors
Edit the `accentColor` property in `src/data/templates.ts` for each template.

### Modifying Default Data
Edit `src/data/defaultCV.ts` to change the default CV content.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ support required

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Author

Ahmad Faraz

## Acknowledgments

- Font: Arimo from Google Fonts
- Icons: Emoji fallbacks (can be replaced with icon libraries)
