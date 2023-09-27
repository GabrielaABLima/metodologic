export class CheckLoginResponseDTO {
  constructor(
    public userName: string,
    public userEmail: string,
    public userProfilePicture: string,
  ) {}
}
