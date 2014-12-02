# PiTV for Raspberry Pi (DEVELOP-1.0.0)

**This is a work-in-progress branch for the upcoming version 1.0.0 using Angular.js. It is far from complete and currently unusable! Check out the master branch for the fully functional software.**

This turns your Pi into a Popcorntime-like set-top box. The Pi will be able to stream movies and series from torrents and play it on a connected HDMI screen (preferable a TV).

On a running PiTV you can open a remote in your browser by navigating to your Pi's IP.

## To Do

Tasks to complete to get to the milestone 1.0.0.

- [x] Tabbing Controller & Tabs
- [x] Movies & Series Controller Search
- [x] YtsService
- [ ] YtsService Search
- [x] TmdbService
- [ ] EztvService
- [ ] EztvService Search
- [x] PopupService
- [x] MovieDetails via PopupService
- [ ] SeriesDetails via PopupService
- [ ] SeriesEpisodesOfSeason via PopupService
- [ ] EpisodeDetails via PopupService
- [ ] PlaybackService linked with FooterController
- [ ] PlaybackService & Socket.io
- [ ] Socket.io Server Rewrite
- [ ] Settings
- [ ] Subtitles

## More Information

[Goto the PiTV website to learn more.](http://pitv.pw)

## How to contribute?

**Dependencies:**

* ```npm install -g grunt-cli```
* ```npm install -g bower```
* ```npm install -g yo```
* ```gem install sass compass```

**Things to do after cloning:**

* ```npm install --dev```
* ```bower install```

**How to start the frontend test server:**

* ```grunt serve```

## ~~How to install?~~

The old instructions won't work. Especially because it's not finished...
