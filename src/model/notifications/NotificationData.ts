// For aggregate is for now always 'bookType' because for now we only support navigation for books.
// But because we always send the aggregate we can later easy add more navigation functionality.
// For example if besides we add something else then books then that could be an aggregate as well.
interface NotificationNavigation {
  aggregate: string;
  id: string;
}
export interface NotificationData {
  navigate?: NotificationNavigation;
}
