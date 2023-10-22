import { NoteDuration } from "../type";

export const wrapIndex = (array: any[], index: number) => index - (Math.floor(index / array.length) * array.length);

export const getNoteDurationInSeconds = (duration: NoteDuration, tempo: number) => duration * 4 / (tempo / 60)