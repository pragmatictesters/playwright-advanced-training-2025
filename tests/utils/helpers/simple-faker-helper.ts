/**
 * Simple Faker Helper
 * ====================
 * 
 * A minimal helper class using @faker-js/faker
 * Perfect for beginners - just the basics!
 */

import { faker } from '@faker-js/faker';

export class SimpleFakerHelper {

  /**
   * Generate a random first name
   */
  getFirstName(): string {
    return faker.person.firstName();
  }

  /**
   * Generate a random middle name
   */
  getMiddleName(): string {
    return faker.person.middleName();
  }

  /**
   * Generate a random last name
   */
  getLastName(): string {
    return faker.person.lastName();
  }

  /**
   * Generate a full name (first + last)
   */
  getFullName(): string {
    return faker.person.fullName();
  }

  /**
   * Generate an email address
   */
  getEmail(): string {
    return faker.internet.email();
  }

  /**
   * Generate a phone number
   */
  getPhone(): string {
    return faker.phone.number();
  }
}

