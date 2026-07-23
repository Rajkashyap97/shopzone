# Prompts.md — AI Pair-Programming Log

Per the Sprint 06 "Learn, Don't Copy" mandate, this file documents where AI assistance
(Claude) was used while building ShopZone, and what was learned from it.

## 1. Routing architecture
**Prompt:** "Explain how BrowserRouter, Routes, and dynamic params like /product/:id work
together in React Router v6, and how useParams reads the id."
**Takeaway:** Routes are matched declaratively; `useParams()` gives access to the `:id`
segment inside the matched component, which is then used to trigger a data fetch keyed
off that id.

## 2. Global cart state without prop drilling
**Prompt:** "What's the cleanest way to share cart state across many routes without
passing props down through every component?"
**Takeaway:** Context API + a reducer (`useReducer`) keeps mutation logic centralized
(add/remove/increment/decrement) while any component can subscribe via a custom
`useCart()` hook instead of receiving cart props manually.

## 3. Preventing duplicate cart entries
**Prompt:** "My add-to-cart keeps pushing duplicate objects for the same product id —
how do I fix that in a reducer?"
**Takeaway:** Check `state.find(item => item.id === payload.id)` first; if found, map
over state and increment `quantity`, otherwise append a new item with `quantity: 1`.

## 4. Persisting cart state across refreshes
**Prompt:** "How do I sync Context state with localStorage so the cart survives a hard
refresh, and how do I safely read it back on load?"
**Takeaway:** Initialize reducer state lazily from `localStorage.getItem(...)` (wrapped
in try/catch for safety), then write to localStorage inside a `useEffect` that runs
whenever cart state changes.

## 5. Protected routes for /checkout
**Prompt:** "How do I redirect unauthenticated users away from /checkout to /login using
React Router v6, and send them back after they log in?"
**Takeaway:** Wrap the route element in a `<ProtectedRoute>` component that checks auth
context and returns `<Navigate to="/login" state={{ from: location.pathname }} />` when
not authenticated; Login reads `location.state.from` to redirect back afterward.

## 6. Vercel 404 on route refresh
**Prompt:** "Why does refreshing /shop on Vercel give a 404, and how do I fix it for a
Vite SPA?"
**Takeaway:** Vercel's static server looks for a physical file matching the URL. Adding
a `vercel.json` rewrite (`"/(.*)" -> "/"`) makes all paths serve `index.html` so React
Router can take over client-side routing.

---
*All code in this repo was written and understood by the author; the above sessions
were used to understand patterns and debug issues, not to copy-paste unreviewed code.*
