import React from 'react';
import { render } from '@testing-library/react'
import HomePage from '../pages/HomePage';
import store from '../store/Store';
import { BrowserRouter as Router } from 'react-router-dom';

const puppeteer = require('puppeteer');


describe('HomePage', () => {

  it('Create snapshot of HomePage', () => {
    const container = render(
      <Router><HomePage store={store} /></Router>
    )
    expect(container).toMatchSnapshot();
  });


  test('Link click correctly', async () => {
	let browser = await puppeteer.launch({
	  headless: false,
	  slowMo:350
	});
	let page = await browser.newPage();

	page.emulate({
	  viewport: {
		width: 500,
		height: 2400
	  },
	  userAgent: ''
	});

	await page.goto('http://localhost:3000/');
	await page.waitForSelector('.link');

	await page.click('.link')

	browser.close();
  }, 30000);
});

