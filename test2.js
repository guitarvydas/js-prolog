fact1 ("line", functor0 ("a"));
fact1 ("line", functor0 ("b"));
fact1 ("line", functor0 ("c"));

rule (head ("eq", lvar("X"), lvar("X")), body ());
rule (head ("neq", lvar("X"), lvar("Y")), body (functor2 ("eq", lvar("X"), lvar("Y")), cut (), fail ()));
rule (head ("neq", lvar("X"), lvar("Y")), body ());

let g = goal(
    list("line",list("?","X")),
    list("line",list("?","Y")),
    list("neq",list("?","X"),
	 list("?","Y")) );

var result = query (g);
console.log (result.toString ());
