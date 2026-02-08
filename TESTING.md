# 🧪 HobbyTrack Testing Guide

## Manual Testing Checklist

### 🔐 Authentication Tests

#### Registration
- [ ] Register with valid credentials
- [ ] Try to register with existing email (should fail)
- [ ] Try to register with invalid email format (should fail)
- [ ] Try to register with password < 6 characters (should fail)
- [ ] Try to register with empty fields (should fail)
- [ ] Verify auto-login after successful registration
- [ ] Check token is stored in localStorage
- [ ] Verify redirect to dashboard after registration

#### Login
- [ ] Login with valid credentials
- [ ] Try to login with wrong password (should fail)
- [ ] Try to login with non-existent email (should fail)
- [ ] Try to login with empty fields (should fail)
- [ ] Verify token is stored in localStorage
- [ ] Verify redirect to dashboard after login
- [ ] Check "Remember me" functionality (token persistence)

#### Logout
- [ ] Click logout button
- [ ] Verify token is removed from localStorage
- [ ] Verify redirect to login page
- [ ] Try to access protected routes after logout (should redirect)

#### Session Persistence
- [ ] Login and close browser
- [ ] Reopen browser and verify still logged in
- [ ] Check token expiration (30 days)

---

### 📊 Dashboard Tests

#### Hobby Creation
- [ ] Click "Add Hobby" button
- [ ] Fill in hobby title
- [ ] Select skill level (Beginner/Intermediate/Advanced)
- [ ] Toggle privacy (Public/Private)
- [ ] Submit and verify hobby appears in grid
- [ ] Try to create hobby with empty title (should fail)
- [ ] Verify hobby card displays correct information

#### Hobby Editing
- [ ] Click edit button on hobby card
- [ ] Change hobby title
- [ ] Change skill level
- [ ] Toggle privacy setting
- [ ] Save and verify changes appear
- [ ] Cancel edit and verify no changes

#### Hobby Deletion
- [ ] Click delete button on hobby card
- [ ] Verify confirmation dialog appears
- [ ] Confirm deletion
- [ ] Verify hobby is removed from grid
- [ ] Try cancel deletion and verify hobby remains

#### Hobby Display
- [ ] Verify hobby cards show title
- [ ] Check skill level badge color (Green/Yellow/Purple)
- [ ] Verify current streak displays correctly
- [ ] Verify longest streak displays correctly
- [ ] Check privacy indicator (🌐 Public / 🔒 Private)
- [ ] Verify "View Sessions" button works

#### Empty State
- [ ] Delete all hobbies
- [ ] Verify empty state message appears
- [ ] Check "Add Your First Hobby" button works

---

### ⏱️ Session Tests

#### Session Creation
- [ ] Navigate to Sessions page
- [ ] Select a hobby from dropdown
- [ ] Click "Add Session"
- [ ] Select date (today or past)
- [ ] Enter duration in minutes
- [ ] Add optional notes
- [ ] Submit and verify session appears in history
- [ ] Try to add session with 0 duration (should fail)
- [ ] Try to add session with future date (should fail)

#### Session Display
- [ ] Verify sessions appear in chronological order (newest first)
- [ ] Check duration formatting (e.g., "1h 30m", "45m")
- [ ] Verify date formatting
- [ ] Check notes display correctly
- [ ] Verify session count updates

#### Streak Calculation
- [ ] Add session for today
- [ ] Verify current streak increments
- [ ] Add session for yesterday
- [ ] Verify streak continues
- [ ] Skip a day and add session
- [ ] Verify streak resets to 1
- [ ] Add multiple consecutive days
- [ ] Verify longest streak updates correctly

#### Hobby Filtering
- [ ] Switch between different hobbies in dropdown
- [ ] Verify sessions update for selected hobby
- [ ] Check hobby stats update (streaks, session count)

#### Empty State
- [ ] Select hobby with no sessions
- [ ] Verify empty state message appears
- [ ] Check "Add your first practice session" message

---

### 📰 Feed Tests

#### Feed Display
- [ ] Navigate to Feed page
- [ ] Verify followed users' sessions appear
- [ ] Check chronological order (newest first)
- [ ] Verify user avatars display
- [ ] Check user names appear
- [ ] Verify hobby names display
- [ ] Check duration formatting
- [ ] Verify relative time ("2h ago", "Yesterday")
- [ ] Check notes display if present

#### Feed Updates
- [ ] Follow a new user
- [ ] Verify their sessions appear in feed
- [ ] Unfollow a user
- [ ] Verify their sessions disappear from feed

#### Empty State
- [ ] Unfollow all users
- [ ] Verify empty state message appears
- [ ] Check "Follow other users" message

