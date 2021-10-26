import Firebase from '../firebase';

const putFile = (data: Blob, path: string) => {
  const reference = Firebase.storage().ref(path);
  return reference.put(data);
};

const storageBucket = {
  putFile,
};

export default storageBucket;
