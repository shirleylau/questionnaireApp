import React from "react";
import ReactDOM from "react-dom";
import QuestionnaireApp from "./App";
import "./index.css";

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
    },
    {
      id: "q004",
      prompt: "Feeling tired or having little energy?",
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
      id: "q005",
      prompt: "Poor appetite or overeating?",
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
      id: "q006",
      prompt: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
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
      id: "q007",
      prompt: "Trouble concentrating on things, such as reading the newspaper or watching television?",
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
      id: "q008",
      prompt: "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
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
      id: "q009",
      prompt: "Thoughts that you would be better off dead, or of hurting yourself in some way?",
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

// Rubrics reflect tier system, so if a score
const resultsConfig = {
  scoreRubric: [
    {
      threshold: 5,
      headline: "mild depression",
      description: "You appear to be exibiting signs of mild depression."
    },
    {
      threshold: 20,
      headline: "severe depression",
      description: "You appear to be exibiting signs of severe depression. Please consider contacting any of the following psychiatric specialists for further support."
    },
    {
      threshold: 0,
      headline: "no depression",
      description: "You do not appear to be exibiting any signs of depression."
    },
    {
      threshold: 15,
      headline: "moderately severe depression",
      description: "You appear to be exibiting signs of moderately severe depression. Please consider contacting any of the following psychiatric specialists for further support."
    },
    {
      threshold: 10,
      headline: "moderate depression",
      description: "You appear to be exibiting signs of moderate depression. Please consider contacting any of the following psychiatric specialists for further support."
    }
  ],
  supportRubric: [
    {
      threshold: 10,
      callback: mockApi
    }
  ]
};

const specialists = [
  {
    id: "s001",
    name: "Christopher Turk",
    domains: ["Psychiatry"],
    location: "Queens, NY",
    image: "http://vignette3.wikia.nocookie.net/scrubs/images/9/92/Square_Turk.png/revision/latest?cb=20110924074716"
  },
  {
    id: "s002",
    name: "John Dorian",
    domains: ["Psychiatry"],
    location: "Staten Island, NY",
    image: "https://s-media-cache-ak0.pinimg.com/236x/25/8e/b9/258eb97071206129113d36c7686b64b8.jpg"
  },
  {
    id: "s003",
    name: "Elliot Reid",
    domains: ["Psychiatry"],
    location: "Manhattan, NY",
    image: "http://vignette3.wikia.nocookie.net/scrubs/images/6/69/Square_Elliot.png/revision/latest?cb=20110924074652"
  }
];

ReactDOM.render(
  <QuestionnaireApp questionnaireConfig={questionnaireConfig} resultsConfig={resultsConfig} />,
  document.getElementById("root")
);
