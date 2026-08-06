# Gambling Katz

Two-player dice game. Pick your degenerate, roll, and bank your points before
a 1 wipes the turn. First to the goal score wins.

Vanilla HTML, CSS and JavaScript — no build step, no dependencies.

## Running it

It is a static site. Open `index.html` directly, or serve the folder:

```sh
npx serve .
```

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
menu/             title screen boil — 6 frames
start/            "Iniciar" button boil — 3 frames
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
