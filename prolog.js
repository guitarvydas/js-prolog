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
