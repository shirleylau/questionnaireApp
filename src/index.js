import React from 'react';
import ReactDOM from 'react-dom';
import QuestionnaireApp from './App';
import './index.css';

const mockApi = () =>{
    return specialists;
};

const questionnaireConfig = {
  title: "Patient Health Questionnaire (PHQ-9)",
  description: "Over the last two weeks, how often have you been bothered by any of the following problems?",
  questions: [
    {
      id: "q001",
      prompt: "Little interest or pleasure in doing things?",
      options: [
        {
          id: "a001",
          text: "Not at all",
          points: 0
        },
        {
          id: "a002",
          text: "Several days",
          points: 1
        },
        {
          id: "a003",
          text: "More than half the days",
          points: 2
        },
        {
          id: "a004",
          text: "Nearly every day",
          points: 3
        }
      ]
    },
    {
      id: "q002",
      prompt: "Feeling down, depressed, or hopeless?",
      options: [
        {
          id: "a001",
          text: "Not at all",
          points: 0
        },
        {
          id: "a002",
          text: "Several days",
          points: 1
        },
        {
          id: "a003",
          text: "More than half the days",
          points: 2
        },
        {
          id: "a004",
          text: "Nearly every day",
          points: 3
        }
      ]
    },
    {
      id: "q003",
      prompt: "Trouble falling or staying asleep, or sleeping too much?",
      options: [
        {
          id: "a001",
          text: "Not at all",
          points: 0
        },
        {
          id: "a002",
          text: "Several days",
          points: 1
        },
        {
          id: "a003",
          text: "More than half the days",
          points: 2
        },
        {
          id: "a004",
          text: "Nearly every day",
          points: 3
        }
      ]
    }
  ],
  resultsMessage: "VIEW RESULTS"
};

const resultsConfig = {
  scoreRubric: [
    {
      threshold: 5,
      headline: 'mild depression',
      description: 'You do not appear to be exibiting any signs of depression.'
    },
    {
      threshold: 20,
      headline: 'severe depression',
      description: 'You do not appear to be exibiting any signs of depression.'
    },
    {
      threshold: 0,
      headline: 'no depression',
      description: 'You do not appear to be exibiting any signs of depression.'
    },
    {
      threshold: 15,
      headline: 'moderately severe depression',
      description: 'You do not appear to be exibiting any signs of depression.'
    },
    {
      threshold: 10,
      headline: 'moderate depression',
      description: 'You do not appear to be exibiting any signs of depression.'
    }
  ],
  supportRubric: [
    {
      threshold: 4,
      headline: 'Contact a nearby specialist.',
      description: 'Untreated depression can be... Here are some resources.',
      callback: mockApi,
      results: 3
    }
  ]
};

const specialists = [
  {
    id: 's001',
    name: 'Christopher Turk',
    domains: ['Psychiatry'],
    location: 'Queens, NY',
    image: 'http://vignette3.wikia.nocookie.net/scrubs/images/9/92/Square_Turk.png/revision/latest?cb=20110924074716'
  },
  {
    id: 's002',
    name: 'John Dorian',
    domains: ['Psychiatry', 'Mamasville'],
    location: 'Staten Island, NY',
    image: 'https://s-media-cache-ak0.pinimg.com/236x/25/8e/b9/258eb97071206129113d36c7686b64b8.jpg'
  },
  {
    id: 's003',
    name: 'Elliot Reid',
    domains: ['Psychiatry'],
    location: 'Manhattan, NY',
    image: 'http://vignette3.wikia.nocookie.net/scrubs/images/6/69/Square_Elliot.png/revision/latest?cb=20110924074652'
  }
];

ReactDOM.render(
  <QuestionnaireApp questionnaireConfig={questionnaireConfig} resultsConfig={resultsConfig} />,
  document.getElementById('root')
);
