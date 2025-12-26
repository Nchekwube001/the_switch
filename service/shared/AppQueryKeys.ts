import { faker } from "@faker-js/faker";
export class AppQueryKeys {
  static user = "user";
  static cards = "cards";
  static uri = faker.image.url({
    width: 32,
  });
}