#### Privacy
- [ ] Verify only public hobbies appear in feed
- [ ] Check private hobbies are hidden
- [ ] Verify own sessions don't appear in feed

---

### 👤 Profile Tests

#### Own Profile
- [ ] Navigate to Profile page
- [ ] Verify name and email display
- [ ] Check hobby count is correct
- [ ] Verify followers count
- [ ] Verify following count
- [ ] Check all hobbies display (public and private)
- [ ] Verify hobby cards show correct information
- [ ] Check streaks display correctly

#### Other Users' Profiles
- [ ] Search for a user
- [ ] Click to view their profile
- [ ] Verify only public hobbies display
- [ ] Check follow button appears
- [ ] Click follow button
- [ ] Verify button changes to "Unfollow"
- [ ] Verify follower count increments
- [ ] Click unfollow
- [ ] Verify button changes back to "Follow"
- [ ] Verify follower count decrements

#### Profile Navigation
- [ ] Click user from feed
- [ ] Verify navigates to their profile
- [ ] Click user from search results
- [ ] Verify navigates to their profile

#### Empty State
- [ ] View profile with no hobbies
- [ ] Verify empty state message appears
- [ ] Check appropriate message for own vs others' profiles

---

### 🔍 Search Tests

#### User Search
- [ ] Click search button in navigation
- [ ] Search modal opens
- [ ] Enter user name
- [ ] Verify results appear
- [ ] Check user avatars display
- [ ] Verify names and emails show
- [ ] Click on a user
- [ ] Verify navigates to their profile
- [ ] Close modal

#### Search Functionality
- [ ] Search by partial name
- [ ] Verify partial matches work
- [ ] Search by email
- [ ] Verify email search works
- [ ] Search with different capitalization
- [ ] Verify case-insensitive search
- [ ] Search for non-existent user
- [ ] Verify "No users found" message

#### Search UI
- [ ] Verify modal closes on X button
- [ ] Check modal closes on user selection
- [ ] Verify search button in navbar works
- [ ] Check loading state during search

---

### 🎨 Theme Tests

#### Theme Toggle
- [ ] Click theme toggle button (🌙/☀️)
- [ ] Verify theme switches immediately
- [ ] Check all components update colors
- [ ] Verify smooth color transitions
- [ ] Toggle back to original theme
- [ ] Verify theme persists after page reload

#### Light Mode
- [ ] Switch to light mode
- [ ] Check background colors are light
- [ ] Verify text is dark and readable
- [ ] Check all components render correctly
- [ ] Verify proper contrast ratios

#### Dark Mode
- [ ] Switch to dark mode
- [ ] Check background colors are dark
- [ ] Verify text is light and readable
- [ ] Check all components render correctly
- [ ] Verify proper contrast ratios
- [ ] Check no white flashes on page load

#### Theme Persistence
- [ ] Set theme to dark
- [ ] Close browser
- [ ] Reopen browser
- [ ] Verify dark theme is still active
- [ ] Check localStorage has theme preference

---

### 📱 Responsive Design Tests

#### Mobile (< 768px)
- [ ] Resize browser to mobile width
- [ ] Verify bottom navigation appears
- [ ] Check top navigation is simplified
- [ ] Verify hamburger menu works
- [ ] Check hobby cards stack vertically
- [ ] Verify all buttons are touch-friendly
- [ ] Check modals fit on screen
- [ ] Verify text is readable
- [ ] Check spacing is appropriate

#### Tablet (768px - 1024px)
- [ ] Resize browser to tablet width
- [ ] Verify navigation adapts
- [ ] Check hobby cards in 2-column grid
- [ ] Verify all features work
- [ ] Check touch and mouse input work

#### Desktop (> 1024px)
- [ ] Resize browser to desktop width
- [ ] Verify full navigation displays
- [ ] Check hobby cards in 3-column grid
- [ ] Verify hover states work
- [ ] Check all features accessible
- [ ] Verify keyboard navigation works

#### Orientation Changes
- [ ] Rotate device/resize window
- [ ] Verify layout adapts smoothly
- [ ] Check no content is cut off
- [ ] Verify all features remain accessible

---

### 🔒 Security Tests

#### Authentication
- [ ] Try to access /dashboard without login (should redirect)
- [ ] Try to access /sessions without login (should redirect)
- [ ] Try to access /feed without login (should redirect)
- [ ] Try to access /profile without login (should redirect)
- [ ] Verify token is required for API calls
- [ ] Check 401 errors trigger logout

#### Authorization
- [ ] Try to edit another user's hobby (should fail)
- [ ] Try to delete another user's hobby (should fail)
- [ ] Try to add session to another user's hobby (should fail)
- [ ] Verify can only see own private hobbies

