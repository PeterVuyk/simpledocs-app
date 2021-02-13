let drawerProgressListener: () => void;

export const setDrawerProgressListener: any = (listener: () => void) => {
  drawerProgressListener = listener;
};

export const getDrawerProgressListener: any = () => drawerProgressListener;
