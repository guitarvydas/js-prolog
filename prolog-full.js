// utility functions for Cons.toString()
function isNil(x) {
    if ("string" == typeof(x)) {
	if ("nil" == x) {
	    return true;
	} else {
	    return false;
	}
    } else {
	return false;
    }
}
function isCons (maybeCell) {
    if ("object" == typeof(maybeCell)) {
	if (maybeCell.isPair) {
	    return true;
	} else {
	    return false;
	}
    } else {
	return false;
    }
}
function carItemToString(x) {
    if (x == undefined) {
	return "error(undefined)";
    } else if (x == null) {
	return "error(null)";
    } else if (isNil(x)) {
	return "nil";
    } else if (isCons(x)) {
	return x.toString();
    } else {
	return x.toString();
    }
}
function cdrItemToString(x) {
    if (x == undefined) {
	return "error(undefined)";
    } else if (x == null) {
	return "error(null)";
    } else if (isNil(x)) {
	return "";
    } else if (isCons(x)) {
	return "";
    } else {
	return x.toString();
    }
}

function toSpacer(x) { // return " . " if cell contains a non-nil/non-next-cell item, return " " if end-of-list, else return ""
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    if (x == undefined) {
	return " ";
    } else if (x == null) {
	return " ";
    } else if ( ("object" == typeof(x) && x.isPair) ) {
	if ( ("object" == typeof(x.cdr)) ) {
	    return " ";
	} else if (isNil(x.cdr)) {
	    return "";
	} else {
	    return " . ";
	}
    } else {
	throw "can't happen";
    }
}

function toTrailingSpace(x) { // return " " if end of list, else ""
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    if (x == undefined) {
	return " ";
    } else if (x == null) {
	return " ";
    } else if ( ("object" == typeof(x) && x.isPair) ) {
	if ( ("object" == typeof(x.cdr)) ) {
	    return " ";
	} else if (isNil(x.cdr)) {
	    return "";
	} else {
	    return "";
	}
    } else {
	throw "can't happen";
    }
}


function continueCDRing(maybeCell) {  // if x.cdr is another Cons, return true, if it's "nil" return false, if it's a primitive return false, else return false
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    // x should be a Cons cell or "nil" or a primitive, but it might be null or undefined (an internal error that I want to see)
    if (maybeCell == undefined) {
	return false;
    } else if (maybeCell == null) {
	return false;
    } else if (isNil(maybeCell)) {
	return false;
    } else if (isCons(maybeCell)) {  // a Cons cell
	let next = cdr(maybeCell);
	if (isCons(next)) {
	    return true;
	} else {
	    return false;
	}
    } else if ("object" == typeof(maybeCell)) {
	return false;
    } else {
	return false;
    }
}
function nextCell(maybeCell) { // return cdr of cell if we are to continue (determined by continueCDRing function, above), else return undefined
    // more edge cases than Lisp or Scheme because of undefined and null, and I've decided to make nil be "nil"
    // x should be a Cons cell or "nil" or a primitive, but it might be null or undefined (an internal error that I want to see)
    if (maybeCell == undefined) {
	return undefined;
    } else if (maybeCell == null) {
	return undefined;
    } else if (isNil(maybeCell)) {
	return undefined;
    } else if (isCons(maybeCell)) {
	return cdr(maybeCell);  // this will return a Cons or might return "nil" if at end of list
    } else if ("object" == typeof(maybeCell)) {
	return undefined;
    } else {
	return undefined;
    }
}
function cellToStr(cell) {
    let str = "(";
    let keepGoing = true;
    while (keepGoing) {
	let a = carItemToString(car(cell));
	let d = cdrItemToString(cdr(cell));
	let spacer = toSpacer(cell);
	let trailer = toTrailingSpace(cell);
	str = str + a + spacer + d + trailer;
	keepGoing = continueCDRing(cell);
	cell = nextCell(cell);
    }
    return str + ")";
}
/////

function Cons(car,cdr) { 
    this.car = car;
    this.cdr = cdr;
    this.isPair = true;
    this.toString = function() {  // returns string (a b) or (a . b) with appropriate trailing space in the possible presence of javascript errors (null and undefined)
	return cellToStr(this);
   }
};

