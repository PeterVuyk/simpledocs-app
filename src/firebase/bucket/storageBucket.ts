import { getStorage, ref, uploadBytes } from 'firebase/storage';

const putFile = (data: Blob, path: string) => {
  const reference = ref(getStorage(), path);
  return uploadBytes(reference, data);
};

const storageBucket = {
  putFile,
};

export default storageBucket;
