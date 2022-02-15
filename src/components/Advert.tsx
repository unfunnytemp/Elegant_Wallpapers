import { ADVERT_CAP_TIME,ADMOB_UNIT_ID } from "../constants";
import mobileAds from 'react-native-google-mobile-ads';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

var shouldShowAd = true;

mobileAds()
  .initialize()
  .then((adapterStatuses) => {
    // Initialization complete!
    console.log("Initialization complete!")
	
  });

  const interstitial = InterstitialAd.createForAdRequest(ADMOB_UNIT_ID, {
	//requestNonPersonalizedAdsOnly: true,
	//keywords: ['fashion', 'clothing'],
  });

  const eventListener = interstitial.onAdEvent(type => {
	if (type === AdEventType.LOADED) {
		console.log("AD LOADED")
	}
  });

  export default function loadAd(){
    console.log(shouldShowAd, "Should the ad be shown?")
    if(shouldShowAd){
        try{
            interstitial.show();
        } catch(e) {
            console.log(e)
        }
        preloadAd()
        shouldShowAd=false;
        setTimeout(function(){
            shouldShowAd = true
            },ADVERT_CAP_TIME/2)
    }
}

export function preloadAd(){
    try{
        interstitial.load();
    } catch(e) {
        console.log(e)
    }
    
   
}
