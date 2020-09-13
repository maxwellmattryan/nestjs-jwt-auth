import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
    constructor() {
        super('User already exists.');
    }
}

export class WrongUserCredentialsWereProvidedException extends BadRequestException {
    constructor() {
        super('The wrong user credentials were provided.');
    }
}