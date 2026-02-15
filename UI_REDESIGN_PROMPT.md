# Enterprise-Level UI Redesign Prompt for Dionysus (Atlas)

## Project Overview
Dionysus (also branded as Atlas) is a codebase intelligence platform that helps developers navigate and understand their GitHub repositories using AI. The application is built with Next.js, TypeScript, tRPC, Prisma, and uses Clerk for authentication.

## Current State Analysis

### Existing Structure
- **Tech Stack**: Next.js 14+, React, TypeScript, Tailwind CSS, shadcn/ui components
- **Authentication**: Clerk
- **Main Pages**:
  - `/dashboard` - Project overview with GitHub repo info, Q&A cards, meeting upload, and commit history
  - `/qa` - Question & Answer interface for codebase queries
  - `/meetings` - Meeting transcription and analysis
  - `/billing` - Stripe integration for credits
  - `/create` - Project creation and GitHub repository linking

### Current Layout Issues
1. **Cluttered Dashboard**: Everything is crammed into a single page - project details, Q&A card, meeting upload, and commit history all overlap
2. **Poor Information Hierarchy**: No clear visual separation between primary and secondary actions
3. **Navigation Confusion**: Sidebar navigation with collapsible projects list, but no clear project overview/landing page
4. **Inconsistent Spacing**: Components feel cramped with insufficient breathing room
5. **Dark Theme Only**: Current design uses zinc-950/zinc-900 dark theme exclusively

## Design Goals

### 1. Enterprise-Level Professional Appearance
- Clean, spacious layouts with generous whitespace
- Consistent design system following enterprise UI patterns
- Professional typography hierarchy
- Subtle, purposeful animations
- Accessible color contrast ratios (WCAG AA minimum)

### 2. Simplified Navigation & Information Architecture
- **Clear Project Landing Page**: After login, show a dedicated project overview/selection screen
- **Logical Page Hierarchy**: Separate concerns - don't mix project details with Q&A and meetings
- **Breadcrumb Navigation**: Help users understand where they are in the application
- **Persistent Context**: Always show which project is currently active

### 3. Improved User Experience
- **Progressive Disclosure**: Show only what's needed, hide complexity
- **Clear Call-to-Actions**: Primary actions should be obvious and accessible
- **Loading States**: Elegant skeleton loaders and progress indicators
- **Empty States**: Helpful guidance when no data exists
- **Responsive Design**: Mobile-first approach that scales beautifully

## Detailed Redesign Requirements

### A. Post-Login Landing Page (New)
**Route**: `/dashboard` or `/projects`

**Purpose**: Give users a clear, impactful landing experience with huge branding, clear value proposition, and easy access to all projects

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]                              [Search] [Notifications] [User] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                                                             │
│                          ATLAS                              │
│                                                             │
│              Navigate your codebase with intelligence       │
│                                                             │
│                                                             │
│  Link Your Project                                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [GitHub Icon] Connect a GitHub Repository          │   │
│  │                                          [Connect →] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│                                                             │
│  Your Projects                                              │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Project 1   │  │  Project 2   │  │  + Create    │     │
│  │  [Icon]      │  │  [Icon]      │  │    New       │     │
│  │              │  │              │  │  Project     │     │
│  │  12 commits  │  │  8 commits   │  │              │     │
│  │  3 questions │  │  5 questions │  │              │     │
│  │  Last: 2h ago│  │  Last: 1d ago│  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  Recent Activity                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Avatar] John committed to Project 1 - 2 hours ago  │   │
│  │ [Avatar] You asked a question in Project 2 - 1 day  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Key Features**:
- **Hero Section** with huge "ATLAS" branding (text-6xl to text-8xl, 60-96px)
- **Tagline** below: "Navigate your codebase with intelligence" (text-xl, subtle color)
- **Prominent "Link Your Project" CTA** - Large card with GitHub icon and connect button
- **"Your Projects" Section** - Only shows if user has projects
- Large, card-based project grid (3-4 columns on desktop)
- Each project card shows:
  - Project name and icon/avatar
  - GitHub repository link (subtle, not prominent)
  - Quick stats (commits, questions, meetings)
  - Last activity timestamp
  - Quick actions (View, Settings)
