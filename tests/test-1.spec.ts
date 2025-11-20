import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost/intouch-base/rest/nlogin');
  await page.getByRole('textbox', { name: 'Wachtwoord' }).click();
  await page.getByRole('textbox', { name: 'Wachtwoord' }).fill('Test1234');
  await page.locator('body').click();
  await page.getByRole('button', { name: 'Log in om door te gaan' }).click();
  //Login completed 
  //Navigating to the Obserrvation creation 

  await page.locator('#menu_observations').click();
  await page.getByRole('link', { name: 'GAS 4/' }).click();
  await page.getByRole('link', { name: '  Vaststelling aanmaken' }).click();

  //Start creating the observation

  await page.getByTestId('gas4-wizard-submitter-unit').getByRole('button').click();
  await page.getByText('intouchgas4_duras').click();
  await page.getByTestId('gas4-wizard-submitter-submitter').getByRole('button').click();
  await page.getByRole('option', { name: 'Service Owner' }).click();
  await page.getByTestId('wizard-next-button').click();
//Completed step 1 and proceeding to step 2

await page.getByRole('button', { name: 'Kies datum' }).click();
await page.getByText('17').click();
await page.locator('#articleTypeId').click();
await page.getByRole('button', { name: 'dropdown trigger' }).click();
await page.getByRole('button', { name: 'dropdown trigger' }).click();
await page.getByRole('option', { name: 'GASP Politie' }).click();
await page.getByTestId('gas4-wizard-observation-article').getByRole('button').click();
await page.getByRole('option', { name: '!nl! - 5+70.2.1.3°+E -[VI]' }).click();
await page.getByTestId('gas4-wizard-observation-street').getByRole('button').click();
await page.getByRole('option', { name: 'Duraslaan' }).click();
await page.getByTestId('gas4-wizard-observation-observationDescription').getByRole('textbox', { name: 'Beschrijving' }).click();
await page.getByTestId('gas4-wizard-observation-observationDescription').getByRole('textbox', { name: 'Beschrijving' }).fill('Test');
await page.getByTestId('wizard-next-button').click();
//Step 2 completed and moving to step 3 in the wizard 


await page.getByRole('textbox', { name: 'Kenteken' }).click();
await page.getByRole('textbox', { name: 'Kenteken' }).fill('1');
await page.getByRole('textbox', { name: 'Kenteken' }).click();
await page.getByRole('textbox', { name: 'Kenteken' }).fill('1PTC125');
await page.getByRole('combobox', { name: 'Land' }).click();
await page.getByRole('combobox', { name: 'Land' }).fill('bel');
await page.getByRole('option', { name: 'België' }).click();
await page.getByTestId('wizard-next-button').click();
//Completed step 3 and moving to step 4 in the wizard 

await page.getByTestId('wizard-create-button').click();
//Completed step 4 and moving to overview page 

await page.getByRole('link', { name: ' Overzicht' }).click();
//Select observation from the list 

await page.getByRole('link', { name: ' 1 Persoonsgegevens' }).click();
//Select the observation and add personal information 

await page.locator('td > .checkbox > label > .fa').first().click();
await page.getByRole('button', { name: 'Actie' }).click();
await page.getByRole('button', { name: 'Persoonsgegevens toevoegen' }).click();
await page.getByRole('button', { name: 'Toepassen' }).click();
await page.getByRole('button', { name: ' Goedgekeurd' }).click();

//Move to overview again and mark the observation as received 

await page.getByRole('link', { name: ' Overzicht' }).click();
await page.getByRole('link', { name: ' 1 Neem GAS-vaststellingen' }).click();
await page.locator('td > .checkbox > label > .fa').first().click();
await page.getByRole('button', { name: 'Actie' }).click();
await page.getByRole('button', { name: 'Markeer als ontvangen' }).click();
await page.getByRole('button', { name: 'Toepassen' }).click();
await page.locator('#select_GAS_OFFICER').selectOption('1000');
await page.getByText('Opslaan').click();

//Move to files and select the observation 

await page.locator('#menu_fines').click();
await page.getByRole('link', { name: 'GAS parkeren' }).click();
await page.locator('.list-data-row.list-data-row-hover > td > .checkbox > label > .fa').first().click();
await page.getByRole('link', { name: 'GAS/P/DU/2025/0003' }).click(); //This should be dynamic 
//Select the time line tab 

await page.getByRole('link', { name: 'Tijdslijn' }).click();

//Click adding document and create a document 

await page.getByRole('button', { name: ' Toevoegen' }).click();
await page.getByText('Maak document aan').nth(2).click();
await page.locator('#sel_').selectOption('119');
await page.getByRole('button', { name: '   Opslaan' }).click();
await page.getByRole('button', { name: ' Goedgekeurd' }).click();

//Send document to SPEOS 

await page.getByRole('button', { name: 'Verzenden via Speos' }).click();
await page.getByRole('button', { name: ' Goedgekeurd' }).click();



});