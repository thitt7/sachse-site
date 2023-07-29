'use client'

import React, {useState, useEffect, useRef} from "react"

import DayTable from "./dayTable"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

const GOOGLE_MAPS_API_KEY = 'AIzaSyA33B4yAmE-rDcU5Zy2v-HggCF20zx_gPM';

function loadScript(src: string, position: HTMLElement | null, id: string) {
    if (!position) {
      return;
    }
  
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
  }
  
  const autocompleteService = { current: null };
  
  interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
  }
  interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
  }
  interface PlaceType {
    description: string;
    structured_formatting: StructuredFormatting;
  }
  
  export default function MapsInput() {
    const [value, setValue] = React.useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
    const [days, setDays] = useState([[]])
    const [errorState, setErrorState] = useState(false);
    const [errorMsg, setErrorMsg] = useState('Please enter a valid residential address');
    const [isLoading, setLoading] = useState(false)
    const address = useRef('')
    const loaded = useRef(false);

    const getAddress = async (position: any) => {
      const res = await fetch (`/api/trash/${position.coords.latitude},${position.coords.longitude}`, { });
      const response = await res.json();
      // console.log('RESPOSNE: ', res);
      // if (res.status == 500) {
      //   setErrorMsg('Server Error, this one is on us...sorry!')
      //   setErrorState(true)
      //   return
      // }
      const address = response.formatted_address;
      getTrashDays(address);
    }

    const getTrashDays = async (address: string): Promise<void> => {
      setLoading(() => true);
      const res = await fetch (`/api/trash?address=${address}`);
      setLoading(false);

      // if (res!.status !== 200) {
      //     setErrorState(true)
      //     return
      // }
      const result = await res!.json();
      setErrorState(false);
      setDays(result);
    }

    const handleAddressInput = async (e: React.SyntheticEvent, newInputValue: string) => {
        setInputValue(newInputValue);
        address.current = newInputValue
    }

    const handleAddressSelect = async (e: React.SyntheticEvent) => { getTrashDays(address.current); }
  
    if (typeof window !== 'undefined' && !loaded.current) {
      if (!document.querySelector('#google-maps')) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
          document.querySelector('head'),
          'google-maps',
        );
      }
  
      loaded.current = true;
    }
  
    const mapFetch = React.useMemo(
      () =>
        debounce(
          (
            request: { input: string },
            callback: (results?: readonly PlaceType[]) => void,
          ) => {
            (autocompleteService.current as any).getPlacePredictions(
              request,
              callback,
            );
          },
          400,
        ),
      [],
    );

    /* Get GeoLocation */
    useEffect(() => {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(getAddress);
          }
    }, []);
  
    useEffect(() => {
      let active = true;
  
      if (!autocompleteService.current && (window as any).google) {
        autocompleteService.current = new (
          window as any
        ).google.maps.places.AutocompleteService();
      }
      if (!autocompleteService.current) {
        return undefined;
      }
  
      if (inputValue === '') {
        setOptions(value ? [value] : []);
        return undefined;
      }
  
      mapFetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];
  
          if (value) {
            newOptions = [value];
          }
  
          if (results) {
            newOptions = [...newOptions, ...results];
          }
  
          setOptions(newOptions);
        }
      });
  
      return () => {
        active = false;
      };
    }, [value, inputValue, mapFetch]);
  
    return (
      <>
      <Autocomplete
        id="gmap-input"
        sx={{ width: 300 }}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(event: any, newValue: PlaceType | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={handleAddressInput}
        renderInput={(params) => (
          <TextField {...params} label="Enter Address" fullWidth />
        )}
        renderOption={(props, option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings || [];
  
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [match.offset, match.offset + match.length]),
          );
  
          return (
            <div onClick={handleAddressSelect}>
            <li {...props}>
              <Grid container alignItems="center" className="meep">
                <Grid item sx={{ display: 'flex', width: 44 }}>
                  <LocationOnIcon sx={{ color: 'text.secondary' }} />
                </Grid>
                <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                    >
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
            </div>
          );
          
        }}
      />
        {isLoading == true ? <div className='progress'><CircularProgress /></div> : <></>}
        {days[0].length ? <DayTable days={days}/> : <></>}
        {errorState ? <p>Error: {errorMsg}</p> : <></>}
      </>
    );
  }