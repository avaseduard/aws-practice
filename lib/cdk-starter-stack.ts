import * as cdk from 'aws-cdk-lib'
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

// L3 bucket constructor
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id)
    //
    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(expiration),
        },
      ],
    })
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Create S3 bucket in 3 modes
    // L1 constructor
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [
          {
            expirationInDays: 1,
            status: 'Enabled',
          },
        ],
      },
    })
    
    // L2 constructor
    // CDK deploy parameter
    const duration = new cdk.CfnParameter(this, 'duration', {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: 'Number'
    })
    // Bucket
    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(duration.valueAsNumber),
        },
      ],
    })
    // Name
    new cdk.CfnOutput(this, 'MyL2BucketName', {
      value: myL2Bucket.bucketName,
    })

    // L3 constructor
    new L3Bucket(this, 'MyL3Bucket', 3)
  }
}
