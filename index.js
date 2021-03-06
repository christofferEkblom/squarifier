/*
 * Copyright 2018 Christoffer Ekblom
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the ISC license.
 * For more info, see https://github.com/christofferEkblom/squarifier/blob/master/LICENSE
 */

'use strict';

let squarifier = require('./src');
let settings = require('./src/settings.js');
let program = require('commander');

program.option('-d, --directory [path]', 'target directory (required)');
program.option('-s --size [integer]', `output canvas size (default is ${settings.DEFAULT_CANVAS_SIZE})`);
program.option('-c --color [0xrrggbbaa]', `background color (default is 0x${settings.DEFAULT_BACKGROUND_COLOR.toString(16)})`);
program.parse(process.argv);

let size = parseInt(program.size ? program.size : settings.DEFAULT_CANVAS_SIZE);
let color = parseInt(program.color ? program.color : settings.DEFAULT_BACKGROUND_COLOR);

(async () => {
  let numberOfChanges;

  try {
    numberOfChanges = await squarifier(program.directory, size, color);
  } catch (err) {
    console.error(err);
    process.exit(9);
  }

  console.log(`Done. Changed ${numberOfChanges} files.`);
})();
