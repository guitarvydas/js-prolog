var db = list ();

function clearDB () { db = list (); };
// facts can be pushed in any order (cons results in reverse order)
function pushDB (x) { db = cons (x, db); };
// rules must be kept in order, so we use the less-efficient Append instead of Cons
function appendDB (x) { db = AppendInefficient (db, list(x)); };
function lvar (s) { return list ("?",s); };
function fact0 (r) { pushDB (list (list (r))); }
function fact1 (r,s) { pushDB (list (list (r, car(s)))); }
function fact2 (r,s,o) { pushDB (list (list (r,car(s),car(o)))); }
function rule (head, bod) {
    // make multiple rules, one for each body clause: cons(head,clause)
    // head is a Cons()
    // body is an array of Cons()
    var rle;
    rle = cons (head, bod);
    appendDB (rle);
    return "nil";
};
function lvar (letter) { return list ("?", letter); };
function succeed () { return list (); };
function cut () { return "!"; };
function fail () { return "fail"; };
////
function query (goal) {
    prove6 (list (), goal, db, empty, 1, list (), db);
    var r = get_result ();
    return r;
}

var functor0 = list;
var functor1 = list;
var functor2 = list;
var head = list;
var body = list;
var goal = list;
