import Lexical from "./logic/lexical";
import Synctatic from "./logic/syntactic";
// import Grammar from "./logic/Grammar";

export const initial_shape = {
  analyserReducer: {
    lexical: new Lexical(`{
  basic counter;
  basic [ 5 ] array;
  basic [ 5 ][ 2 ] array2D;
  basic [ 5 ][ 2 ][ 2 ] array3D;
  
  while ( true ) 
      counter =   5 * 2;
  
  do
      aux = false;
  while ( 5 != 5.0000000001);
  
  if ( true ) then
  aux = false ;
  else 
  nao = 6 ;
  
        { novoBloco = 5;
          while (true != false)
                  teste = true || false;
                  teste2 = 5 && 7;
                  id  =  -  ! 5.0003;
        }
  } `),
    syntactic: new Synctatic()
  }
};