#### Data Validation
- [ ] Try SQL injection in inputs (should be sanitized)
- [ ] Try XSS attacks in text fields (should be escaped)
- [ ] Try to submit invalid data types (should fail)
- [ ] Verify server-side validation works

---

### 🚀 Performance Tests

#### Load Times
- [ ] Measure initial page load (should be < 3s)
- [ ] Check dashboard load time
- [ ] Verify sessions page loads quickly
- [ ] Check feed loads in reasonable time
- [ ] Measure profile page load

#### Navigation Speed
- [ ] Click between pages
- [ ] Verify instant navigation (client-side routing)
- [ ] Check no page reloads
- [ ] Verify smooth transitions

#### API Response Times
- [ ] Monitor network tab
- [ ] Check API calls complete quickly (< 1s)
- [ ] Verify no unnecessary API calls
- [ ] Check data is cached appropriately

#### Large Data Sets
- [ ] Create 50+ hobbies
- [ ] Verify dashboard still performs well
- [ ] Add 100+ sessions
- [ ] Check sessions page performance
- [ ] Follow 50+ users
- [ ] Verify feed loads efficiently

---

### 🎯 User Experience Tests

#### Loading States
- [ ] Verify spinners appear during loads
- [ ] Check loading text is clear
- [ ] Verify buttons disable during submission
- [ ] Check no double-submission possible

#### Error Handling
- [ ] Disconnect internet
- [ ] Try to perform actions
- [ ] Verify error messages appear
- [ ] Reconnect internet
- [ ] Verify app recovers gracefully

#### Success Feedback
- [ ] Create hobby
- [ ] Verify immediate UI update
- [ ] Add session
- [ ] Check instant feedback
- [ ] Follow user
- [ ] Verify button updates immediately

#### Empty States
- [ ] Check all empty states have helpful messages
- [ ] Verify action buttons are present
- [ ] Check icons are appropriate
- [ ] Verify messages are encouraging

---

### 🌐 Browser Compatibility

#### Chrome
- [ ] Test all features in Chrome
- [ ] Verify no console errors
- [ ] Check all styles render correctly

#### Firefox
- [ ] Test all features in Firefox
- [ ] Verify no console errors
- [ ] Check all styles render correctly

#### Safari
- [ ] Test all features in Safari
- [ ] Verify no console errors
- [ ] Check all styles render correctly

#### Edge
- [ ] Test all features in Edge
- [ ] Verify no console errors
- [ ] Check all styles render correctly

---

### ♿ Accessibility Tests

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Verify focus states are visible
- [ ] Check tab order is logical
- [ ] Verify Enter key submits forms
- [ ] Check Escape key closes modals

#### Screen Reader
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Verify all content is readable
- [ ] Check ARIA labels are present
- [ ] Verify form labels are associated
- [ ] Check error messages are announced

#### Color Contrast
- [ ] Use contrast checker tool
- [ ] Verify all text meets WCAG AA (4.5:1)
- [ ] Check both light and dark modes
- [ ] Verify interactive elements are distinguishable

#### Focus Management
- [ ] Open modal
- [ ] Verify focus moves to modal
- [ ] Close modal
- [ ] Verify focus returns to trigger
- [ ] Check focus is never lost

---

## Automated Testing (Future)

### Unit Tests
- Component rendering
- Utility functions
- Context providers
- Custom hooks

### Integration Tests
- API calls
- Form submissions
- Navigation flows
- Authentication flows

### End-to-End Tests
- Complete user journeys
- Critical paths
- Error scenarios
- Edge cases

---

## Bug Reporting Template

When you find a bug, report it with:

**Title**: Brief description

**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Behavior**: What should happen

**Actual Behavior**: What actually happens

**Environment**:
- Browser: Chrome 120
- OS: Windows 11
- Screen size: 1920x1080

**Screenshots**: If applicable

**Console Errors**: Any error messages

---

## Testing Best Practices

1. **Test in multiple browsers**: Chrome, Firefox, Safari, Edge
2. **Test on real devices**: Not just browser dev tools
3. **Test with slow network**: Throttle connection speed
4. **Test with large datasets**: Create lots of test data
5. **Test edge cases**: Empty states, max values, special characters
6. **Test accessibility**: Use keyboard only, screen reader
7. **Test error scenarios**: Network failures, invalid data
8. **Document bugs**: Use the template above
9. **Retest after fixes**: Verify bugs are actually fixed
10. **Test happy path**: Ensure normal usage works perfectly

---

**Testing Status**: Ready for QA ✅
**Last Updated**: February 2026
