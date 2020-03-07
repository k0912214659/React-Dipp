import React, {
  memo,
  useState,
  useMemo,
} from 'react';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@Components/Base/CheckBox';
import Styles from './index.module.css';

function WeatherCityPickList(weatherCityPickListProps) {
  /* Global & Local States */
  const {
    weatherCityList,
    weatherCitySettingList,
    onPageChange,
    onQueryChange,
    onSelectCity,
  } = weatherCityPickListProps;
  const [searchCity, setSearchCity] = useState('');
  /* Functions */
  const onSearchResult = debounce((value) => {
    onQueryChange(value);
  }, 900);
  const onFormTextChange = (event) => {
    let newSearchCity = cloneDeep(searchCity);
    switch (event.target.name) {
      case 'city':
        newSearchCity = event.target.value;
        break;
      default:
        break;
    }
    setSearchCity(newSearchCity);
    onSearchResult(newSearchCity);
  };
  /* Data */
  const ReturnPageText = ({ from, to, count }) => (`${from}-${to === -1 ? count : to} from ${count} cities`);
  const ReturnSelectState = (city) => {
    const selectedIndex = weatherCitySettingList.list.findIndex((weatherCity) => weatherCity.id === city.id);
    if (selectedIndex > -1) {
      return true;
    }
    return false;
  };
  const ReturnSelectDisable = (city) => {
    const selectedIndex = weatherCitySettingList.list.findIndex((weatherCity) => weatherCity.id === city.id);
    if (selectedIndex === -1 && weatherCitySettingList.list.length >= 5) {
      return true;
    }
    return false;
  };
  /* Views */
  const RenderCityList = useMemo(() => (
    <List dense>
      {
        weatherCityList.list.map((city, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <LocationCityIcon />
            </ListItemIcon>
            <ListItemText
              primary={city.name}
              secondary={city.country}
            />
            <ListItemSecondaryAction>
              <Checkbox
                value="secondary"
                color="primary"
                disabled={ReturnSelectDisable(city)}
                checked={ReturnSelectState(city)}
                onChange={() => onSelectCity(city)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      }
    </List>
  ), [weatherCityList, weatherCitySettingList]);
  const RenderCityPager = useMemo(() => (
    <TablePagination
      component="div"
      rowsPerPageOptions={[]}
      count={weatherCityList.page.total * 10}
      rowsPerPage={10}
      labelRowsPerPage=""
      labelDisplayedRows={ReturnPageText}
      page={weatherCityList.page.cur - 1}
      onChangePage={onPageChange}
      onChangeRowsPerPage={() => {}}
    />
  ), [weatherCityList]);
  /* Main */
  return (
    <div className={classNames(Styles.weatherCityPickListContainer)}>
      <div className={classNames(Styles.weatherCityPickListTitle)}>
        Weather Card Setting
      </div>
      <div className={classNames(Styles.weatherCityPickListHeader)}>
        <TextField
          id="city"
          name="city"
          fullWidth
          placeholder="Search City..."
          onChange={onFormTextChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle visibility"
                  onClick={onSearchResult}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={classNames(Styles.weatherCityPickListContent)}>
        {RenderCityList}
        {RenderCityPager}
      </div>
    </div>
  );
}

export default memo(WeatherCityPickList);
