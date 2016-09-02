import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import QuestionnaireApp, {computeScore, getTier} from '../src/App.js';

const selections = {
  q001: "a001",
  q002: "a004"
}

const questionnaireConfig = {
  title: "Questionnaire Title",
  description: "Description text",
  questions: [
    {
      id: "q001",
      prompt: "The first question",
      options: [
        {
          id: "a001",
          text: "Option 1",
          points: 6
        },
        {
          id: "a002",
          text: "Option 2",
          points: 53
        },
        {
          id: "a003",
          text: "Option 3",
          points: 5
        }
      ]
    },
    {
      id: "q002",
      prompt: "The second question",
      options: [
        {
          id: "a004",
          text: "Option 5",
          points: 12
        },
        {
          id: "a002",
          text: "Option 6",
          points: 32
        }
      ]
    }
  ],
  resultsMessage: "VIEW RESULTS"
};

const resultsConfig = {
  scoreRubric: [
    {
      threshold: 6,
      headline: '',
      description: ''
    },
    {
      threshold: 23,
      headline: '',
      description: ''
    },
    {
      threshold: 0,
      headline: '',
      description: ''
    },
    {
      threshold: 72,
      headline: '',
      description: ''
    }
  ],
  supportRubric: [
    {
      threshold: 4,
      headline: '',
      description: '',
      callback: mockApi,
      results: 3
    }
  ]
};

const mockApi = () =>{
    return [
      {
        id: 's001',
        name: 'Specialist 1',
        domains: ['Psychiatry'],
        location: 'Queens, NY',
        image: ''
      },
      {
        id: 's002',
        name: 'Specialist 2',
        domains: ['Psychiatry', 'Mamasville'],
        location: 'Staten Island, NY',
        image: ''
      },
      {
        id: 's003',
        name: 'Specialist 3',
        domains: ['Psychiatry'],
        location: 'Manhattan, NY',
        image: ''
      }
    ];
};

const app = TestUtils.renderIntoDocument(
  <QuestionnaireApp questionnaireConfig={questionnaireConfig} resultsConfig={resultsConfig} />
)
const appNode = ReactDOM.findDOMNode(app);

// computeScore function
it('sums points for given option selections', () => {
  const rubric = questionnaireConfig['questions'];
  const computed = computeScore(rubric, selections);
  expect(computed).toBe(18);
});

// getTier function
it('returns the correct object for given value', () => {
  const tiers = resultsConfig['scoreRubric'];
  const tierObj = getTier(35, tiers);
  expect(tierObj).toBe(tiers[1]);
});

it('renders questionnaire page', () => {
  const appNode = ReactDOM.findDOMNode(app);
  expect(appNode.querySelectorAll('.questionnaire-page').length).toBe(1);
  expect(appNode.querySelectorAll('.question').length).toBe(2);
});
