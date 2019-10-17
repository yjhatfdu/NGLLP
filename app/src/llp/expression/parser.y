/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-insensitive
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"("             return  '('
")"             return  ')'
"("             return  '('
")"             return  ')'
"+"             return  '+'
"-"             return  '-'
"*"             return  '*'
"/"             return  '/'
"^"             return  '^'
"PI"            return  'PI'
"E"             return  'E'
[\w\d\u4e00-\u9fa5.]+	{ return 'NAME'};
<<EOF>>	return 'EOF';

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS
%right '('

%start expression
%%

expression    :
    e EOF
    {return $1;}
    ;



e    :
    NUMBER
    {$$={type:'const',value:Number(yytext)};}
    | NAME
    {$$={type:'var',name:yytext};}
    | PI
    {$$={type:'const',value:Math.PI};}
    | 'E'
    {$$={type:'const',value:Math.E};}
    | '(' e ')'
    {$$=$2;}
    | e '+' e
    {$$={type:'plus',children:[$1,$3]};}
    | e '-' e
    {$$={type:'minus',children:[$1,$3]};}
    | e '*' e
    {$$={type:'mul',children:[$1,$3]};}
    | e '/' e
    {$$={type:'div',children:[$1,$3]};}
    | e '^' e
    {$$={type:'pow',children:[$1,$3]};}
    | '-' e %prec UMINUS
    {$$ = {type:'uminus',children:[$2]};}
    |  NAME '(' e ')'
          {$$={type:'func',name:$1,children:[$3]};}
    ;
