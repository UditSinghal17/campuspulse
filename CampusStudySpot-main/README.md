# CampusPulse — Find Your Perfect Study Spot 🎓📍

CampusPulse is a smart campus study-space discovery platform that empowers students to find the ideal environment to focus, collaborate, attend online meetings, or relax based on their current mood, real-time crowd levels, and facility preferences.

Built with **React.js**, **Vite**, **Tailwind CSS**, **Lucide Icons**, and **Recharts**.

---

## ✨ Key Features

1. **Study Mood Matcher (Interactive Recommendation Engine)**:
   - **Deep Focus**: Pinpoint silent carrels, low-decibel libraries, and acoustic sanctuaries.
   - **Group Discussion**: Spot brainstorm hubs with whiteboards and collaborative booths.
   - **Online Meeting**: Discover high-bandwidth Wi-Fi 6 pods with quiet acoustics.
   - **Casual Reading**: Filter natural light spots and covered garden reading corners.
   - Interactive banner displaying matched campus facilities with one-click filtering.

2. **Real-Time Study Space Discovery Cards**:
   - 8 realistic campus locations across academic blocks, tech labs, libraries, and student centers.
   - Live crowd level badges (`Low`, `Moderate`, `High`) with pulse indicators.
   - Live occupancy meter & free seat count.
   - Noise policy tags, Wi-Fi speed ratings, charging port availability, and AC status.
   - Bookmark/favorite toggle button and detailed modal trigger.

3. **Multi-Factor Filtering & Instant Search**:
   - Live search across space name, building, and category.
   - Filter by crowd density (`All`, `Low`, `Moderate`, `High`).
   - Filter by noise policy (`Silent`, `Quiet`, `Moderate`, `Collaborative`).
   - Feature toggles for Wi-Fi, Power Charging, and Air Conditioning.
   - Sorting options: Highest Rated, Lowest Crowd Level, and Most Available Seats.
   - One-click "Clear Filters" with animated empty-state feedback.

4. **Study Space Details Modal**:
   - Comprehensive facility inspection popup.
   - High-resolution imagery, building & floor breakdown, hours, and full description.
   - Quick "Add to Favorites" and "Find Similar Spaces" actions.
   - Accessible with Escape key, close button, and backdrop tap.

5. **Illustrated Interactive Campus Map**:
   - Custom SVG-rendered university layout featuring paved boulevards, walking avenues, and greens.
   - Clickable interactive pins with live capacity metrics across Central Library, CS Dept, Academic Block, Innovation Hub, Student Center, and Botanical Garden.
   - Building detail panel with direct room exploration actions.

6. **Campus Analytics & "Best Time to Study"**:
   - Hourly occupancy rate visualization powered by Recharts.
   - Proportion breakdown of crowd distributions.
   - Campus popularity leaderboard based on student reviews.
   - Highlight card showing the golden productivity study window: **8:00 AM – 10:00 AM (< 28% occupancy)**.

7. **Local Favorites with Persistence**:
   - Saves bookmarked study spaces in browser `localStorage`.
   - Dedicated "My Favorites" view with empty-state guidance.

8. **Fully Responsive & Polished UX**:
   - Linear & Notion-inspired SaaS aesthetic with soft slate backgrounds, indigo accents, and subtle elevations.
   - Desktop fixed sidebar and fluid mobile slide-out navigation.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Create production build
npm run build
```

