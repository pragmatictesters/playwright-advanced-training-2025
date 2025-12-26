/**
 * Faker Data Generator Helper Class
 * ==================================
 * 
 * This helper class uses the popular @faker-js/faker library
 * to generate realistic fake data for testing purposes.
 * 
 * FAKER.JS ADVANTAGES:
 * - Generates realistic-looking data (real names, addresses, etc.)
 * - Supports multiple locales (US, UK, DE, FR, etc.)
 * - Extensive API for all types of data
 * - Active community and regular updates
 * 
 * INSTALLATION:
 * npm install --save-dev @faker-js/faker
 * 
 * @see https://fakerjs.dev/
 */

import { faker } from '@faker-js/faker';

// ============================================================
// SECTION 1: TYPE DEFINITIONS
// ============================================================

/**
 * User interface with common registration fields
 */
export interface FakeUser {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  avatar: string;
  dateOfBirth: Date;
  age: number;
}

/**
 * Address interface for shipping/billing
 */
export interface FakeAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
}

/**
 * Company/Business information
 */
export interface FakeCompany {
  name: string;
  catchPhrase: string;
  industry: string;
  website: string;
  email: string;
  phone: string;
}

/**
 * Product information for e-commerce testing
 */
export interface FakeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  quantity: number;
}

/**
 * Credit card information for payment testing
 */
export interface FakeCreditCard {
  number: string;
  cvv: string;
  expiryDate: string;
  cardType: string;
  holderName: string;
}

// ============================================================
// SECTION 2: FAKER DATA GENERATOR CLASS
// ============================================================

/**
 * FakerDataGenerator - Wrapper class for @faker-js/faker
 * 
 * Provides easy-to-use methods for generating test data
 * with realistic values using the Faker.js library.
 * 
 * @example
 * const generator = new FakerDataGenerator();
 * const user = generator.generateUser();
 * console.log(user.email); // realistic email like john.doe@gmail.com
 */
export class FakerDataGenerator {

  // --------------------------------------------------------
  // Configuration Methods
  // --------------------------------------------------------

  /**
   * Set the locale for generated data
   * This affects names, addresses, phone formats, etc.
   * 
   * @param locale - Locale code (e.g., 'en_US', 'en_GB', 'de', 'fr')
   * 
   * @example
   * generator.setLocale('de'); // German names and addresses
   */
  setLocale(locale: string): void {
    faker.locale = locale;
  }

  /**
   * Set a seed for reproducible data
   * Same seed = same generated data (useful for debugging)
   * 
   * @param seed - Number to seed the random generator
   */
  setSeed(seed: number): void {
    faker.seed(seed);
  }

  // --------------------------------------------------------
  // User Data Methods
  // --------------------------------------------------------

  /**
   * Generate a complete fake user
   * 
   * @returns FakeUser object with realistic data
   */
  generateUser(): FakeUser {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

    return {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      username: faker.internet.username({ firstName, lastName }),
      password: faker.internet.password({ length: 12, memorable: false }),
      phone: faker.phone.number(),
      avatar: faker.image.avatar(),
      dateOfBirth: birthDate,
      age: new Date().getFullYear() - birthDate.getFullYear(),
    };
  }

  /**
   * Generate just an email address
   * 
   * @param provider - Optional email provider (gmail.com, yahoo.com, etc.)
   */
  generateEmail(provider?: string): string {
    return faker.internet.email({ provider });
  }

  /**
   * Generate a strong password
   *
   * @param length - Password length (default: 12)
   */
  generatePassword(length: number = 12): string {
    return faker.internet.password({ length, memorable: false });
  }

  // --------------------------------------------------------
  // Address Methods
  // --------------------------------------------------------

  /**
   * Generate a complete fake address
   *
   * @returns FakeAddress object
   */
  generateAddress(): FakeAddress {
    return {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    };
  }

  // --------------------------------------------------------
  // Company/Business Methods
  // --------------------------------------------------------

  /**
   * Generate fake company information
   *
   * @returns FakeCompany object
   */
  generateCompany(): FakeCompany {
    const companyName = faker.company.name();
    return {
      name: companyName,
      catchPhrase: faker.company.catchPhrase(),
      industry: faker.company.buzzNoun(),
      website: faker.internet.url(),
      email: faker.internet.email({ provider: 'company.com' }),
      phone: faker.phone.number(),
    };
  }

  // --------------------------------------------------------
  // E-Commerce / Product Methods
  // --------------------------------------------------------

  /**
   * Generate fake product data
   * Great for testing e-commerce applications
   *
   * @returns FakeProduct object
   */
  generateProduct(): FakeProduct {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
      category: faker.commerce.department(),
      image: faker.image.url(),
      inStock: faker.datatype.boolean(),
      quantity: faker.number.int({ min: 0, max: 100 }),
    };
  }

  /**
   * Generate multiple products
   *
   * @param count - Number of products to generate
   */
  generateProducts(count: number): FakeProduct[] {
    return Array.from({ length: count }, () => this.generateProduct());
  }

  // --------------------------------------------------------
  // Payment / Credit Card Methods
  // --------------------------------------------------------

  /**
   * Generate fake credit card data
   * NOTE: These are fake numbers for testing only!
   *
   * @returns FakeCreditCard object
   */
  generateCreditCard(): FakeCreditCard {
    return {
      number: faker.finance.creditCardNumber(),
      cvv: faker.finance.creditCardCVV(),
      expiryDate: `${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0')}/${faker.number.int({ min: 25, max: 30 })}`,
      cardType: faker.finance.creditCardIssuer(),
      holderName: faker.person.fullName(),
    };
  }

  // --------------------------------------------------------
  // Miscellaneous Useful Methods
  // --------------------------------------------------------

  /**
   * Generate a random date in the past
   *
   * @param days - How many days in the past (default: 30)
   */
  generatePastDate(days: number = 30): Date {
    return faker.date.recent({ days });
  }

  /**
   * Generate a random date in the future
   *
   * @param days - How many days in the future (default: 30)
   */
  generateFutureDate(days: number = 30): Date {
    return faker.date.soon({ days });
  }

  /**
   * Generate a paragraph of lorem ipsum text
   *
   * @param sentences - Number of sentences (default: 3)
   */
  generateParagraph(sentences: number = 3): string {
    return faker.lorem.paragraph(sentences);
  }

  /**
   * Generate a UUID (unique identifier)
   */
  generateUUID(): string {
    return faker.string.uuid();
  }

  /**
   * Generate a random number in range
   *
   * @param min - Minimum value
   * @param max - Maximum value
   */
  generateNumber(min: number, max: number): number {
    return faker.number.int({ min, max });
  }

  /**
   * Generate a random boolean (true/false)
   */
  generateBoolean(): boolean {
    return faker.datatype.boolean();
  }

  /**
   * Generate an array of items using a generator function
   *
   * @param count - Number of items
   * @param generator - Function to generate each item
   */
  generateArray<T>(count: number, generator: () => T): T[] {
    return Array.from({ length: count }, generator);
  }
}

