# mdv-lines

List of [MDV](https://www.mdv.de/) (Mitteldeutscher Verkehrsverbund) lines, including line colors.

[![npm version](https://img.shields.io/npm/v/mdv-lines.svg)](https://www.npmjs.com/package/mdv-lines)
[![Build Status](https://travis-ci.org/juliuste/mdv-lines.svg?branch=master)](https://travis-ci.org/juliuste/mdv-lines)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/mdv-lines.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/mdv-lines.svg)](https://david-dm.org/juliuste/mdv-lines)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/mdv-lines.svg)](https://david-dm.org/juliuste/mdv-lines#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/mdv-lines.svg?style=flat)](LICENSE)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```shell
npm install --save mdv-lines
```

## Usage

```js
const lines = require('mdv-lines')

console.log(lines)
```

Gives you an array of line objects which looks as follows:

```js
[
    {
        "name": "10",
        "operator": "HAVAG", // please note that this is not necessarily a real operator, e.g. some lines are 'operated' by "VBB"
        "easygoId": 114,
        "color": "#336633", // can be null
        "mode": "train",
        "subMode": "tram"
    },
    {
        "name": "35",
        "operator": "HAVAG",
        "easygoId": 112,
        "color": "#0066CC",
        "mode": "bus",
        "subMode": "bus"
    }
    // …
]
```

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/mdv-lines/issues).
