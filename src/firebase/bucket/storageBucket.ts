import { getStorage, ref, uploadBytes } from 'firebase/storage';

const putFile = (data: Blob, path: string) => {
  const reference = ref(getStorage(), path);
  // TODO: Is dit de juiste?
  return uploadBytes(reference, data);
};

const storageBucket = {
  putFile,
};

export default storageBucket;
