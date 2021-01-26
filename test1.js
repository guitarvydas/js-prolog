// (define db
//   '(((some foo))
//     ((some bar))
//     ((some baz))

//     ((eq ("?" X) ("?" X)))

//     ((neq ("?" X) ("?" Y))
//      (eq ("?" X) ("?" Y)) ! fail)

//     ((neq ("?" X) ("?" Y)))))

// (define goals '((some ("?" X))
//                 (some ("?" Y))
//                 (neq ("?" X) ("?" Y))))

fact1 ("some",functor0("foo"));
fact1 ("some",functor0("bar"));
fact1 ("some",functor0("baz"));

rule (head ("eq", lvar("X"), lvar("X")), body ());
rule (head ("neq", lvar("X"), lvar("Y")), body (functor2 ("eq", lvar("X"), lvar("Y")), cut (), fail ()));
rule (head ("neq", lvar("X"), lvar("Y")), body ());

let g = 
    goal (
	list ("some",lvar ("X")),
	list ("some",lvar ("Y")),
	list ("neq",lvar ("X"), lvar ("Y"))
    );

var result = query (g);
console.log(result.toString ());
