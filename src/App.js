import 'babel-polyfill';
import React, { Component } from 'react';
import './App.css';

export const computeScore = (rubric, selections) => {
  let score = 0;
  rubric.forEach((question) => {
    const selectedOptionId = selections[question.id];
    const option = question.options.find(option => (
      option.id === selectedOptionId
    ));
    if (option) {
      score += (option['points'] || 0);
    }
  });
  return score;
};

export const getTier = (value, tiers) => {
  const thresholds = tiers
    .filter(tier => tier.threshold <= value)
    .sort((a, b) => a.threshold - b.threshold);
  return thresholds.pop();
};

export default class QuestionnaireApp extends Component {
  static propTypes = {
    questionnaireConfig: React.PropTypes.object.isRequired,
    resultsConfig: React.PropTypes.object.isRequired
  }
  constructor() {
    super();
    this.state = this.nullState();
    this.resetState = this.resetState.bind(this);
    this.setScore = this.setScore.bind(this);
  }
  nullState() {
    return {score: null};
  }
  setScore(selections) {
    const {questionnaireConfig: {questions}} = this.props;
    this.setState({score: computeScore(questions, selections)});
  }
  resetState() {
    this.setState(this.nullState());
  }
  render() {
    const {questionnaireConfig, resultsConfig} = this.props;
    const {score} = this.state;
    return (
      <div className='questionnaire-app'>
      {
        score === null
        ? <QuestionnairePage {...questionnaireConfig} onSubmit={this.setScore} />
        : <ResultsPage {...resultsConfig} score={score} onSubmit={this.resetState} />
      }
      </div>
    );
  }
}

class QuestionnairePage extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    description:React.PropTypes.string,
    questions: React.PropTypes.array.isRequired,
    resultsMessage: React.PropTypes.string,
    onSubmit: React.PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {selections: {}};
    this.isComplete = this.isComplete.bind(this);
    this.updateSelections = this.updateSelections.bind(this);
  }
  updateSelections(questionId, optionId) {
    const {selections} = this.state;
    selections[questionId] = optionId;
    this.setState({selections: selections});
  }
  isComplete() {
    const {questions} = this.props;
    const {selections} = this.state;
    return questions.every(q => !!selections[q.id]);
  }
  render() {
    const {title, description, questions, resultsMessage, onSubmit} = this.props;
    const {selections} = this.state;
    const complete = this.isComplete();
    return (
      <div className='questionnaire-page'>
        <div className='questionnaire-header'>
          <h2 className='blue-text'>{title}</h2>
          <p>{description}</p>
        </div>
        <div className='questionnaire-body'>
          {
            questions.map((question, i) => (
              <SingleSelectMultipleChoiceQuestion
                {...question}
                number={i + 1}
                onOptionSelect={this.updateSelections}
                key={question.id}
              />
            ))
          }
        </div>
        <div className='questionnaire-footer'>
          <div className='validation'></div>
          <div
            onClick={_e => complete && onSubmit(selections)}
            className={'btn primary btn-large' + (complete ? '' : ' disabled')}>
            {resultsMessage || 'next'}
          </div>
        </div>
      </div>
    );
  }
}

class ResultsPage extends Component {
  static propTypes = {
    scoreRubric: React.PropTypes.array.isRequired,
    supportRubric: React.PropTypes.array.isRequired,
    score: React.PropTypes.number.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  }
  constructor() {
    super();
    this.getResources = this.getResources.bind(this);
  }
  getResources(score, rubric) {
    const resource = getTier(score, rubric);
    return resource && resource.callback();
  }
  render() {
    const {scoreRubric, supportRubric, score, onSubmit} = this.props;
    const result = getTier(score, scoreRubric);
    const resources = supportRubric && supportRubric.length
      ? this.getResources(score, supportRubric)
      : [];
    return (
      <div className='results-page'>
        <div className="results-header">
          <h2 className='blue-text'>{result.headline}</h2>
          <p>{result.description}</p>
        </div>
        {
          resources && (
            <div className='resource-options'>
              {
                resources.map(resource => {
                  const {id, ...other} = resource;
                  return <ContactCard {...other} key={id} />
                })
              }
            </div>
          )
        }
        <div className="results-footer">
          <a className='blue-text' onClick={onSubmit}>
            &#12296; Take it Again
          </a>
        </div>
      </div>
    );
  }
}

class ContactCard extends Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    domains: React.PropTypes.array.isRequired,
    location: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
  }
  constructor() {
    super();
    this.state = {clicked: false};
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    const {name} = this.props;
    this.setState({clicked: true});
    console.log('You scheduled an appointment with ' + name + '!');
  }
  render() {
    const {name, domains, location, image} = this.props;
    const {clicked} = this.state;
    return (
      <div className={'contact-card' + (clicked ? ' clicked' : '')}>
        <img className='contact-image' src={image} alt={name}></img>
        <div className='contact-info'>
          <h3 className='blue-text'>{name}</h3>
          <p>{domains}</p>
          <p>{location}</p>
        </div>
        <div className='btn primary' onClick={this.onClick}>
        {
          clicked ? 'thank you' : 'contact me'
        }
        </div>
      </div>
    )
  }
}

class SingleSelectMultipleChoiceQuestion extends Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    number: React.PropTypes.number.isRequired,
    prompt: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    onOptionSelect: React.PropTypes.func.isRequired
  }
  constructor() {
    super();
    this.state = {selectedOption: null};
    this.onOptionSelect = this.onOptionSelect.bind(this);
  }
  onOptionSelect(optionId) {
    const {id, onOptionSelect} = this.props;
    this.setState({selectedOption: optionId});
    onOptionSelect(id, optionId);
  }
  render() {
    const {number, prompt, options} = this.props;
    const {selectedOption} = this.state;
    return (
      <div className='question'>
        <div>{number + '. ' + prompt}</div>
        {
          options.map((option) => (
            <ClickableOption
              {...option}
              key={option.id}
              checked={option.id === selectedOption}
              onClick={this.onOptionSelect}
            />
          ))
        }
      </div>
    )
  }
}

class ClickableOption extends Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    points: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired
  }
  render() {
    const {id, text, checked, onClick} = this.props;
    return (
      <div onClick={_e => onClick(id)} className='btn clickable-option'>
        <input type='radio' className='single-select' checked={checked}></input>
        <span>{text}</span>
      </div>
    )
  }
}
