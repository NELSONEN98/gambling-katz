# Gambling Katz

Two-player dice game. Pick your degenerate, roll, and bank your points before
a 1 wipes the turn. First to the goal score wins.

Vanilla HTML, CSS and JavaScript — no build step, no dependencies.

## Running it

It is a static site. Open `index.html` directly, or serve the folder:

```sh
npx serve .
```

## Screens and routing

```
#/title     splash — the alley sign, tap or Iniciar
#/menu      main menu
#/select    character select
#/game      the board
#/gameover  result
```

Hash routing, not the History API: this is a static file opened from disk
or from `/projects/...`, where pushState paths would 404 on reload.

`switchScreen(name)` only pushes a hash; the `hashchange` listener does all
rendering. Button clicks and the browser's back arrow therefore travel the
same path instead of drifting apart. `resolveRoute()` guards screens that
need state behind them — `#/game` with no players redirects to `#/select`.

## Main menu

Entries live in `MENU_ITEMS` in `script.js`, named per `md-guides/` §7 and §9.
`ready: false` renders the entry greyed and disabled with a "pronto" badge —
the mode has no implementation yet. Building one means flipping the flag and
pointing `route` at a screen.

| Entry | State |
|---|---|
| Duelo Online | not built |
| Vs. IA | not built |
| Duelo Local | **playable** — the two-player game |
| Personalización | not built |
| Tienda | not built |

## Rules

- Roll (`space`) adds the die to your current turn total.
- Roll a **1** and the turn total is wiped. Turn passes.
- Hold (`enter`) banks the turn total to your score and passes the turn.
- First player to reach the goal score (default 50) wins.

## Layout

```
index.html        markup for all four screens
script.js         game state, dice, screen flow
style.css         everything visual
styleguide.html   design system reference
img/              character sprites
dices/            die face sprites
main-menu/        main menu boil — 3 drawings, holds 2/3/1
start/            "Iniciar" button boil — 3 drawings, holds 2/1/4
menu/             earlier alley/arcade art — no longer referenced
piskels/          .piskel sources for the character sprites
```

## Frame sequences

The title screen and the start button are hand-drawn boil loops animated in
CSS with `step-end`, not video or GIF.

Exports from Krita hold each drawing across several frames (the title is shot
on threes; the button holds 2/1/4). Only the **unique drawings** are committed —
the holds are reproduced as keyframe percentages in `style.css`. When adding a
sequence, checksum the export first and drop the duplicates, then convert:

```sh
# photographic / textured art
ffmpeg -i frameNNNN.png -vf scale=810:-1 -c:v libwebp -quality 78 out.webp

# art with hard edges or alpha
ffmpeg -i frameNNNN.png -c:v libwebp -lossless 1 out.webp
```

Every frame needs a `<link rel="preload" as="image">` in `index.html`, or the
first loop flashes through blank backgrounds.
