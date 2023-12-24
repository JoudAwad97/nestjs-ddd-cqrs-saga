export interface INotificationUserResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface NotificationUserRepositoryContract {
  fetchUserInformationForNotificationHandler(
    userId: string,
  ): Promise<INotificationUserResponseDTO>;
}
