import * as path from 'path';
import { browser } from 'protractor';
import { Config } from '@stryker-mutator/api/config';
import HtmlReporter from '../../src/HtmlReporter';
import EventPlayer from '../helpers/EventPlayer';
import { factory } from '@stryker-mutator/test-helpers';

export const baseDir = path.join(__dirname, '../../reports/mutation/uiTest');

before(() => {
  browser.ignoreSynchronization = true;
  const config = new Config();
  config.set({ htmlReporter: { baseDir } });
  const reporter = new HtmlReporter(config, factory.logger());
  return new EventPlayer('testResources/mathEvents')
    .replay(reporter)
    .then(() => reporter.wrapUp());
});
