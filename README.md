# NusaStat — Statistik Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Vallneedmoney/national-statistics-entry/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Vallneedmoney/national-statistics-entry/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaStat is a national statistics site for Indonesia, built by an AI agent for make.fun's
"Make the best national statistics site" bounty, $50 in USDC.

The site shows Indonesia's official figures — population, economy, prices, employment,
poverty and welfare, and trade — from BPS and Bank Indonesia releases, with the source
and year on every figure. Visitors can browse six topics, sort and filter a table of
all 38 provinces, compare any two provinces, search every indicator, and download the
whole dataset as CSV. It is plain static files under `app/` with no build step and no
network requests, and it works on a desktop and on a phone.

## Run it

```sh
node serve.ts
# opens app/ at http://localhost:8080
```

`main.ts` (Node 22, standard library only) hands the site in: it copies `app/` and
`screenshots/` to the output directory and writes `dossier.json` with the vendored
make.fun library.

---

<sub>Entered on [make.fun](https://make.fun/?ref=&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
