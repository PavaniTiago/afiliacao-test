import { ApiError } from '@/lib/api/fetch';

describe('ApiError', () => {
  it('should create an ApiError with message and status code', () => {
    const error = new ApiError('Not found', 404);
    
    expect(error.message).toBe('Not found');
    expect(error.statusCode).toBe(404);
    expect(error.name).toBe('ApiError');
  });

  it('should create an ApiError with validation errors', () => {
    const errors = {
      email: ['Email is required', 'Email must be valid'],
      name: ['Name is required'],
    };
    
    const error = new ApiError('Validation failed', 400, errors);
    
    expect(error.message).toBe('Validation failed');
    expect(error.statusCode).toBe(400);
    expect(error.errors).toEqual(errors);
  });

  it('should be an instance of Error', () => {
    const error = new ApiError('Server error', 500);
    
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ApiError);
  });
});

