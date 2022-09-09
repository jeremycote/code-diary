import { Buffer } from 'buffer';

export const convertFromBase64 = (str: string): string => {
  try {
    return Buffer.from(str, 'base64').toString();
  } catch (e) {
    console.error('failed to convertFromBase64');
    return '';
  }
};
