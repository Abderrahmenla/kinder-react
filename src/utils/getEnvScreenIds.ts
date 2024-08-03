export type EnvType = 'dev' | 'stage' | 'prod';
export type ScreenIds = { mobileId: number; desktopId: number };

export type EnvBasedIdProps = {
  dev?: ScreenIds;
  stage?: ScreenIds;
  prod?: ScreenIds;
};

export function getEnvScreenIds(envIds: EnvBasedIdProps): ScreenIds | null {
  const environmentAliasMapping: Record<string, EnvType> = {
    localhost: 'dev',
    development: 'dev',
    test: 'stage',
    production: 'prod'
  };

  const currentEnv = process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod';
  const mappedEnv = environmentAliasMapping[currentEnv] || currentEnv;

  // handle scenarios when dev, stage, and/or prod IDs are not (yet) available
  if (['dev', 'stage', 'prod'].includes(mappedEnv) && !Object.keys(envIds).includes(mappedEnv)) {
    return null;
  }

  if (Object.keys(envIds).includes(mappedEnv)) {
    return envIds[mappedEnv] || { mobileId: 0, desktopId: 0 };
  } else {
    throw new Error(`Unsupported environment: ${mappedEnv}`);
  }
}
