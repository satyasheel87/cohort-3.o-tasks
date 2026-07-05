# Productivity Dashboard — README

Ek single-page dashboard jisme roz kaam aane wale chhote-chhote tools ek hi jagah hain. Pure **HTML + CSS + JS** se bana hai, koi framework nahi use kiya.

## Files
- `index.html` → poora structure (dashboard + saare feature sections)
- `style.css` → design, colors, light/dark theme, responsive layout
- `script.js` → saara logic (events, localStorage, API calls, timers)

Teeno files ek hi folder mein rakhna, warna links/paths kaam nahi karenge.

## Features (short mein)

**Todo List** — task add karo, star lagao (important), complete/delete karo, search aur filter (All/Active/Important/Completed) bhi hai. Sab kuch `localStorage` mein save hota hai, refresh karne par data delete nahi hota.

**Daily Planner** — din ke 24 ghanto ke liye alag-alag box, jisme note likh sakte ho. Current time wala box highlight hota hai. Ye bhi localStorage mein save hota hai.

**Daily Goals** — aaj ke liye chhote goals add karo, complete mark karo. Upar progress bar dikhata hai kitne goals complete hue ("2 of 5 completed" type).

**Pomodoro Timer** — 25 min work / 5 min short break / 15 min long break ke buttons hain. Start, Pause, Reset kaam karta hai.

**Motivation Quote** — "New Quote" button dabao to ek random quote aata hai, live API se fetch hota hai.

**Weather Widget** — top bar mein tumhari location ka temperature aur condition dikhata hai (location allow nahi kiya to default city ka weather aata hai).

**Date & Time** — top bar mein live date aur time, har second update hota hai.

**Theme Switch** — top bar ke button se light/dark mode switch karo, choice localStorage mein save rehti hai.

**Dynamic Background** — page ka background color din ke time (morning/afternoon/evening/night) ke hisaab se halka sa change hota hai.

## APIs Used (dono free hain, koi API key nahi chahiye)

1. **Weather → Open-Meteo API**
   `https://api.open-meteo.com/v1/forecast?latitude=...&longitude=...&current=temperature_2m,weather_code`
   - Browser se location leta hai (geolocation), allow nahi kiya to default Lucknow ka weather dikhata hai.
   - `weather_code` ko readable text/icon mein convert kiya hai script.js ke andar (`codeMap` object).

2. **Motivation Quote → type.fit Quotes API**
   `https://type.fit/api/quotes`
   - Sabhi quotes ek baar fetch hote hain (jab pehli baar Motivation feature khulta hai), fir random quote dikhaya jata hai.
   - Agar API fail ho jaye (network issue), to code mein pehle se likhe kuch **fallback quotes** dikha diye jaate hain, page blank nahi rehta.

## localStorage mein kya-kya save hota hai
- Todo list (`pd_todos`)
- Daily planner entries (`pd_planner`)
- Daily goals (`pd_goals`)
- Selected theme (`pd_theme`)

## Kaise chalayein
Bas `index.html` ko browser mein double-click karke khol lo. Internet chahiye hoga sirf Weather aur Motivation Quote ke live data ke liye — baaki sab offline bhi kaam karega.
