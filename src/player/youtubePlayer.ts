import { ids } from "../infra/keys";
import { playNextTrack } from "./playerFooter";

var player: Player;
var videoRequested: string | undefined;
var isLoadingPlayer = false;
var isReady = false;

//TODO: create player types
declare const YT: any;

export function play(videoId: string) {
  videoRequested = videoId;
  if (!player && !isLoadingPlayer) init();
  else if (isReady) {
    player.loadVideoById(videoId);
  }
}
export function pause() {
  if (player) player.pauseVideo();
}

export function resume() {
  if (player) player.playVideo();
}
export function getState(): PlayerState {
  if (player) return player.getPlayerState();
  return PlayerState.unstarted;
}

function init() {
  isLoadingPlayer = true;
  const tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  //@ts-ignore
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

//@ts-ignore
global.onYouTubeIframeAPIReady = () => {
  isLoadingPlayer = false;
  player = new YT.Player(ids.youtubeIframe, {
    height: "100%",
    width: "100%",
    videoId: videoRequested,
    playerVars: { autoplay: 1 /*, 'controls': 0 */ },
    events: {
      onReady: () => {
        isReady = true;
      },
      onStateChange: onPlayerStateChange,
    },
  });
  //@ts-expect-error
  global.player = player;
};

function onPlayerStateChange(event: any) {
  if (event.data === PlayerState.ended) {
    playNextTrack();
  }
}

interface Player {
  // playerInfo;
  // cueVideoById;
  loadVideoById: (videoId: string) => void;
  // cueVideoByUrl;
  // loadVideoByUrl;
  playVideo: () => void;
  pauseVideo: () => void;
  // stopVideo;
  // clearVideo;
  // getVideoBytesLoaded;
  // getVideoBytesTotal;
  // getVideoLoadedFraction;
  // getVideoStartBytes;
  // cuePlaylist;
  // loadPlaylist;
  // nextVideo;
  // previousVideo;
  // playVideoAt;
  // setShuffle;
  // setLoop;
  // getPlaylist;
  // getPlaylistIndex;
  // getPlaylistId;
  // loadModule;
  // unloadModule;
  // setOption;
  // mute;
  // unMute;
  // isMuted;
  // setVolume;
  // getVolume;
  // seekTo;
  getPlayerState: () => PlayerState;
  // getPlaybackRate;
  // setPlaybackRate;
  // getAvailablePlaybackRates;
  // getPlaybackQuality;
  // setPlaybackQuality;
  // getAvailableQualityLevels;
  // getCurrentTime;
  // getDuration;
  // removeEventListener;
  // getDebugText;
  // getVideoData;
  // addCueRange;
  // removeCueRange;
  // getApiInterface;
  // showVideoInfo;
  // hideVideoInfo;
  // isVideoInfoVisible;
  // getSphericalProperties;
  // setSphericalProperties;
  // getVideoUrl;
  // getMediaReferenceTime;
}

export enum PlayerState {
  unstarted = -1,
  ended = 0,
  playing = 1,
  paused = 2,
  buffering = 3,
  videoCued = 5,
}
