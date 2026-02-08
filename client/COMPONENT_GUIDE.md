# Component Usage Guide

## UI Components

### Button

Professional button component with multiple variants and sizes.

```jsx
import Button from './components/ui/Button';

// Primary button
<Button variant="primary" size="md" onClick={handleClick}>
  Save Changes
</Button>

// Secondary button
<Button variant="secondary">
  Cancel
</Button>

// Danger button
<Button variant="danger">
  Delete
</Button>

// Ghost button
<Button variant="ghost">
  Learn More
</Button>

// With icon
<Button className="inline-flex items-center space-x-2">
  <Plus size={18} />
  <span>Add Item</span>
</Button>

// Disabled state
<Button disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `onClick`: function
- `type`: 'button' | 'submit' | 'reset'
- `className`: string (additional classes)

---

### Card

Container component for content sections.

```jsx
import Card from './components/ui/Card';

// Basic card
<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

// Card with hover effect
<Card hover className="p-6">
  <p>Hover over me</p>
</Card>
```

**Props:**
- `children`: ReactNode
- `className`: string
- `hover`: boolean (adds hover shadow effect)

---

### Badge

Status indicator component.

```jsx
import Badge from './components/ui/Badge';

// Default badge
<Badge>Default</Badge>

// Success badge (green)
<Badge variant="success">Beginner</Badge>

// Warning badge (amber)
<Badge variant="warning">Intermediate</Badge>

// Info badge (blue)
<Badge variant="info">Advanced</Badge>
```

**Props:**
- `children`: ReactNode
- `variant`: 'default' | 'success' | 'warning' | 'info'

---

### IconButton

Icon-only button for actions.

```jsx
import IconButton from './components/ui/IconButton';
import { Edit2, Trash2 } from 'lucide-react';

// Ghost variant (default)
<IconButton
  icon={Edit2}
  onClick={handleEdit}
  label="Edit item"
/>

// Primary variant
<IconButton
  icon={Trash2}
  onClick={handleDelete}
  label="Delete item"
  variant="primary"
/>

// Different sizes
<IconButton icon={Edit2} size="sm" label="Edit" />
<IconButton icon={Edit2} size="md" label="Edit" />
<IconButton icon={Edit2} size="lg" label="Edit" />
```

**Props:**
- `icon`: Lucide icon component
- `onClick`: function
- `label`: string (for accessibility)
- `variant`: 'ghost' | 'primary'
- `size`: 'sm' | 'md' | 'lg'

---

### Skeleton

Loading placeholder component.

```jsx
import Skeleton from './components/ui/Skeleton';

// Default skeleton (line)
<Skeleton />

// Custom width
<Skeleton className="h-4 w-48" />

// Circle skeleton
<Skeleton variant="circle" />

// Card skeleton
<Skeleton variant="card" />

// Multiple skeletons
<div className="space-y-3">
  <Skeleton className="h-8 w-64" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>
```

**Props:**
- `className`: string
- `variant`: 'default' | 'circle' | 'card'

---

## Feature Components

### EmptyState

Display when no data is available.

```jsx
import EmptyState from './components/EmptyState';
import { Target } from 'lucide-react';
import Button from './components/ui/Button';

<EmptyState
  icon={Target}
  title="No hobbies yet"
  description="Start tracking your hobbies and build consistent practice habits"
  action={
    <Button onClick={handleAdd}>
      Add Your First Hobby
    </Button>
  }
/>
```

**Props:**
- `icon`: Lucide icon component
- `title`: string
- `description`: string
- `action`: ReactNode (optional)

---

### LoadingSpinner

Full-page or section loading indicator.

```jsx
import LoadingSpinner from './components/LoadingSpinner';

// Default size
<LoadingSpinner />

// With text
<LoadingSpinner text="Loading your data..." />

// Different sizes
<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `text`: string (optional)

---

## Layout Components

### Layout

Main application layout with navigation.

```jsx
import Layout from './components/Layout';

const MyPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Your page content */}
      </div>
    </Layout>
  );
};
```

**Features:**
- Top navigation bar
- Mobile bottom navigation
- User menu
- Search functionality
- Responsive design

---

### ProtectedRoute

Wrapper for authenticated routes.

```jsx
import ProtectedRoute from './components/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

**Features:**
- Checks authentication
- Shows loading state
- Redirects to login if not authenticated

---

## Modal Components

### HobbyModal

Modal for creating/editing hobbies.

```jsx
import HobbyModal from './components/HobbyModal';

const [showModal, setShowModal] = useState(false);
const [editingHobby, setEditingHobby] = useState(null);

const handleClose = (refresh) => {
  setShowModal(false);
  if (refresh) {
    // Refresh data
  }
};

// Create new hobby
<HobbyModal
  hobby={null}
  onClose={handleClose}
/>

// Edit existing hobby
<HobbyModal
  hobby={editingHobby}
  onClose={handleClose}
/>
```

**Props:**
- `hobby`: object | null (null for create, object for edit)
- `onClose`: function(refresh: boolean)

---

### SessionModal

Modal for adding practice sessions.

```jsx
import SessionModal from './components/SessionModal';

const [showModal, setShowModal] = useState(false);

const handleClose = (refresh) => {
  setShowModal(false);
  if (refresh) {
    // Refresh sessions
  }
};

