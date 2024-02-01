#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import { CdkStarterStack } from '../lib/cdk-starter-stack'
import { PhotosStack } from '../lib/PhotosStack';
import { PhotosHandlerStack } from '../lib/PhotosHandlerStack';
import { BucketTagger } from './Tagger';

const app = new cdk.App();

// Bucket stack
const photosStack = new PhotosStack(app, 'PhotosStack');
// Lambda stack
new PhotosHandlerStack(app, 'PhotosHandlerStack', {
  targetBucketArn: photosStack.photosBucketArn,
});
// Tagger
const tagger = new BucketTagger('level', 'test');
// Aspects
cdk.Aspects.of(app).add(tagger);