function car(cell) {
    return cell.car;
}
function cdr(cell) {
    return cell.cdr;
}
function cddr(cell) {
    return cdr(cdr(cell));
}
function cdddr(cell) {
    return cdr(cdr(cdr(cell)));
}
function cddddr(cell) {
    return cdr(cdr(cdr(cdr(cell))));
}
function cdddddr(cell) {
    return cdr(cdr(cdr(cdr(cdr(cell)))))
}

function caar (cell) {
    return car(car(cell));
}

function cadr (cell) {
    return car(cdr(cell));
}

function caddr (cell) {
    return car(cddr(cell));
}

function cadddr (cell) {
    return car(cdddr(cell));
}

function caddddr (cell) {
    return car(cddddr(cell));
}

function cadaar (cell) {
    return car(cdr(car(car(cell))));
}

function cons(x,y) {
    if (x == undefined && y == undefined) {
	return "nil";
    } else if (y == undefined) {
	return new Cons(x,"nil");
    } else {
	return new Cons(x,y);
    }
}

function list() {
    var result = "nil";
    for(var i = (arguments.length-1); i >= 0 ; i--) {
	result = cons (arguments[i], result);
    }
    return result;
}
function eq_Q_(x,y) {
    return x === y;
}
function eqv_Q_(x,y) {
    return x === y;
}
function null_Q_(x) {
    if (x == "nil") {
	return true;
    } else if (x.isPair) {
	return false;
    } else {
	return false;
    }
}


function pair_Q_(x) {
    // Scheme doesn't like truthiness or falsiness, it wants true or false
    if (!x) {
	return false;
    } else if (x.isPair) {
	return true;
    } else {
	return false;
    }
}
function toDebug (x) {
    console.log("toDebug x=");
    console.log(x);
    if (x == "nil") {
	return "()";
    } else if (x == null) {
	return "NULL";
    } else if (x == undefined) {
	return "UNDEFINED";
    } else {
	return x.toString();
    }
}
function string_Q_(s) {
    return s && ("string" == typeof(s));
}

function string_EQ_Q_(s1,s2) {
    return s1 == s2;
}

function _plus(a,b){
    return a + b;
}

function set_car_B_(l,v) { l.car = v; }
function newline () { process.stdout.write("\n"); }
function display(x) { 
    if (x == "nil") {
	process.stdout.write("nil");
    } else if (x == undefined) {
	process.stdout.write("undefined");
    } else {
	process.stdout.write(x.toString()); 
    }
}

/////// tests /////
/*
console.log("\ntesting cons...");
let x = cons(1,cons(2,cons(3,cons(4,cons(5,cons(6,"nil"))))));
console.log(x);
console.log(car(x));
console.log(cadr(x));
console.log(caddr(x));
console.log(cadddr(x));
console.log(caddddr(x));
console.log(cdr(cdddddr(x)));

console.log("\ntesting list...");
let y = list(1,2,3,4,5,6);
console.log(y);
console.log(car(y));
console.log(cadr(y));
console.log(caddr(y));
console.log(cadddr(y));
console.log(caddddr(y));
console.log(cdr(cdddddr(y)));

console.log();

console.log("\ntesting eq_Q_...");
console.log(eq_Q_("nil","nil")); // should be true
console.log(eq_Q_(1,1));       // should be true
console.log(eq_Q_(true,true)); // should be true
console.log(eq_Q_(false,false)); // should be true
console.log(eq_Q_("abc","abc")); // should be false in Scheme, but isn't in JS
var s = "abc";
console.log(eq_Q_(s,s));  // should be true
var s2 = "abc";
console.log(eq_Q_(s,s2));  // should be false in Schem, but isn't in JS

console.log(eq_Q_(x,y));  // should be false
console.log(eq_Q_(x,x));  // should be true

console.log();
console.log(typeof(x));

console.log("\ntesting pair_Q_...");
console.log();
var a = "nil";
var b = cons("b",a);
var c = cons("b","nil");
var d = cons();

console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(pair_Q_(a));
console.log(pair_Q_(b));
console.log(pair_Q_(c));
console.log(pair_Q_(d));
console.log(pair_Q_("abc"));
console.log(pair_Q_(42));
*/

function testToDebug() {
    console.log("\ntesting toDebug...");
    
    console.log("a");
    let lis = list(1,2,3,list(4,5));
    console.log("b");
    let lis2 = "nil";
    console.log("c");
    console.log(toDebug(null));
    console.log("cc");
    console.log(cons(1,"nil").toString());
    console.log("ccc");
    console.log(list(1).toString());
    console.log("cccc");
    console.log(toDebug(lis));
    console.log("d");
    //console.log(toDebug(lis2));
    console.log("e");
    
    console.log();
    console.log();
}

