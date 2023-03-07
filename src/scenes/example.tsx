import { Rect } from '@motion-canvas/2d/lib/components';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {waitFor} from '@motion-canvas/core/lib/flow';
import { Vector2, Vector2Signal } from '@motion-canvas/core/lib/types';
import { useLogger } from '@motion-canvas/core/lib/utils';

export default makeScene2D(function* (view) {

  for(let i = 0; i < 1080; i++){
    for(let j = 0; j < 1920; j++){
      const Coord = new Vector2([i, j])
      if(perPixel(Coord) >= 0){
        view.add(
          <Rect
            size={[10,10]}
            fill={"white"}
            x={Coord.x}
            y={Coord.y}
          />
        )
      }
    }
  }

  yield* waitFor(5);
});

function perPixel(Coord: Vector2){
  const rayOrigin = new Vector2([100, 0]);
  const Radius = 1000
  // (bx^2 + by^2)t^2 + (2(axbx + ayby))t + (ax^2 + ay^2 - r^2) = 0

  // a = ray origin
  // b = ray direction
  // r = radius of sphere
  // t = hit distance

  const a  = Coord.x * Coord.x + Coord.y * Coord.y
  const b = rayOrigin.x * Coord.x + rayOrigin.y * Coord.y
  const c = rayOrigin.x * rayOrigin.x + rayOrigin.y * rayOrigin.y - Radius * Radius

  const Discriminant = b * b - 4 * a * c
  useLogger().debug(Discriminant.toString())
  return Discriminant;
}