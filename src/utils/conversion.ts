/**
 * Represents the conversion factor from bytes to bits.
 * The value is set to 8, as there are 8 bits in 1 byte.
 */
export const B2BIT = 8;

/**
 * Represents the conversion factor from kilobytes (KB) to bytes (B).
 * The value is set to 1024, as there are 1024 bytes in 1 kilobyte.
 */
export const KB2B = 1024;

/**
 * Represents the conversion factor from megabytes (MB) to kilobytes (KB).
 * The value is set to 1024, as there are 1024 kilobytes in 1 megabyte.
 */
export const MB2KB = 1024;

/**
 * Represents the conversion factor from megabytes (MB) to bytes (B).
 * The value is calculated by multiplying  MB2KB  with  KB2B .
 */
export const MB2B = MB2KB * KB2B;

/**
 * Represents the conversion factor from seconds (S) to milliseconds (MS).
 * The value is set to 1000, as there are 1000 milliseconds in 1 second.
 */
export const S2MS = 1000;

/**
 * Represents the conversion factor from minute (MIN) to milliseconds (MS).
 * The value is set to 60000, as there are 60000 milliseconds in 1 minute.
 */
export const MIN2MS = 60 * S2MS;

/**
 * Represents the frame rate in frames per second (FPS) in Chrome.
 * The value is set to 60, indicating 60 frames per second.
 */
export const CHROME_FPS = 60;

/**
 * Represents the conversion factor from frames to milliseconds (MS).
 * The value is calculated by dividing  S2MS  by  FRAME_RATE .
 */
export const FRAME2MS = S2MS / CHROME_FPS;
