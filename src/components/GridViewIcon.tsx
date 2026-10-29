export function GridViewIcon({columns}:{columns:2|4}){
 const frames=columns===2?[[2,9.375,20],[26,9.375,20]]:[[5,3,16],[27,3,16],[5,18,16],[27,18,16]];
 return <svg viewBox="0 0 48 30" aria-hidden="true">{frames.map(([x,y,width],i)=><rect key={i} x={x} y={y} width={width} height={width*9/16}/>)}</svg>;
}