- "Create New Project" card prominently displayed
- Recent activity feed showing cross-project updates
- Global search bar in header
- No sidebar on this page - full-width layout
- Generous vertical spacing (80-120px) in hero section

### B. Individual Project Dashboard (Redesigned)
**Route**: `/project/[projectId]` or `/dashboard` (when project is selected)

**Purpose**: Dedicated space for a single project with clear sections

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│ [☰] Dionysus > [Project Name]      [Search] [Notifications] [User] │
├─────────────────────────────────────────────────────────────┤
│ Sidebar │                                                    │
│         │  Project: [Project Name]                          │
│ Overview│  [GitHub Icon] github.com/user/repo [External]    │
│ Q&A     │                                                    │
│ Meetings│  ┌─────────────────┐  ┌─────────────────┐        │
│ Commits │  │   Quick Stats   │  │   Team Members  │        │
│ Files   │  │  • 156 Commits  │  │  [Avatar] [Avatar]      │
│ Settings│  │  • 23 Questions │  │  [Avatar] [+Invite]     │
│         │  │  • 5 Meetings   │  │                 │        │
│         │  └─────────────────┘  └─────────────────┘        │
│         │                                                    │
│         │  Quick Actions                                     │
│         │  ┌──────────────────────────────────────────┐    │
│         │  │  [Icon] Ask a Question                   │    │
│         │  │  Get AI-powered insights about your code │    │
│         │  └──────────────────────────────────────────┘    │
│         │  ┌──────────────────────────────────────────┐    │
│         │  │  [Icon] Upload Meeting                   │    │
│         │  │  Analyze meeting transcripts with AI     │    │
│         │  └──────────────────────────────────────────┘    │
│         │                                                    │
└─────────────────────────────────────────────────────────────┘
```

**Key Changes**:
- **Sidebar Navigation**: Persistent left sidebar with project-specific sections
- **Clean Header**: Project name, breadcrumb, and global utilities
- **Overview Tab**: Landing page for the project with stats and quick actions
- **Separated Sections**: Each feature (Q&A, Meetings, Commits) gets its own dedicated page
- **Generous Spacing**: 24-32px padding, clear visual separation
- **Card-based Layout**: Use elevation and borders to create depth

### C. Commit History Page (Dedicated)
**Route**: `/project/[projectId]/commits`

**Purpose**: Clean, focused view of repository commit history

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│ [☰] Dionysus > [Project] > Commits                         │
├─────────────────────────────────────────────────────────────┤
│ Sidebar │                                                    │
│         │  Commit History                                    │
│         │  [Filter: All] [Search commits...]                │
│         │                                                    │
│         │  ┌────────────────────────────────────────────┐  │
│         │  │ [Avatar] John Doe                          │  │
│         │  │ Fix authentication bug                     │  │
│         │  │ 2 hours ago • abc1234                      │  │
│         │  │                                            │  │
│         │  │ Updated the login flow to handle edge...  │  │
│         │  │ [View Details]                             │  │
│         │  └────────────────────────────────────────────┘  │
│         │                                                    │
│         │  ┌────────────────────────────────────────────┐  │
│         │  │ [Avatar] Jane Smith                        │  │
│         │  │ Add new dashboard component                │  │
│         │  │ 1 day ago • def5678                        │  │
│         │  └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Key Features**:
- Each commit in its own card with clear spacing
- Avatar, author name, commit message prominently displayed
- Timestamp and commit hash as secondary information
- AI-generated summary in expandable section
- Link to GitHub (external icon)
- Filter and search capabilities
- Infinite scroll or pagination

### D. Q&A Page (Improved)
**Route**: `/project/[projectId]/qa`

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│ [☰] Dionysus > [Project] > Q&A                             │
├─────────────────────────────────────────────────────────────┤
│ Sidebar │                                                    │
│         │  ┌────────────────────────────────────────────┐  │
│         │  │  Ask a Question                            │  │
│         │  │  ┌──────────────────────────────────────┐  │  │
│         │  │  │ Which file handles authentication?   │  │  │
│         │  │  │                                      │  │  │
│         │  │  └──────────────────────────────────────┘  │  │
│         │  │  [Ask Dionysus]                            │  │
│         │  └────────────────────────────────────────────┘  │
│         │                                                    │
│         │  Previous Questions                                │
│         │  ┌────────────────────────────────────────────┐  │
│         │  │ How does the payment flow work?            │  │
│         │  │ Asked 2 hours ago                          │  │
│         │  │ [View Answer]                              │  │
│         │  └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Key Features**:
- Prominent question input at the top
- List of previous questions with timestamps
- Click to expand and see full answer
- Code references shown inline with syntax highlighting
- Ability to copy code snippets
- Share question/answer functionality

### E. Meetings Page (Improved)
**Route**: `/project/[projectId]/meetings`

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│ [☰] Dionysus > [Project] > Meetings                        │
├─────────────────────────────────────────────────────────────┤
│ Sidebar │                                                    │
│         │  ┌────────────────────────────────────────────┐  │
│         │  │  [Upload Icon]                             │  │
│         │  │  Upload New Meeting                        │  │
│         │  │  Drag & drop or click to upload            │  │
│         │  │  [Upload Button]                           │  │
│         │  └────────────────────────────────────────────┘  │
│         │                                                    │
│         │  Your Meetings                                     │
│         │  ┌────────────────────────────────────────────┐  │
│         │  │ [Icon] Sprint Planning Meeting             │  │
│         │  │ Uploaded 2 days ago • 45 min               │  │
│         │  │ [Processing...] or [View Summary]          │  │
│         │  └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Design System Specifications

### Color Palette
**Primary Dark Theme** (Current):
- Background: `zinc-950` (#09090b)
- Surface: `zinc-900` (#18181b)
- Border: `zinc-800` (#27272a)
- Text Primary: `zinc-100` (#f4f4f5)
- Text Secondary: `zinc-400` (#a1a1aa)
- Accent: `white` (#ffffff)

**Recommended Additions**:
- Success: `emerald-500` (#10b981)
- Warning: `amber-500` (#f59e0b)
- Error: `red-500` (#ef4444)
- Info: `blue-500` (#3b82f6)
- Primary Brand: Consider a signature color (e.g., purple-500 or indigo-500)

### Typography
- **Headings**: Use `font-bold` with `tracking-tight` or `tracking-tighter`
- **Body**: `font-normal` with `leading-relaxed`
- **Labels**: `text-xs` or `text-sm` with `uppercase` and `tracking-[0.08em]`
- **Code**: `font-mono` for technical content

**Scale**:
- H1: `text-4xl` or `text-5xl` (36-48px)
- H2: `text-3xl` (30px)
- H3: `text-2xl` (24px)
- H4: `text-xl` (20px)
- Body: `text-base` (16px)
- Small: `text-sm` (14px)
- Tiny: `text-xs` (12px)

### Spacing
- **Section Padding**: `p-6` to `p-8` (24-32px)
- **Card Padding**: `p-4` to `p-6` (16-24px)
- **Element Gaps**: `gap-4` to `gap-6` (16-24px)
- **Vertical Spacing**: `space-y-6` to `space-y-8` (24-32px)

### Components

#### Cards
```tsx
className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow-sm hover:border-zinc-700 transition-colors"
```

#### Buttons
- **Primary**: White background, black text, border
- **Secondary**: Transparent background, white text, border
- **Ghost**: No border, subtle hover state

#### Input Fields
```tsx
className="h-12 rounded-md border border-zinc-800 bg-zinc-900 px-4 text-zinc-100 placeholder:text-zinc-500 focus:border-white focus:ring-1 focus:ring-white"
```

### Layout Patterns

#### Sidebar Navigation
- Width: `w-64` (256px) when open, `w-16` (64px) when collapsed
- Fixed position on desktop
- Drawer/overlay on mobile
- Smooth transitions: `transition-all duration-200`

#### Content Area
- Max width: `max-w-7xl` (1280px) for main content
- Centered: `mx-auto`
- Padding: `px-6` to `px-8`

#### Grid Layouts
- Project cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Stats: `grid grid-cols-2 md:grid-cols-4 gap-4`

## Implementation Priorities

### Phase 1: Core Structure (High Priority)
1. ✅ Create new project landing/overview page
2. ✅ Implement persistent sidebar navigation
3. ✅ Separate dashboard into distinct pages (Overview, Q&A, Meetings, Commits)
4. ✅ Add breadcrumb navigation
5. ✅ Improve spacing and layout consistency

### Phase 2: Component Refinement (Medium Priority)
1. ✅ Redesign project cards with better visual hierarchy
2. ✅ Improve commit history display (dedicated cards, better spacing)
3. ✅ Enhance Q&A interface (separate input from history)
4. ✅ Better loading states and skeleton loaders
5. ✅ Add empty states with helpful CTAs

### Phase 3: Polish & Enhancement (Lower Priority)
1. ⚪ Add subtle animations and transitions
2. ⚪ Implement advanced filtering and search
3. ⚪ Add keyboard shortcuts
4. ⚪ Improve mobile responsiveness
5. ⚪ Add dark/light theme toggle (optional)

## Key Principles to Follow

### 1. **Clarity Over Cleverness**
- Use clear, descriptive labels
- Avoid jargon where possible
- Make actions obvious

### 2. **Consistency**
- Use the same patterns throughout
- Maintain consistent spacing
- Reuse components

### 3. **Feedback**
- Show loading states
- Confirm actions
- Display errors clearly

### 4. **Accessibility**
- Proper heading hierarchy
- Keyboard navigation
- ARIA labels where needed
- Sufficient color contrast

### 5. **Performance**
- Lazy load heavy components
- Optimize images
- Use skeleton loaders
- Implement pagination for long lists

## Specific File Changes Needed

### New Files to Create
1. `/app/(protected)/projects/page.tsx` - Project overview/landing page
2. `/app/(protected)/project/[projectId]/layout.tsx` - Project-specific layout with sidebar
3. `/app/(protected)/project/[projectId]/page.tsx` - Project overview tab
4. `/app/(protected)/project/[projectId]/commits/page.tsx` - Dedicated commits page
5. `/app/(protected)/project/[projectId]/qa/page.tsx` - Move Q&A here
6. `/app/(protected)/project/[projectId]/meetings/page.tsx` - Move meetings here
7. `/components/project-card.tsx` - Reusable project card component
8. `/components/commit-card.tsx` - Improved commit display component
9. `/components/breadcrumb.tsx` - Breadcrumb navigation component

### Files to Modify
1. `/app/(protected)/layout.tsx` - Remove sidebar from global layout
2. `/app/(protected)/dashboard/page.tsx` - Repurpose or redirect
3. `/app/(protected)/app-sidebar.tsx` - Adapt for project-specific navigation
4. `/hooks/use-project.tsx` - Update routing logic

### Files to Remove/Archive
- Consider consolidating redundant components
- Archive old dashboard components after migration

## Success Metrics

After implementation, the redesigned UI should achieve:

1. **Reduced Cognitive Load**: Users can find what they need in ≤3 clicks
2. **Clear Visual Hierarchy**: Primary actions are immediately obvious
3. **Improved Scannability**: Information is organized in digestible chunks
4. **Professional Appearance**: Looks like an enterprise-grade product
5. **Better Performance**: Faster perceived load times with proper loading states

## Example User Flows

### Flow 1: New User Creates First Project
1. Login → Lands on empty projects page with prominent "Create Project" CTA
2. Click "Create Project" → Clean form with clear instructions
3. Submit → Loading state → Success → Redirected to project overview
4. See welcome message and quick action cards

### Flow 2: Existing User Checks Commit History
1. Login → See all projects
2. Click on project card → Project overview page
3. Click "Commits" in sidebar → Dedicated commits page
4. Scroll through clean, card-based commit list
5. Click commit → See AI summary and link to GitHub

### Flow 3: User Asks Question About Code
1. From project overview → Click "Ask a Question" quick action OR click "Q&A" in sidebar
2. Land on Q&A page with prominent input field
3. Type question → Click "Ask Dionysus"
4. See loading state → Answer streams in
5. View code references inline
6. Question saved to history below

---

## Final Notes

This redesign focuses on **enterprise-level simplicity and clarity**. The goal is to make Dionysus feel like a professional tool that developers trust and enjoy using. Every element should have a clear purpose, and the interface should guide users naturally through their tasks without overwhelming them.

The dark theme should feel modern and sophisticated, not gloomy. Use subtle shadows, borders, and spacing to create depth and visual interest without relying on bright colors.

Remember: **Less is more**. Remove clutter, add breathing room, and let the content shine.

