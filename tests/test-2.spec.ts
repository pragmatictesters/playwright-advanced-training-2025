import { test, expect } from '@playwright/test';
import { SimpleFakerHelper } from './utils/helpers/simple-faker-helper';//Import the helper class
import MailosaurClient from 'mailosaur';

const senderEmail = 'noreply@example.mailosaur.net';//4. Sender email address
const API_KEY = 'bfKazxly2lHEWEj8mc0gvyR6kuWAZ1fL';//Mailosaur API Key
const SERVER_ID = 'o6iplvcd';//Mailosaur Server ID
const SERVER_NAME = 'o6iplvcd.mailosaur.net';//Mailosaur Server Name
const mailosaur = new MailosaurClient(API_KEY); //1. Create a new instance of the MailosaurClient


test.beforeEach(async ({ page }) => {
  await mailosaur.messages.deleteAll(SERVER_ID); //2. Delete all messages before each test
  await page.goto('https://example.mailosaur.com');
});

test.afterEach(async ({ page }) => {
 // await mailosaur.messages.deleteAll(SERVER_ID); //2. Delete all messages before each test
});

test('verify signup with account activation', async ({ page }) => {
  const helper = new SimpleFakerHelper() //Create an instance of the helper class
  const firstName = helper.getFirstName(); //
  const lastName = helper.getLastName();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${SERVER_NAME}`;

  const emailAddress = mailosaur.servers.generateEmailAddress(SERVER_ID);
  console.log(emailAddress);

  await page.getByRole('link', { name: 'Signup' }).click();

  await page.getByRole('textbox', { name: 'John' }).click();
  await page.getByRole('textbox', { name: 'John' }).fill(firstName);
  await page.getByRole('textbox', { name: 'John' }).press('Tab');
  await page.getByRole('textbox', { name: 'Smith' }).fill(lastName);
  await page.getByRole('textbox', { name: 'Smith' }).press('Tab');
  await page.getByRole('textbox', { name: 'someone@example.com' }).fill(email);
  await page.getByText('First name: Last name: Email').click();
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('main')).toContainText('An email has now been sent.');

  const message = await mailosaur.messages.get(SERVER_ID, 
    {sentTo: email, sentFrom: senderEmail
    }, {
      timeout: 60000
    }); //3. Get the message from mailosaur
  expect(message.from).toBeDefined();
  expect(message.from![0].email).toEqual(senderEmail);//4. Verify the email is from noreply@example.mailosaur.net
  expect(message.subject).toEqual('Welcome to ACME Product');


  const mailosaurLink = message.html?.links?.[1].href;
  console.log(mailosaurLink);
  
  const activationCode = message.html?.links?.[0].href;//Get the activation code from the email
  console.log(activationCode);
  await page.goto(activationCode!); //5. Click the activation link
  await expect(page.getByRole('main')).toContainText('Your fictional account has now been activated.'); //6. Verify the account is activated

});

