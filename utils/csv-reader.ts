import fs from 'fs';
import path from 'path';

/**
 * Interface for CSV data row
 */
export interface CSVRow {
  [key: string]: string;
}

/**
 * Read and parse CSV file
 * @param filename - Name of the CSV file (relative to test-data/orangehrm/)
 * @returns Array of objects where keys are column headers
 * 
 * @example
 * // CSV file: invalid-logins.csv
 * // username,password,expectedError
 * // Admin,wrongpass,Invalid credentials
 * 
 * const data = readCSV('invalid-logins.csv');
 * // Returns: [{ username: 'Admin', password: 'wrongpass', expectedError: 'Invalid credentials' }]
 */
export function readCSV(filename: string): CSVRow[] {
  const csvPath = path.join(__dirname, '../test-data/orangehrm', filename);
  
  // Check if file exists
  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found: ${csvPath}`);
  }
  
  // Read file content
  const content = fs.readFileSync(csvPath, 'utf-8');
  
  // Split into lines and filter empty lines
  const lines = content.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    throw new Error(`CSV file is empty: ${filename}`);
  }
  
  // First line is headers
  const headers = lines[0].split(',').map(h => h.trim());
  
  if (headers.length === 0) {
    throw new Error(`CSV file has no headers: ${filename}`);
  }
  
  // Parse remaining lines into objects
  const data: CSVRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row: CSVRow = {};
    
    headers.forEach((header, index) => {
      // Trim values and handle empty strings
      row[header] = values[index]?.trim() || '';
    });
    
    data.push(row);
  }
  
  return data;
}

/**
 * Read CSV file with custom delimiter
 * @param filename - Name of the CSV file
 * @param delimiter - Custom delimiter (default: ',')
 * @returns Array of objects
 */
export function readCSVWithDelimiter(filename: string, delimiter: string = ','): CSVRow[] {
  const csvPath = path.join(__dirname, '../test-data/orangehrm', filename);
  
  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found: ${csvPath}`);
  }
  
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    throw new Error(`CSV file is empty: ${filename}`);
  }
  
  const headers = lines[0].split(delimiter).map(h => h.trim());
  const data: CSVRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter);
    const row: CSVRow = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || '';
    });
    
    data.push(row);
  }
  
  return data;
}

