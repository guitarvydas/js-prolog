#!/bin/bash
cat support.js prolog.js >prolog-full.js

cat prolog-full.js test1.js >junk1.js
node junk1

cat prolog-full.js test2.js >junk2.js
node junk2

echo 'result should be:
(((X . foo)  (Y . bar))  ((X . foo)  (Y . baz))  ((X . bar)  (Y . foo))  ((X . bar)  (Y . baz))  ((X . baz)  (Y . foo))  ((X . baz)  (Y . bar))) \
(((X . a)  (Y . b))  ((X . a)  (Y . c))  ((X . b)  (Y . a))  ((X . b)  (Y . c))  ((X . c)  (Y . a))  ((X . c)  (Y . b))) \
'

