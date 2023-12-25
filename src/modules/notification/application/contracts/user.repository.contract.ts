export interface INotificationUserResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export abstract class NotificationUserRepositoryContract {
  abstract fetchUserInformationForNotificationHandler(
    userId: string,
  ): Promise<INotificationUserResponseDTO>;
}
