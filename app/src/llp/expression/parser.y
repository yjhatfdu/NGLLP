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
","             return  ','
">="            return  'gte'
">"             return  'gt'
"<="            return  'lte'
"<"             return  'lt'
"!=="           return  'neq'
"=="            return  'eq'
"&&"            return  'and'
"||"            return  'or'
"!"             return  'not'
"?"             return  '?'
":"             return  ':'
"%"             return  '%'

[\w\d\u4e00-\u9fa5.]+	{ return 'NAME'};
<<EOF>>	return 'EOF';

/lex

/* operator associations and precedence */

%right '?' ':'
%left 'or'
%left 'and'
%left 'not'
%left 'gt' 'gte' 'lt' 'lte' 'eq' 'neq'
%left '+' '-'
%left '*' '/' '%'
%left '^'
%right '('

%start expression
%%

expression    :
    e EOF
    {return $1;}
    ;


arg_list
        :   e  ','  arg_list
            {$$=$3; $$.unshift($1);}
        |   e
            {$$=[$1];}
        |
            {$$=[];}
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
        {$$={type:'bracket',children:[$2]}}
    | e '+' e
        {$$={type:'plus',children:[$1,$3]};}
    | e '-' e
        {$$={type:'minus',children:[$1,$3]};}
    | e '*' e
        {$$={type:'mul',children:[$1,$3]};}
    | e '/' e
        {$$={type:'div',children:[$1,$3]};}
    | e '%' e
        {$$={type:'mod',children:[$1,$3]};}
    | e '^' e
        {$$={type:'pow',children:[$1,$3]};}
    | '-' e
        {$$ = {type:'uminus',children:[$2]};}
    | e 'gt' e
        {$$={type:'gt',children:[$1,$3]};}
    | e 'gte' e
        {$$={type:'gte',children:[$1,$3]};}
    | e 'lt' e
        {$$={type:'lt',children:[$1,$3]};}
    | e 'lte' e
        {$$={type:'lte',children:[$1,$3]};}
    | e 'eq' e
        {$$={type:'eq',children:[$1,$3]};}
    | e 'neq' e
        {$$={type:'neq',children:[$1,$3]};}
    | e 'and' e
        {$$={type:'and',children:[$1,$3]};}
    | 'not' e
        {$$={type:'not',children:[$2]};}
    | e 'or' e
        {$$={type:'or',children:[$1,$3]};}
    | e '?' e ':' e
        {$$={type:'tri',children:[$1,$3,$5]};}
    |  NAME '(' arg_list ')'
        {$$={type:'func',name:$1,children:$3};}
    ;
