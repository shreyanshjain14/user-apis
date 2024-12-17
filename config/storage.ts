import { registerAs } from '@nestjs/config';

export default registerAs('storage', () => {
  return {
    default: 'docs',
    disks: {
      docs: {
        driver: 's3',
        region: process.env.APP_AWS_REGION,
        profile: process.env.APP_ENV === 'local' ? process.env.APP_AWS_PROFILE : null,
        bucket: process.env.AWS_S3_DOCS_BUCKET,
      },
    },
  };
});
