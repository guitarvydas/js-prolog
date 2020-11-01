//
// transpiled from Nils Holm's Prolog Control in 6 slides
// see https://github.com/guitarvydas/OhmSmallSteps for transpiler
// see https://www.t3x.org/bits/prolog6.html for Prolog Control in 6 Slides
//

////////
// support functions, e.g. Cons()
////////

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
	console.log (x);
	console.log (x.toString ().length);
	console.log (x.toString ());
	process.stdout.write(x.toString()); 
    }
}

///////
// end support functions
///////



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
	if (var_Q_(x)) {
	    return (function(v=lookup(x,e)) {
		return (function(){
		    if (v) {
			return value(cadr(v),e);
		    } else {
			return x;
		    }
		})();

	    })();
	} else {
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
function print_frame_loop(e,ee,accumulator) {
    return (function(){
	if (pair_Q_(cdr(ee))) {
	    return (function(_xx=0) {
		return (function(){
		    if (null_Q_(time(caar(ee)))) {
			return (function(_yy=0) {
			    return (function(result=list(cadaar(ee),resolve(caar(ee),e))) {
				return cons(result,accumulator);

			    })();

			})();
		    } else {
			return print_frame_loop(e,cdr(ee),accumulator);
		    }
		})();

	    })();
	} else {
	    return accumulator;
	}
    })();
};
function print_frame(e) {
    return (function(final_result=print_frame_loop(e,e,list())) {
	return final_result;

    })();
};
let db = list(list(list("some","foo")),list(list("some","bar")),list(list("some","baz")),list(list("eq",list("?","X"),list("?","X"))),list(list("neq",list("?","X"),list("?","Y")),list("eq",list("?","X"),list("?","Y")),"!","fail"),list(list("neq",list("?","X"),list("?","Y"))));
let goals = list(list("some",list("?","X")),list("some",list("?","Y")),list("neq",list("?","X"),list("?","Y")));
clear_result();
prove6(list(),goals,db,empty,1,list(),db);
console.log(get_result ().toString ());
