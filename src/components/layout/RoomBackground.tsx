import { ROOM_IMAGE } from '../../data/characterAssets';

export function RoomBackground() {
  return (
    <img
      src={ROOM_IMAGE}
      alt=""
      className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover"
      draggable={false}
    />
  );
}
