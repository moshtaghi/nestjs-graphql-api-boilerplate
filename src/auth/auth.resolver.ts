import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/loginResponse.dto';
import { LoginUserInput } from './dto/loginUserInput.dto';
import { GqlAuthGuard } from './guards/gqlAuth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  register(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.register(loginUserInput);
  }
}
