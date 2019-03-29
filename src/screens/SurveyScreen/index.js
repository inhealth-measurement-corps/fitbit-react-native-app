import React, { Component } from 'react';
import {
  Alert,
  ActivityIndicator,
  View,
  Image,
  Dimensions,
  FlatList,
  Text,
  NetInfo,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';
import {
  Appbar,
  Button,
  RadioButton,
  TextInput,
  Colors
} from 'react-native-paper';
import Slider from 'react-native-slider';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-snap-carousel';
import styles from './style';
import colors from '../../constants/colors';
import sampleQuestionJSON from './survey';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { NavigationActions } from 'react-navigation';

const { width, height } = Dimensions.get('window');

@inject('appState')
@observer
export default class SurveyScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log('state params', navigation.state.params);

    const tabBarVisible =
      navigation.state.params && navigation.state.params.tabVisible == true;

    return {
      tabBarVisible
    };
  };

  constructor(props) {
    super(props);
    this.appState = this.props.appState;

    const isControl = this.appState.user.control;

    this.state = {
      data: sampleQuestionJSON,
      currentIndex: 0,
      controlModal: false,
      missingQuestionsModal: false,
      missingQuestions: [],
      answers: {},
      internetConnection: true,
      submitting: false
    };
  }

  componentWillMount() {
    const isControl = this.appState.user.control;
    console.log('is control?', isControl);

    setTimeout(() => {
      const isControl = this.appState.user.control;
      console.log('is control?', isControl);

      if (isControl) {
        this.props.navigation.setParams({ tabVisible: true });
      } else {
        this.props.navigation.setParams({ tabVisible: true });
      }
    }, 10);
  }

  componentDidMount() {
    this.checkInternet();
  }

  checkInternet() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      this.setState({ internetConnection: connectionInfo.type });
    });
  }

  renderHeader() {
    return (
      <Appbar.Header>
        <Appbar.Content title="JH ProHealth" subtitle="Survey" />
        <Appbar.Action icon="done" onPress={() => this.submit()} />
      </Appbar.Header>
    );
  }

  renderQuestionItem(data) {
    const { answers } = this.state;
    return (
      <ScrollView>
        <View style={styles.questionItem}>
          <View style={styles.questionTextContainer}>
            <Text style={styles.questionText}>{data.question}</Text>
          </View>
          <Animatable.View
            ref={v => (this.answers = v)}
            //   animation="fadeInUp"
            //   delay={500}
            style={styles.answerContainer}
          >
            {data.answers &&
              data.answers.map((answer, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.answerItem}
                  onPress={() => {
                    let answersCopy = answers;
                    answers[data.key] = index;
                    console.log(answers);
                    this.setState({ answersCopy });
                  }}
                >
                  <Text style={styles.answerText}>{answer}</Text>
                  {answers[data.key] == index && (
                    <Image
                      source={require('../../assets/icons/icons8-checked.png')}
                      style={styles.checkmark}
                    />
                  )}
                </TouchableOpacity>
              ))}
          </Animatable.View>
        </View>
      </ScrollView>
    );
  }

  renderQuestions() {
    return (
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={this.state.data}
        renderItem={({ item }) => this.renderQuestionItem(item)}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={currentIndex => {
          this.setState({ currentIndex });
        }}
      />
    );
  }

  renderProgress() {
    const { data, currentIndex } = this.state;

    return (
      <View>
        <Slider
          value={currentIndex}
          onValueChange={value => this._carousel.snapToItem(value)}
          step={1}
          minimumTrackTintColor={colors.secondary}
          maximumTrackTintColor={'#eee'}
          maximumValue={data.length - 1}
          thumbTintColor={colors.main}
          thumbStyle={{ width: 0, height: 0 }}
        />
        <View style={styles.progressArrowContainer}>
          {currentIndex != 0 ? (
            <TouchableOpacity onPress={() => this._carousel.snapToPrev()}>
              <Image
                source={require('../../assets/icons/icons8-left.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.icon} />
          )}
          <Text style={styles.progressTitle}>
            Question {currentIndex + 1} of {data.length}
          </Text>
          {currentIndex != data.length - 1 ? (
            <TouchableOpacity onPress={() => this._carousel.snapToNext()}>
              <Image
                source={require('../../assets/icons/icons8-right.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.icon} />
          )}
        </View>
      </View>
    );
  }

  checkMissingAnswers() {
    const { answers, data } = this.state;
    const totalNumQuestions = data.length;
    const answerKeys = Object.keys(answers);
    let missingQuestions = [];
    console.log('answer keys', answerKeys);
    for (let i = 1; i <= totalNumQuestions; i++) {
      if (!answerKeys.includes(i + '')) missingQuestions.push(i);
    }

    if (missingQuestions.length == 0) return false;

    console.log('missing questions', missingQuestions);
    this.setState({ missingQuestions, missingQuestionsModal: true });

    return true;
  }

  submit() {
    const { answers } = this.state;
    NetInfo.getConnectionInfo().then(connectionInfo => {
      this.setState({ internetConnection: connectionInfo.type });
      if (connectionInfo.type != 'none') {
        const missing = this.checkMissingAnswers();
        let answersToSubmit = Object.keys(answers)
          .map(i => answers[i])
          .join('');
        const { patientID } = this.appState.user;
        answersToSubmit = new Array(36)
          .fill(undefined)
          .map(i => 1)
          .join('');
        const url = `http://jhprohealth.herokuapp.com/polls/submit_survey_compact/${patientID}/${answersToSubmit}`;

        if (!missing) {
          this.setState({ submitting: true });
          console.log('submitting');
          fetch(url)
            .then(json => {
              console.log('submitted');
              Alert.alert(
                'Submit Successful!',
                'Your survey has been successfully submitted.'
              );
              this.setState({ submitting: false });
            })
            .catch(e => {
              console.log(e);
              Alert.alert(
                'Submit Unsuccessful',
                'Your survey was not successfully submitted. Please double-check your internet connection and try again.'
              );
              this.setState({ submitting: false });
            });
        }
      }
    });
  }

  renderButton() {
    const { currentIndex, data } = this.state;
    const lastQuestion = currentIndex == data.length - 1;
    return (
      <KeyboardAvoidingView behavior="padding">
        <Button
          mode="contained"
          onPress={() => {
            lastQuestion ? this.submit() : this._carousel.snapToNext();
          }}
          style={[styles.button]}
        >
          {lastQuestion ? 'Submit' : 'Next Question'}
        </Button>
      </KeyboardAvoidingView>
    );
  }

  renderMissingQuestionsModal() {
    const { missingQuestions } = this.state;
    return (
      <Modal
        style={styles.controlModal}
        transparent={true}
        visible={this.state.missingQuestionsModal}
        onRequestClose={() => {}}
      >
        <View style={styles.controlModalContainer}>
          <View style={styles.controlModalSubContainer}>
            <Text style={styles.modalTitle}>Missing Answers</Text>
            <Text style={{ color: 'gray', fontSize: 18, alignSelf: 'center' }}>
              Tap on the number to go to the question
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 48,
                justifyContent: 'center'
              }}
            >
              {missingQuestions.map((q, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    this.setState({ missingQuestionsModal: false }, () => {
                      this._carousel.snapToItem(q - 1);
                    });
                  }}
                  style={{
                    backgroundColor: colors.main,
                    width: 48,
                    height: 48,
                    margin: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    alignSelf: 'flex-start'
                  }}
                >
                  <Text style={{ color: 'white' }}>{q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderControlModal() {
    return (
      <Modal
        style={styles.controlModal}
        transparent={true}
        visible={this.state.controlModal}
        onRequestClose={() => {}}
      >
        <KeyboardAvoidingView
          style={styles.controlModalContainer}
          behavior="padding"
        >
          <View style={styles.controlModalSubContainer}>
            <Text style={styles.modalTitle}>Please enter your weight</Text>
            <View style={styles.modalInputContainer}>
              <TextInput style={styles.modalInput} keyboardType="decimal-pad" />
              <Text style={styles.lbsText}>lbs</Text>
            </View>
            <Button
              mode="contained"
              style={styles.startButton}
              onPress={() => this.setState({ controlModal: false })}
            >
              Begin Survey
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  renderInternetConnection() {
    const { internetConnection } = this.state;
    if (internetConnection == 'none') {
      return (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            width,
            height,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            source={require('../../assets/icons/icons8-rfid_signal.png')}
          />
          <Text
            style={{
              color: colors.main,
              textAlign: 'center',
              fontSize: 16,
              margin: 16
            }}
          >
            You are not connected to the Internet.{'\n'} Please double check
            your network and press the "I'm Connected" button.
          </Text>

          <TouchableOpacity
            onPress={() => this.checkInternet()}
            style={{
              backgroundColor: colors.main,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 32,
              marginTop: 16
            }}
          >
            <Text style={{ color: 'white' }}>I'm Connected</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderSubmitLoading() {
    const { submitting } = this.state;
    if (submitting) {
      return (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            width,
            height,
            backgroundColor: 'rgba(0,0,0,.5)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderProgress()}
        {this.renderQuestions()}
        {this.renderButton()}
        {this.renderControlModal()}
        {this.renderMissingQuestionsModal()}
        {this.renderInternetConnection()}
        {this.renderSubmitLoading()}
      </View>
    );
  }
}
