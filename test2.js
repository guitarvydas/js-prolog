

// clear.
// some(foo).
// some(bar).
// some(baz).
// eq(X,X) = true.
// neq(X,Y) = eq(Z) & eq(Y) & cut & false.
// match(some(Z) & some(Y) & neq(X,Y)).

let db =
    list (
	list (
	    list ("line", "a")
	),
	list (
	    list ("line", "b")
	),
	list (
	    list ("line", "c")
	),
	
	list(list("eq",list("?","X"),list("?","X"))),  // head eq, no body required
	
	// neq - 2 alternates
	list(list("neq",list("?","X"),list("?","Y")),  // head neq (alternate 1)
	     list("eq",list("?","X"),list("?","Y")),   // body1 of neq
	     "!",
	     "fail"
	    ),
	list(list("neq",list("?","X"),                 // head neq (alternate 2)
		  list("?","Y")))                     // body2 of neq
    );

let goals = list(
    list("line",list("?","X")),
    list("line",list("?","Y")),
    list("neq",list("?","X"),
	 list("?","Y")) );


clear_result();
prove6(list(),goals,db,empty,1,list(),db);
console.log(get_result ().toString ());

