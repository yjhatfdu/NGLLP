/**
 * Created by yjh on 16/8/14.
 */
export let gravity:Array<number>=[0,-1,0];
let startCount=0;
export function start(){

   if(startCount==0){
      window.ondevicemotion=onChange
   }
   startCount++;
}

function onChange(e){
   let g=e.accelerationIncludingGravity;

   switch (window.orientation){
      case 180:{
         gravity[0]= -g.x*0.1;
         gravity[1]= -g.y*0.1;
         break
      }
      case 0:{
         gravity[0]= g.x*0.1;
         gravity[1]= g.y*0.1;
         break
      }
      case 90:{
         gravity[0]= -g.y*0.1;
         gravity[1]= g.x*0.1;
         break
      }
      case -90:{
         gravity[0]= g.y*0.1;
         gravity[1]= -g.x*0.1;
         break
      }
   }

   gravity[2]= g.z*0.1
}

export function stop(){
   startCount--;
   if(startCount==0){
      window.ondevicemotion=null
   }
}