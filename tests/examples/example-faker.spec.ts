import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';


test('should generate random data with faker', async ({ page }) => {
  // Generate random data using Faker
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const phone = faker.phone.number();
  const password = faker.internet.password();
  const date = faker.date.birthdate();
  const jobTitle = faker.person.jobTitle();
  const creditCard = faker.finance.creditCardNumber();
  const postalCode = faker.location.zipCode();
  const username = faker.internet.username(); 



  // Log the generated data for debugging
  console.log('Generated Data:');
  console.log(`   First Name: ${firstName}`);
  console.log(`   Last Name: ${lastName}`);
  console.log(`   Email: ${email}`);
  console.log(`   Phone: ${phone}`);
  console.log(`   Password: ${password}`);
  console.log(`   Date: ${date}`);
  console.log(`   Job Title: ${jobTitle}`);
  console.log(`   Credit Card: ${creditCard}`);
  console.log(`   Postal Code: ${postalCode}`);
  console.log(`   Username: ${username}`);
});
