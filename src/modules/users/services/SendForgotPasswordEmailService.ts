// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
// import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {
    console.log('aqu');
  }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    console.log('Usuário é : ', user);
    if (!user) {
      throw new AppError('The user not exist');
    }

    await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      'pedido de recuperação de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
