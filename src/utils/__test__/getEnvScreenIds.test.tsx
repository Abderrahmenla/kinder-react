import { EnvBasedIdProps, EnvType, getEnvScreenIds } from '@/utils/getEnvScreenIds';

const DEV_MOBILE_ID = 1;
const DEV_DESKTOP_ID = 2;
const STAGE_MOBILE_ID = 3;
const STAGE_DESKTOP_ID = 4;
const PROD_MOBILE_ID = 5;
const PROD_DESKTOP_ID = 6;
const UNSUPPORTED_ERROR = 'Unsupported environment: invalid';

describe('getEnvScreenIds', () => {
  const ORINGAL_ENV = process.env;

  afterEach(() => (process.env = ORINGAL_ENV));

  const COMPLETE_ENVS: EnvBasedIdProps = {
    dev: { mobileId: DEV_MOBILE_ID, desktopId: DEV_DESKTOP_ID },
    stage: { mobileId: STAGE_MOBILE_ID, desktopId: STAGE_DESKTOP_ID },
    prod: { mobileId: PROD_MOBILE_ID, desktopId: PROD_DESKTOP_ID }
  };

  const ENVS_WITHOUT_DEV: EnvBasedIdProps = {
    prod: { mobileId: PROD_MOBILE_ID, desktopId: PROD_DESKTOP_ID }
  };

  const ENVS_WITHOUT_STAGE: EnvBasedIdProps = {
    dev: { mobileId: DEV_MOBILE_ID, desktopId: DEV_DESKTOP_ID },
    prod: { mobileId: PROD_MOBILE_ID, desktopId: PROD_DESKTOP_ID }
  };

  const ENVS_WITHOUT_PROD: EnvBasedIdProps = {
    dev: { mobileId: DEV_MOBILE_ID, desktopId: DEV_DESKTOP_ID },
    stage: { mobileId: STAGE_MOBILE_ID, desktopId: STAGE_DESKTOP_ID }
  };

  it('returns screenIds for dev environment', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'dev' };
    expect(getEnvScreenIds(COMPLETE_ENVS)).toEqual({
      mobileId: DEV_MOBILE_ID,
      desktopId: DEV_DESKTOP_ID
    });
  });

  it('returns screenIds for dev environment with "localhost" alias', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'localhost' };
    expect(getEnvScreenIds(COMPLETE_ENVS)).toEqual({
      mobileId: DEV_MOBILE_ID,
      desktopId: DEV_DESKTOP_ID
    });
  });

  it('returns screenIds for dev environment with "development" alias', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'development' };
    expect(getEnvScreenIds(COMPLETE_ENVS)).toEqual({
      mobileId: DEV_MOBILE_ID,
      desktopId: DEV_DESKTOP_ID
    });
  });

  it('returns null for dev environment when dev is not indicated', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'dev' };
    expect(getEnvScreenIds(ENVS_WITHOUT_DEV)).toBeNull();
  });

  it('returns screenIds for dev environment when stage is not indicated', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'dev' };
    expect(getEnvScreenIds(ENVS_WITHOUT_STAGE)).toEqual({
      mobileId: DEV_MOBILE_ID,
      desktopId: DEV_DESKTOP_ID
    });
  });

  it('returns screenIds for dev environment when prod is not indicated', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'dev' };
    expect(getEnvScreenIds(ENVS_WITHOUT_PROD)).toEqual({
      mobileId: DEV_MOBILE_ID,
      desktopId: DEV_DESKTOP_ID
    });
  });

  it('returns screenIds for stage environment', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'stage' };
    expect(getEnvScreenIds(COMPLETE_ENVS)).toEqual({
      mobileId: STAGE_MOBILE_ID,
      desktopId: STAGE_DESKTOP_ID
    });
  });

  it('returns screenIds for stage environment with "test" alias', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'test' };
    expect(getEnvScreenIds(COMPLETE_ENVS)).toEqual({
      mobileId: STAGE_MOBILE_ID,
      desktopId: STAGE_DESKTOP_ID
    });
  });

  it('returns null for stage environment when stage is not indicated', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'stage' };
    expect(getEnvScreenIds(ENVS_WITHOUT_STAGE)).toBeNull();
  });

  it('returns screenIds for stage environment when prod is not indicated', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'test' };
    expect(getEnvScreenIds(ENVS_WITHOUT_PROD)).toEqual({
      mobileId: STAGE_MOBILE_ID,
      desktopId: STAGE_DESKTOP_ID
    });
  });

  it('returns screenIds for prod environment', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'prod' };
    expect(getEnvScreenIds(COMPLETE_ENVS)).toEqual({
      mobileId: PROD_MOBILE_ID,
      desktopId: PROD_DESKTOP_ID
    });
  });

  it('returns screenIds for prod environment with "production" alias', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'production' };
    expect(getEnvScreenIds(COMPLETE_ENVS)).toEqual({
      mobileId: PROD_MOBILE_ID,
      desktopId: PROD_DESKTOP_ID
    });
  });

  it('returns screenIds for prod environment when stage is not indicated', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'prod' };
    expect(getEnvScreenIds(ENVS_WITHOUT_STAGE)).toEqual({
      mobileId: PROD_MOBILE_ID,
      desktopId: PROD_DESKTOP_ID
    });
  });

  it('returns null for prod environment when prod is not indicated', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'prod' };
    expect(getEnvScreenIds(ENVS_WITHOUT_PROD)).toBeNull();
  });

  it('throws an error for unsupported environment', () => {
    process.env = { ...ORINGAL_ENV, NEXT_PUBLIC_ENVIRONMENT: 'invalid' as EnvType };
    expect(() => getEnvScreenIds(COMPLETE_ENVS)).toThrow(UNSUPPORTED_ERROR);
  });
});
