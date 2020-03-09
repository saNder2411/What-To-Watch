import React from 'react';
import PropTypes from 'prop-types';
import PreviewCard from '../preview-card/preview-card.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';

const PreviewCardsList = ({cardsData, mouseEnterCard, previewCardHandlers}) => {
  const WrappedPreviewCard = withVideoPlayer(PreviewCard);

  const previewCards = cardsData
    .map(({id, title, previewPoster, previewVideoSrc}) => {
      const isPlaying = mouseEnterCard !== null && mouseEnterCard.id === id;

      return (
        <WrappedPreviewCard
          key={`${id}-${title.slice(0, 2)}`}
          previewCardData={{id, title, previewPoster, previewVideoSrc, isPlaying}}
          previewCardHandlers={previewCardHandlers}
        />
      );
    });

  return (
    <div className="catalog__movies-list">
      {previewCards}
    </div>
  );
};

PreviewCardsList.propTypes = {
  cardsData: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  mouseEnterCard: PropTypes.object,
  previewCardHandlers: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired,
};

export default PreviewCardsList;
