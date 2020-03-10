import React, {
  memo,
  useMemo,
} from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Skeleton from '@Components/Base/Skeleton';
import Image from '@Components/Base/Image';
import Styles from './index.module.css';

function WeatherViewList(weatherViewListProps) {
  /* Global & Local States */
  const {
    weatherCityDataList,
    requestCounter,
    onRemoveCity,
  } = weatherViewListProps;
  /* Views */
  const RenderCitySettingList = useMemo(() => {
    const ReturnPredictDayTime = (list) => {
      const predictDataListByWeek = {};
      let predictTempWeek = '';
      for (let i = 0; i < list.length; i += 1) {
        const dayWeek = dayjs(list[i].dt_txt).format('ddd');
        if (dayWeek === predictTempWeek) {
          predictDataListByWeek[dayWeek].push(list[i]);
        } else {
          predictTempWeek = dayWeek;
          predictDataListByWeek[dayWeek] = [];
          predictDataListByWeek[dayWeek].push(list[i]);
        }
      }
      return (
        <React.Fragment>
          {
            Object.values(predictDataListByWeek).map((city, index) => (
              <div className={classNames(Styles.weatherWeekCardContainer)} key={index}>
                <div className={classNames(Styles.weatherWeekCardTextContainer)}>
                  {dayjs(city[0].dt_txt).format('ddd')}
                </div>
                <div className={classNames(Styles.weatherWeekCardImageContainer)}>
                  <Image
                    alt={`http://openweathermap.org/img/wn/${city[0].weather[0].icon}.png`}
                    src={`http://openweathermap.org/img/wn/${city[0].weather[0].icon}.png`}
                    typeSize="medium"
                  />
                </div>
                <div className={classNames(Styles.weatherWeekCardDegreeContainer)}>
                  <div className={classNames(Styles.weatherWeekCardDegreeStyle)}>
                    {Math.round(city[0].main.temp_max)}
                    &deg;
                  </div>
                  <div className={classNames(Styles.weatherWeekCardDegreeStyle)}>
                    {Math.round(city[0].main.temp_min)}
                    &deg;
                  </div>
                </div>
              </div>
            ))
          }
        </React.Fragment>
      );
    };
    if (weatherCityDataList.length > 0) {
      return (
        <React.Fragment>
          {
            weatherCityDataList.map((cityObject, index) => (
              <div className={classNames(Styles.weatherViewListCardContainer)} key={index}>
                <div className={classNames(Styles.weatherViewListCardDetailContainer)}>
                  <div className={classNames(Styles.weatherViewListCardInfoContainer)}>
                    <Typography component="h5" variant="h5">
                      {cityObject.city.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {`Country Code : ${cityObject.city.country}`}
                    </Typography>
                  </div>
                  <div className={classNames(Styles.weatherViewListCardPredictContainer)}>
                    {ReturnPredictDayTime(cityObject.list)}
                  </div>
                </div>
                <CloseIcon
                  className={classNames(Styles.weatherViewRemoveContent)}
                  fontSize="small"
                  role="button"
                  tabIndex={-1}
                  onClick={() => onRemoveCity(cityObject.city.id)}
                  onKeyDown={() => {}}
                />
              </div>
            ))
          }
        </React.Fragment>
      );
    }
    if (requestCounter > 0) {
      return (
        <Skeleton
          className={classNames(Styles.weatherViewFakeSkeleton)}
          typeSkeletonCount={5}
          animation="wave"
          variant="rect"
          width="100%"
          height={140}
        />
      );
    }
    return (
      <div className={classNames(Styles.weatherViewEmptyContent)}>
        No Setting City
      </div>
    );
  }, [weatherCityDataList, requestCounter]);
  /* Main */
  return (
    <div className={classNames(Styles.weatherViewListContainer)}>
      <div className={classNames(Styles.weatherViewTitle)}>
        Weather Card Preview
      </div>
      <div className={classNames(Styles.weatherViewContent)}>
        {RenderCitySettingList}
      </div>
    </div>
  );
}

export default memo(WeatherViewList);
