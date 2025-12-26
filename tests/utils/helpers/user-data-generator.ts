/**
 * User Data Generator Helper Class
 * ================================
 * 
 * This helper class generates random user data for testing purposes.
 * It demonstrates how to create reusable utility classes in Playwright projects.
 * 
 * WHY USE HELPER CLASSES?
 * - Avoid code duplication across tests
 * - Keep test files clean and focused on test logic
 * - Easy to maintain - update in one place
 * - Consistent data generation across all tests
 * 
 * @author Training Team
 * @version 1.0.0
 */

// ============================================================
// SECTION 1: TYPE DEFINITIONS (TypeScript Interfaces)
// ============================================================

/**
 * Interface defining the structure of a User object.
 * This ensures type safety - TypeScript will warn you if you
 * try to use properties that don't exist.
 */
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  age: number;
  phone: string;
}

/**
 * Interface for Address data
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/**
 * Combined user profile with address
 */
export interface UserProfile extends User {
  address: Address;
}

// ============================================================
// SECTION 2: HELPER CLASS DEFINITION
// ============================================================

/**
 * UserDataGenerator - Main helper class for generating test data
 * 
 * USAGE EXAMPLE:
 * ```typescript
 * const generator = new UserDataGenerator();
 * const user = generator.generateUser();
 * console.log(user.email); // random email
 * ```
 */
export class UserDataGenerator {
  
  // --------------------------------------------------------
  // Private Helper Methods (internal use only)
  // --------------------------------------------------------

  /**
   * Generates a random string of specified length
   * Private method - only used internally by this class
   * 
   * @param length - Number of characters to generate
   * @returns Random alphabetic string
   */
  private generateRandomString(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generates a random number within a range
   * 
   * @param min - Minimum value (inclusive)
   * @param max - Maximum value (inclusive)
   * @returns Random number in range
   */
  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Gets current timestamp for unique identifiers
   */
  private getTimestamp(): string {
    return Date.now().toString().slice(-6);
  }

  // --------------------------------------------------------
  // Public Methods (available to use in tests)
  // --------------------------------------------------------

  /**
   * Generates a random first name
   * @returns Random first name from predefined list
   */
  generateFirstName(): string {
    const firstNames = [
      'John', 'Jane', 'Michael', 'Sarah', 'David',
      'Emily', 'Robert', 'Lisa', 'William', 'Emma',
      'James', 'Olivia', 'Daniel', 'Sophia', 'Matthew'
    ];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  }

  /**
   * Generates a random last name
   * @returns Random last name from predefined list
   */
  generateLastName(): string {
    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
      'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
      'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson'
    ];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  /**
   * Generates a unique email address
   * Uses timestamp to ensure uniqueness
   * 
   * @param domain - Optional email domain (default: test.com)
   * @returns Unique email address
   */
  generateEmail(domain: string = 'test.com'): string {
    const randomPart = this.generateRandomString(5);
    const timestamp = this.getTimestamp();
    return `user_${randomPart}_${timestamp}@${domain}`;
  }

  /**
   * Generates a unique username
   * @returns Unique username string
   */
  generateUsername(): string {
    const prefix = this.generateRandomString(4);
    const timestamp = this.getTimestamp();
    return `user_${prefix}_${timestamp}`;
  }

  /**
   * Generates a password meeting common requirements
   * - At least 8 characters
   * - Contains uppercase, lowercase, numbers, special chars
   *
   * @returns Strong password string
   */
  generatePassword(): string {
    const timestamp = this.getTimestamp();
    return `Test@${timestamp}!`;
  }

  /**
   * Generates a random phone number
   * Format: (XXX) XXX-XXXX
   *
   * @returns Formatted phone number string
   */
  generatePhone(): string {
    const areaCode = this.generateRandomNumber(100, 999);
    const prefix = this.generateRandomNumber(100, 999);
    const lineNumber = this.generateRandomNumber(1000, 9999);
    return `(${areaCode}) ${prefix}-${lineNumber}`;
  }

  /**
   * Generates a random age within realistic range
   *
   * @param min - Minimum age (default: 18)
   * @param max - Maximum age (default: 80)
   * @returns Random age number
   */
  generateAge(min: number = 18, max: number = 80): number {
    return this.generateRandomNumber(min, max);
  }

  /**
   * Generates a complete User object with all fields populated
   * This is the main method you'll use most often!
   *
   * @returns Complete User object with random data
   *
   * @example
   * const generator = new UserDataGenerator();
   * const user = generator.generateUser();
   * // user = { firstName: 'John', lastName: 'Smith', email: '...', ... }
   */
  generateUser(): User {
    const firstName = this.generateFirstName();
    const lastName = this.generateLastName();

    return {
      firstName,
      lastName,
      email: this.generateEmail(),
      username: this.generateUsername(),
      password: this.generatePassword(),
      age: this.generateAge(),
      phone: this.generatePhone(),
    };
  }

  /**
   * Generates a random Address object
   *
   * @returns Complete Address object
   */
  generateAddress(): Address {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];
    const streets = ['Main St', 'Oak Ave', 'Park Blvd', 'Maple Dr', 'Cedar Ln'];

    const index = Math.floor(Math.random() * cities.length);

    return {
      street: `${this.generateRandomNumber(100, 9999)} ${streets[index]}`,
      city: cities[index],
      state: states[index],
      zipCode: this.generateRandomNumber(10000, 99999).toString(),
      country: 'USA',
    };
  }

  /**
   * Generates a complete UserProfile with User data and Address
   *
   * @returns Complete UserProfile object
   */
  generateUserProfile(): UserProfile {
    return {
      ...this.generateUser(),
      address: this.generateAddress(),
    };
  }

  /**
   * Generates multiple users at once
   * Useful for bulk testing scenarios
   *
   * @param count - Number of users to generate
   * @returns Array of User objects
   *
   * @example
   * const users = generator.generateMultipleUsers(5);
   * // Returns array of 5 random users
   */
  generateMultipleUsers(count: number): User[] {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      users.push(this.generateUser());
    }
    return users;
  }
}

