import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Main from '../main/main';
import CardScreen from '../card-screen/card-screen';
import VideoPlayerScreen from '../video-player-screen/video-player-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import UserListScreen from '../user-list-screen/user-list-screen';

import compose from '../../hocs/compose/compose';
import withFetchData from '../../hocs/with-fetch-data/with-fetch-data';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player';
import withVideoPlayerScreenState from '../../hocs/with-video-player-screen-state/with-video-player-screen-state';
import ActionCreator from '../../actions/action-creator';
import CardListActions from '../../actions/card-list-actions/card-list-actions';
import {getPromoCardData} from '../../reducers/promo-card/selectors';

import {DataTypes, Screens, ShowingCardsAmount} from '../../const';
import {getAppRoute} from '../../utils/utils';
import {getCardsData} from '../../reducers/card-list/selectors';


const WrappedVideoPlayerScreen = compose(withVideoPlayerScreenState, withVideoPlayer)(VideoPlayerScreen);

const App = ({promoCardData, cardsData, changeAppScreen, changeSelectedCardId, filtersCards}) => {

  return (
    <Switch>
      <Route
        path={getAppRoute().ROOT}
        exact
        render={() => {
          changeAppScreen(Screens.MAIN);
          changeSelectedCardId(promoCardData.id);

          return <Main />;
        }} />
      <Route
        path={getAppRoute().CARDS}
        exact
        render={({match}) => {
          const {id} = match.params;
          const {genre} = cardsData.find((card) => card.id === +id);

          changeAppScreen(Screens.CARD);
          changeSelectedCardId(+id);
          filtersCards(genre, ShowingCardsAmount.ON_START);

          return <CardScreen />;
        }} />
      <Route
        path={getAppRoute().PLAYER}
        render={({match}) => {
          const {id} = match.params;
          changeAppScreen(Screens.VIDEO_PLAYER);
          changeSelectedCardId(+id);

          return <WrappedVideoPlayerScreen />;
        }} />
      <Route
        path={getAppRoute().LOGIN}
        render={() => {
          changeAppScreen(Screens.SIGN_IN);

          return <SignInScreen />;
        }} />
      <Route
        path={getAppRoute().REVIEW}
        render={({match}) => {
          const {id} = match.params;
          changeAppScreen(Screens.ADD_REVIEW);
          changeSelectedCardId(+id);

          return <AddReviewScreen />;
        }} />
      <Route
        path={getAppRoute().USER_LIST}
        render={() => {
          changeAppScreen(Screens.USER_LIST);

          return <UserListScreen />;
        }} />
    </Switch>
  );
};

App.propTypes = {
  promoCardData: PropTypes.object.isRequired,
  cardsData: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  changeAppScreen: PropTypes.func.isRequired,
  changeSelectedCardId: PropTypes.func.isRequired,
  filtersCards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  promoCardData: getPromoCardData(state),
  cardsData: getCardsData(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeAppScreen: (screen) => dispatch(ActionCreator.changeAppScreen(screen)),
  changeSelectedCardId: (id) => dispatch(ActionCreator.changeSelectedCardId(id)),
  filtersCards: CardListActions.filtersCards(dispatch),
});

export default compose(withFetchData(DataTypes.FETCH_CARDS_DATA), connect(mapStateToProps, mapDispatchToProps))(App);