function testStrings () {
    
    console.log("\ntesting strings...");
    let lll = list("r!","nil");  // should return ("r!" null)
    console.log (lll.toString());
    console.log (car(lll));
    console.log (cadr(lll));  // crashes if lll is not ("r1" null)
}
function testDotted() {
    let ddd = cons(1,2);
    console.log("\ntesting dotted pair");
    console.log(ddd.toString());
    let lll = cons(8,9);
    console.log(lll.toString());
    let cc = list(10);
    console.log(cc.toString());
    let ccc = list(12,13);
    console.log(ccc.toString());
    let lccc = list(14,15,ddd);
    console.log(lccc.toString());
    let cccl = list(list(16,17));
    console.log(cccl.toString());
    let lld = list(cons(18,19));
    console.log(lld.toString());
    let ld = cons(20,cons(21,22));
    console.log(ld.toString());
}

//testToDebug();
//testStrings();
//testDotted();
//    console.log();
//    console.log();

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
function first(x) {
    return car(x);
};
function rest(x) {
    return cdr(x);
};
function AppendInefficient(list1,list2) {
    return (function(){
	if (null_Q_(list1)) {
	    return list2;
	} else {
	    return cons(car(list1),AppendInefficient(cdr(list1),list2));
	}
    })();
};
function AppendInefficient3(list1,list2,list3) {
    return AppendInefficient(list1,AppendInefficient(list2,list3));
};
let result_ = list();
function clear_result() {
    return (result_ = list());
};
function append_to_result(lis) {
    return (result_ = cons(lis,result_));
};
function get_result() {
    return result_;
};
function display_result() {
    return display(get_result());
};
let link = list;
let L_l = car;
let L_g = cadr;
let L_r = caddr;
let L_e = cadddr;
function L_n(x) {
    return car(cddddr(x));
};
function L_c(x) {
    return cadr(cddddr(x));
};
function clear_r(x) {
    return set_car_B_(cddr(x),list(list()));
};
function back6(l,g,r,e,n,c,whole_db) {
    return (function(){
	if (pair_Q_(g) && pair_Q_(r)) {
	    return prove6(l,g,cdr(r),e,n,c,whole_db);

	} else if (pair_Q_(l)) {
	    return prove6(L_l(l),L_g(l),cdr(L_r(l)),L_e(l),L_n(l),L_c(l),whole_db);

	} else {
	    return null;
	}
    })();
};
function prove6(l,g,r,e,n,c,whole_db) {
    return (function(){
	if (null_Q_(g)) {
	    (function(next_result=print_frame(e)) {
		return append_to_result(next_result);

	    })();
	    return back6(l,g,r,e,n,c,whole_db);

	} else if (eq_Q_("!",car(g))) {
	    clear_r(c);
	    return prove6(c,cdr(g),r,e,n,c,whole_db);

	} else if (eq_Q_("r!",car(g))) {
	    return prove6(l,cddr(g),r,e,n,cadr(g),whole_db);

	} else if (null_Q_(r)) {
	    return (function(){
		if (null_Q_(l)) {
		    return true;
		} else {
		    return back6(l,g,r,e,n,c,whole_db);
		}
	    })();

	} else if (foreign_Q_(car(g))) {
	    call_foreign(car(g),e);
	    return prove6(l,cdr(g),r,e,n,c,whole_db);

	} else if (foreign_Q_(car(r))) {
	    call_foreign(car(r),e);
	    return prove6(l,g,cdr(r),e,n,c,whole_db);

	}else {
	    return (function(a=copy(car(r),n)) {
		return (function(e_A_=unify(car(a),car(g),e)) {
		    return (function(){
			if (e_A_) {
			    return prove6(link(l,g,r,e,n,c),AppendInefficient3(cdr(a),list("r!",l),cdr(g)),whole_db,e_A_,_plus(1,n),l,whole_db);
			} else {
			    return back6(l,g,r,e,n,c,whole_db);
			}
		    })();

		})();

	    })();
	}

    })();
};
let empty = list(list("bottom"));
let name = cadr;
let time = cddr;
function var_Q_(x) {
    return pair_Q_(x) && string_Q_(car(x)) && string_EQ_Q_("?",car(x));
};
function lookup_loop(e,id,tm) {
    return (function(){
	if ((!pair_Q_(caar(e)))) {
	    return false;

	} else if (eq_Q_(id,name(caar(e))) && eqv_Q_(tm,time(caar(e)))) {
	    return car(e);

	}else {
	    return lookup_loop(cdr(e),id,tm);
	}

    })();
};
function lookup(v,e) {
    return (function(id=name(v),tm=time(v)) {
	return lookup_loop(e,id,tm);

    })();
};
function value(x,e) {
    return (function(){
	if (foreign_Q_(x)) {
	    return call_foreign(x,e);

	} else if (var_Q_(x)) {
	    return (function(v=lookup(x,e)) {
		return (function(){
		    if (v) {
			return value(cadr(v),e);
		    } else {
			return x;
		    }
		})();

	    })();

	}else {
	    return x;
	}

    })();
};
function copy(x,n) {
    return (function(){
	if ((!pair_Q_(x))) {
	    return x;

	} else if (var_Q_(x)) {
	    return AppendInefficient(x,n);

	}else {
	    return cons(copy(car(x),n),copy(cdr(x),n));
	}

    })();
};
function bind(x,y,e) {
    return cons(list(x,y),e);
};
function unify(x1,y1,e) {
    return (function(x=value(x1,e),y=value(y1,e)) {
	return (function(){
	    if (eq_Q_(x,y)) {
		return e;

	    } else if (var_Q_(x)) {
		return bind(x,y,e);

	    } else if (var_Q_(y)) {
		return bind(y,x,e);

	    } else if ((!pair_Q_(x)) || (!pair_Q_(y))) {
		return false;

	    }else {
		return (function(e_A_=unify(car(x),car(y),e)) {
		    return e_A_ && unify(cdr(x),cdr(y),e_A_);

		})();
	    }

	})();

    })();
};
function resolve(x,e) {
    return (function(){
	if ((!pair_Q_(x))) {
	    return x;

	} else if (var_Q_(x)) {
	    return (function(v=value(x,e)) {
		return (function(){
		    if (var_Q_(v)) {
			return v;
		    } else {
			return resolve(v,e);
		    }
		})();

	    })();

	}else {
	    return cons(resolve(car(x),e),resolve(cdr(x),e));
	}

    })();
};
function has_bindings_Q_(ee) {
    return pair_Q_(cdr(ee));
};
function get_var_name_from_binding(ee) {
    return cadaar(ee);
};
function get_binding_value_from_binding(ee,e) {
    return resolve(caar(ee),e);
};
function no_timestamp_binding_Q_(ee) {
    return null_Q_(time(caar(ee)));
};
function get_rest_of_bindings(ee) {
    return cdr(ee);
};
function print_frame_helper(ee,all_bindings,accumulator) {
    return (function(){
	if (has_bindings_Q_(ee)) {
	    return (function(var_name=get_var_name_from_binding(ee),binding_value=get_binding_value_from_binding(ee,all_bindings),remaining_bindings=get_rest_of_bindings(ee)) {
		return (function(){
		    if (no_timestamp_binding_Q_(ee)) {
			return print_frame_helper(remaining_bindings,all_bindings,cons(cons(var_name,binding_value),accumulator));

		    }else {
			return print_frame_helper(remaining_bindings,all_bindings,accumulator);
		    }

		})();

	    })();

	}else {
	    return accumulator;
	}

    })();
};
function print_frame(e) {
    return (function(final_result=print_frame_helper(e,e,list())) {
	return final_result;

    })();
};

function foreign_Q_(expr) {
    return pair_Q_(expr) && string_Q_(car(expr)) && string_EQ_Q_("@",car(expr));
};

function call_foreign(expr,bindings) {
    return (function(func=cadr(expr),args=cddr(expr)) {
	return (function(){
	    if (string_EQ_Q_("unity",func)) {
		return car(args);

	    } else if (string_EQ_Q_("add",func)) {
		return (function(resolved_args=map(lambda(a(),value(a,bindings)),args)) {
		    return _plus(car(resolved_args),cadr(resolved_args));

		})();

	    } else if (string_EQ_Q_("display",func)) {
		return (function(a=value(car(args),bindings)) {
		    return display(a);

		})();

	    } else if (string_EQ_Q_("newline",func)) {
		return newline();

	    }else {
		return error("call_foreign called with unknown operator",func);
	    }

	})();

    })();
};
