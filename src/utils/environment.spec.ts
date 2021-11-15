import { accessEnvironmentVariable } from './environment';

describe(__filename, () => {
   describe('accessEnvironmentVariable', () => {
      process.env.DEV = 'dev';
      process.env.PROD = 'prod';

      test('Not production environment', () => {
         process.env.NODE_ENV = 'whatever';
         expect(accessEnvironmentVariable('PROD', 'DEV')).toEqual('dev');
      });

      test('Production environment', () => {
         process.env.NODE_ENV = 'production';
         expect(accessEnvironmentVariable('PROD', 'DEV')).toEqual('prod');
      });

      test('Undefined variable', () => {
         process.env.NODE_ENV = 'production';
         expect(() => accessEnvironmentVariable('NPROD', 'DEV')).toThrow();
      });

      test('Undefined variables', () => {
         process.env.NODE_ENV = 'production';
         expect(() => accessEnvironmentVariable('NPROD', 'NDEV')).toThrow();
      });
   });
});
