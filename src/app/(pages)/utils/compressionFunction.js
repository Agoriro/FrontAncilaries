import zlib from 'zlib';

export function encodeCompress(data) {
  const buffer = Buffer.from(data, 'utf-8');
  const compressed = zlib.gzipSync(buffer);
  return compressed.toString('base64');

}

export function decodeCompress(encodedData) {
  const buffer = Buffer.from(encodedData, 'base64');
  const decompressed = zlib.gunzipSync(buffer);
  return decompressed.toString('utf-8');
}