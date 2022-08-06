import { Buffer } from "buffer";

export const convertFromBase64 = (str: string): string => {
    return Buffer.from(str, "base64").toString();
}