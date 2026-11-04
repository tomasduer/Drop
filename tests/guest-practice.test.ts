import { expect, test } from 'bun:test';
import { guestPracticeResult } from '../src/lib/guest-practice';

test('guest activities never award general or campaign points even with all correct answers', () => {
  expect(guestPracticeResult([0, 1, 2])).toEqual({ correct: 3, total: 3, generalAward: 0, campaignAward: 0 });
});
test('practice result reflects the actual submitted answers', () => {
  expect(guestPracticeResult([1, 0, 0]).correct).toBe(0);
});