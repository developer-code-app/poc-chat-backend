import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"

function IsEventSubclass(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isEventSubclass",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, _: ValidationArguments) {
          return value instanceof Event
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an instance of a subclass of Event`
        },
      },
    })
  }
}

export { IsEventSubclass }
