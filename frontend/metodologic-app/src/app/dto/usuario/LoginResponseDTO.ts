export class LoginResponseDTO {
  constructor(
    public token: string,
    public role: string,
  ) {}
}
