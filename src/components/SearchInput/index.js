import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import querystring from 'query-string';
import SearchInput from './presenter';
import { actionCreators as placeActionCreators } from '../../ducks/place';

const AUTOCOMPLETE_API = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?';
const query = {
  key: Config.GOOGLE_MAPS_API_KEY,
  types: 'geocode',
};

class SearchInputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', prevText: '', suggestions: [] };
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchSuggestions() {
    const input = this.state.text;
    const params = { ...query, input };
    fetch(`${AUTOCOMPLETE_API}${querystring.stringify(params)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          this.setState({ suggestions: data.predictions, prevText: input });
          this.startTimer();
        } else if (data.status === 'ZERO_RESULTS') {
          this.setState({
            suggestions: [{
              place_id: 'EMPTY',
              description: 'Cannot find any results',
            }],
            prevText: input,
          });
          this.startTimer();
        } else {
          throw data.status;
        }
      })
      .catch(() => {
        // Retry 5s later, inhibiting errors
        setTimeout(
          () => this.fetchSuggestions(),
          5000
        );
      });
  }

  startTimer() {
    const { text, prevText } = this.state;
    this.timer = setTimeout(() => {
      if (text.length > 1 && text !== prevText) {
        this.fetchSuggestions();
      } else if (text.length <= 1) {
        this.setState({ suggestions: [], prevText: text });
        this.startTimer();
      } else {
        this.startTimer();
      }
    }, 1500);
  }

  handleChangeText(text) {
    this.setState({ text });
  }

  handleOnPress(keywords: Array) {
    this.props.getPlacesNearArea(keywords);
    this.props.onBack();
  }

  render() {
    return (
      <SearchInput
        onBack={this.props.onBack}
        onChangeText={this.handleChangeText}
        suggestions={this.state.suggestions}
        onPress={(keywords) => this.handleOnPress(keywords)}
      />
    );
  }
}

SearchInputContainer.propTypes = {
  onBack: PropTypes.func,
  getPlacesNearArea: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    getPlacesNearArea: bindActionCreators(placeActionCreators.doGetPlacesNearArea, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(SearchInputContainer);
