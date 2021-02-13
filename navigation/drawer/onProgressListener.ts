let progressListener: any;
// TODO: Replace 'any' with real return type

export const setProgressListener: any = (listener: any) => {
  progressListener = listener; // functie die je meegeeft als argument voor progress.
};
export const getProgressListener: any = () => progressListener;

// TODO: betere naam. drawerPgrogreslistener ofzo.. (filename)

// TODO Filenamen: Als class exporteert of component. dan met hoofdletter beginnen. als helpers exporteert dan kleine letter.

// TODO: ff uitzoeken over breakpoints werkend krijgen.
