import { trigger, animate, transition, style } from '@angular/animations';

export const lineAnimation = trigger('lineAnimation', [
  transition(':enter', [
    style({ width: '0%' }),
    animate('9s', style({ width: '100%' })),
  ]),
]);
