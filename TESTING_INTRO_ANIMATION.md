# Testing the Intro Animation

## How It Works

The IntroAnimation displays once when users first visit the app, then never again (unless localStorage is cleared).

### Storage Behavior

- **Production**: Uses `localStorage` → persists across browser sessions
- **Development**: Uses `sessionStorage` → only per dev session (to prevent HMR annoyance)

### Key Implementation Files

- `src/main.jsx` — Root component with intro state & localStorage logic
- `src/components/ui/IntroAnimation.jsx` — Animation phases & skip button

---

## Testing Scenarios

### 1. First Visit (Show Intro)

```bash
# Fresh browser / private window
npm run dev
# Navigate to http://localhost:5173
# ✅ Intro animation should play (3.2s total)
```

### 2. Skip Button

```bash
# During intro animation
# Click the "Skip →" button
# ✅ Should immediately hide intro & show app
# ✅ localStorage/sessionStorage flag should be set
```

### 3. Second Visit (No Intro)

```bash
# Refresh page (F5)
# ✅ Should NOT show intro animation
# ✅ Should go directly to app
```

### 4. Force Reset (Testing Only)

To re-show intro animation for testing:

**Browser Console:**
```javascript
// For dev mode (session-based):
sessionStorage.removeItem("roadsos_intro_seen");
location.reload();

// For prod mode (persistent):
localStorage.removeItem("roadsos_intro_seen");
location.reload();
```

**Or use the built-in test flag:**
```javascript
// This will force show intro on next load
sessionStorage.setItem("roadsos_force_intro", "true");
location.reload();
```

### 5. Debug Logging (Dev Mode)

In dev mode, open browser console (F12) to see timing logs:

```
🚀 IntroAnimation started
📍 Phase 1: Logo appears (300ms)
✨ Phase 2: Glow effect (900ms)
📝 Phase 3: Tagline (1500ms)
📡 Phase 4: Pulse rings (2100ms)
🎬 Phase 5: Fade out (2900ms)
✅ IntroAnimation complete (3200ms)
```

---

## Animation Phases

| Phase | Time | Event |
|-------|------|-------|
| 0 | 0ms | Black screen |
| 1 | 300ms | Logo appears (scale + fade) |
| 2 | 900ms | Glow effect + rings |
| 3 | 1500ms | Tagline slides down |
| 4 | 2100ms | Location pulse rings |
| 5 | 2900ms | Fade to transparent |
| - | 3200ms | Complete → Show app |

---

## Visual Checklist

- [ ] Logo appears smoothly (no jank)
- [ ] Glow rings expand smoothly
- [ ] Tagline text is readable
- [ ] Pulse animation is smooth
- [ ] Transition to app is seamless
- [ ] Skip button responds immediately
- [ ] Skip button is visible & clickable
- [ ] No console errors during animation

---

## Common Issues & Fixes

**Issue**: Intro shows every time  
**Fix**: Check browser's localStorage settings (may be disabled in private mode)

**Issue**: Intro doesn't show on first visit  
**Fix**: Check DevTools → Application tab → Storage → localStorage/sessionStorage

**Issue**: Jank during animation  
**Fix**: Close other apps, check CPU usage, verify GPU acceleration enabled

**Issue**: Skip button doesn't work  
**Fix**: Verify click handler is attached in DevTools → Elements panel
