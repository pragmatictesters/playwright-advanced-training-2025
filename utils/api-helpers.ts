import { APIRequestContext, expect } from '@playwright/test';

/**
 * API Helper Utilities for restful-api.dev
 * 
 * This file provides reusable helper functions for API testing:
 * - Device CRUD operations
 * - Response validation
 * - Schema validation
 * - Bulk operations
 * 
 * Usage:
 * import { ApiHelpers } from './utils/api-helpers';
 * 
 * const helpers = new ApiHelpers(request);
 * const device = await helpers.createDevice("iPhone", { price: 999 });
 */

const BASE_URL = 'https://api.restful-api.dev';

export class ApiHelpers {
  constructor(private request: APIRequestContext) {}
  
  /**
   * Create a device
   * @param name Device name
   * @param data Device data object
   * @returns Created device object
   */
  async createDevice(name: string, data: any) {
    const response = await this.request.post(`${BASE_URL}/objects`, {
      data: { name, data }
    });
    
    expect(response.status()).toBe(200);
    const device = await response.json();
    
    console.log(`✅ Created device: ${name} (${device.id})`);
    return device;
  }
  
  /**
   * Get a device by ID
   * @param id Device ID
   * @returns Device object
   */
  async getDevice(id: string) {
    const response = await this.request.get(`${BASE_URL}/objects/${id}`);
    expect(response.status()).toBe(200);
    return await response.json();
  }
  
  /**
   * Update a device
   * @param id Device ID
   * @param name New device name
   * @param data New device data
   * @returns Updated device object
   */
  async updateDevice(id: string, name: string, data: any) {
    const response = await this.request.put(`${BASE_URL}/objects/${id}`, {
      data: { name, data }
    });
    
    expect(response.status()).toBe(200);
    const device = await response.json();
    
    console.log(`✅ Updated device: ${name} (${id})`);
    return device;
  }
  
  /**
   * Delete a device
   * @param id Device ID
   */
  async deleteDevice(id: string) {
    const response = await this.request.delete(`${BASE_URL}/objects/${id}`);
    expect(response.ok()).toBeTruthy();
    console.log(`✅ Deleted device: ${id}`);
  }
  
  /**
   * Validate device schema
   * @param device Device object to validate
   */
  validateDeviceSchema(device: any) {
    expect(device).toHaveProperty('id');
    expect(device).toHaveProperty('name');
    expect(device).toHaveProperty('data');
    
    expect(typeof device.id).toBe('string');
    expect(typeof device.name).toBe('string');
    expect(typeof device.data).toBe('object');
    
    console.log(`✅ Device schema is valid: ${device.name}`);
  }
  
  /**
   * Create multiple devices
   * @param devices Array of device data
   * @returns Array of created device objects
   */
  async createMultipleDevices(devices: Array<{ name: string; data: any }>) {
    const created = [];
    
    for (const device of devices) {
      const result = await this.createDevice(device.name, device.data);
      created.push(result);
    }
    
    console.log(`✅ Created ${created.length} devices`);
    return created;
  }
  
  /**
   * Delete multiple devices
   * @param ids Array of device IDs
   */
  async deleteMultipleDevices(ids: string[]) {
    for (const id of ids) {
      await this.deleteDevice(id);
    }
    
    console.log(`✅ Deleted ${ids.length} devices`);
  }
  
  /**
   * Verify device exists
   * @param id Device ID
   * @returns true if exists, false otherwise
   */
  async deviceExists(id: string): Promise<boolean> {
    const response = await this.request.get(`${BASE_URL}/objects/${id}`);
    return response.status() === 200;
  }
  
  /**
   * Wait for device to be created (polling)
   * @param id Device ID
   * @param maxAttempts Maximum number of attempts
   * @param delayMs Delay between attempts in milliseconds
   */
  async waitForDevice(id: string, maxAttempts = 10, delayMs = 500) {
    for (let i = 0; i < maxAttempts; i++) {
      if (await this.deviceExists(id)) {
        console.log(`✅ Device found: ${id}`);
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
    
    throw new Error(`Device not found after ${maxAttempts} attempts: ${id}`);
  }
}

/**
 * Standalone helper functions
 */

/**
 * Validate response status code
 */
export function validateStatus(response: any, expectedStatus: number) {
  expect(response.status()).toBe(expectedStatus);
}

/**
 * Validate JSON response structure
 */
export function validateJsonResponse(data: any, requiredFields: string[]) {
  for (const field of requiredFields) {
    expect(data).toHaveProperty(field);
  }
}

/**
 * Generate random device data
 */
export function generateRandomDevice() {
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
  const types = ['Phone', 'Tablet', 'Laptop', 'Watch', 'Headphones'];
  
  return {
    name: `Test ${types[Math.floor(Math.random() * types.length)]}`,
    data: {
      color: colors[Math.floor(Math.random() * colors.length)],
      price: Math.floor(Math.random() * 1000) + 500,
      inStock: Math.random() > 0.5
    }
  };
}

