import { cn } from '@/lib/utils/cn';

describe('cn utility', () => {
  it('should merge class names', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toBe('base active');
  });

  it('should filter falsy values', () => {
    const result = cn('base', false && 'hidden', null, undefined, 'visible');
    expect(result).toBe('base visible');
  });

  it('should merge tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toBe('py-1 px-4');
  });

  it('should handle array of classes', () => {
    const result = cn(['class1', 'class2']);
    expect(result).toBe('class1 class2');
  });

  it('should handle object notation', () => {
    const result = cn({
      'class1': true,
      'class2': false,
      'class3': true,
    });
    expect(result).toBe('class1 class3');
  });

  it('should handle empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle mixed inputs', () => {
    const result = cn(
      'base',
      ['array-class'],
      { 'object-class': true, 'disabled': false }
    );
    expect(result).toBe('base array-class object-class');
  });
});

