#!/bin/bash
cat support.js prolog.js >prolog-full.js

cat prolog-full.js test1.js >junk1.js
node junk1

#cat prolog-full.js test2.js >junk2.js
#node junk2