<SessionModal
  hobbyId={selectedHobbyId}
  onClose={handleClose}
/>
```

**Props:**
- `hobbyId`: string (required)
- `onClose`: function(refresh: boolean)

---

### UserSearchModal

Modal for searching users.

```jsx
import UserSearchModal from './components/UserSearchModal';

const [showSearch, setShowSearch] = useState(false);

<UserSearchModal
  onClose={() => setShowSearch(false)}
/>
```

**Props:**
- `onClose`: function

---

## Card Components

### HobbyCard

Display hobby information.

```jsx
import HobbyCard from './components/HobbyCard';

<HobbyCard
  hobby={hobbyObject}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onViewSessions={handleViewSessions}
/>
```

**Props:**
- `hobby`: object (hobby data)
- `onEdit`: function(hobby)
- `onDelete`: function(hobbyId)
- `onViewSessions`: function

**Hobby Object:**
```javascript
{
  _id: string,
  title: string,
  level: 'Beginner' | 'Intermediate' | 'Advanced',
  currentStreak: number,
  longestStreak: number,
  isPublic: boolean
}
```

---

## Common Patterns

### Page Layout

```jsx
import Layout from './components/Layout';
import Button from './components/ui/Button';

const MyPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Page Title
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Page description
            </p>
          </div>
          <Button>Action</Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards */}
        </div>
      </div>
    </Layout>
  );
};
```

---

### Loading State

```jsx
import Layout from './components/Layout';
import Skeleton from './components/ui/Skeleton';

if (loading) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="card" className="h-64" />
          ))}
        </div>
      </div>
    </Layout>
  );
}
```

---

### Empty State

```jsx
import EmptyState from './components/EmptyState';
import { Target } from 'lucide-react';
import Button from './components/ui/Button';

if (items.length === 0) {
  return (
    <EmptyState
      icon={Target}
      title="No items yet"
      description="Get started by adding your first item"
      action={
        <Button onClick={handleAdd}>
          Add Item
        </Button>
      }
    />
  );
}
```

---

### Form with Icons

```jsx
import { Mail, Lock } from 'lucide-react';
import Button from './components/ui/Button';

<form onSubmit={handleSubmit} className="space-y-5">
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Email
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Mail className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="email"
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
  </div>

  <Button type="submit" className="w-full">
    Submit
  </Button>
</form>
```

---

## Icon Usage

### Lucide React Icons

```jsx
import {
  Target,        // Hobby/goal icon
  Activity,      // Sessions/activity
  Flame,         // Current streak
  Trophy,        // Best streak
  Clock,         // Duration/time
  Calendar,      // Date
  User,          // User/profile
  Users,         // Followers/following
  UserPlus,      // Follow
  UserMinus,     // Unfollow
  Rss,           // Feed
  Search,        // Search
  Plus,          // Add
  Edit2,         // Edit
  Trash2,        // Delete
  X,             // Close
  Menu,          // Mobile menu
  LogOut,        // Logout
  Lock,          // Private
  Globe,         // Public
  Mail,          // Email
  LayoutDashboard, // Dashboard
} from 'lucide-react';

// Usage
<Target size={20} className="text-indigo-600" />
```

---

## Styling Guidelines

### Colors

```jsx
// Primary (Indigo)
className="text-indigo-600 dark:text-indigo-400"
className="bg-indigo-600 hover:bg-indigo-700"

// Success (Green)
className="text-green-600 dark:text-green-400"

// Warning (Amber)
className="text-amber-600 dark:text-amber-400"

// Danger (Red)
className="text-red-600 dark:text-red-400"

// Neutral (Gray)
className="text-gray-600 dark:text-gray-400"
className="bg-gray-100 dark:bg-gray-800"
```

### Spacing

```jsx
// Padding
className="p-4"    // 16px all sides
className="px-6"   // 24px horizontal
className="py-8"   // 32px vertical

// Margin
className="mb-4"   // 16px bottom
className="mt-8"   // 32px top

// Gap
className="space-y-4"  // 16px vertical gap
className="space-x-2"  // 8px horizontal gap
className="gap-6"      // 24px grid gap
```

### Borders

```jsx
// Border
className="border border-gray-200 dark:border-gray-700"

// Rounded
className="rounded-lg"   // 8px
className="rounded-xl"   // 12px
```

### Shadows

```jsx
// Card shadow
className="shadow-sm"

// Hover shadow
className="hover:shadow-md"

// Modal shadow
className="shadow-xl"
```

---

## Best Practices

1. **Always use semantic HTML**
   - Use `<button>` for clickable elements
   - Use `<form>` for forms
   - Use proper heading hierarchy

2. **Accessibility**
   - Add `aria-label` to icon buttons
   - Use proper focus states
   - Ensure keyboard navigation works

3. **Responsive Design**
   - Use mobile-first approach
   - Test on different screen sizes
   - Use proper breakpoints (sm, md, lg)

4. **Dark Mode**
   - Always include dark mode classes
   - Test in both themes
   - Ensure proper contrast

5. **Loading States**
   - Show skeletons for content
   - Disable buttons during loading
   - Provide feedback to users

6. **Error Handling**
   - Show clear error messages
   - Provide recovery options
   - Don't break the UI

---

## Questions?

Refer to the component source code for implementation details and additional props.
