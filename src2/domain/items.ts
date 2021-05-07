type Items = {
  [key: string]: Item;
};

type Item = ItemContainer | YoutubeVideo;

type ItemContainer =
  | YoutubePlaylist
  | YoutubeChannel
  | Folder
  | SearchContainer;

type CommonItemProperties = {
  id: string;
  title: string;
};

type CommonContainerProperties = {
  //these common properties consume Firebase storage
  //consider maybe reducing their name length
  children: string[];
  isOpenFromSidebar?: boolean;
  isCollapsedInGallery?: boolean;
};

type Folder = {
  type: "folder";
} & CommonItemProperties &
  CommonContainerProperties;

type SearchContainer = {
  type: "search";
  searchTerm: string;
  isLoading?: boolean;
  nextPageToken?: string;
} & CommonItemProperties &
  CommonContainerProperties;

type YoutubePlaylist = {
  type: "YTplaylist";
  playlistId: string;
  isLoading?: boolean;
  nextPageToken?: string;
  image: string;
} & CommonItemProperties &
  CommonContainerProperties;

type YoutubeChannel = {
  type: "YTchannel";
  channelId: string;
  isLoading?: boolean;
  nextPageToken?: string;
  image: string;
} & CommonItemProperties &
  CommonContainerProperties;

type YoutubeVideo = {
  type: "YTvideo";
  videoId: string;
} & CommonItemProperties;

export const initialState: Items = {
  HOME: {
    id: "HOME",
    title: "Home",
    type: "folder",
    children: ["1", "2"],
  },
  "1": {
    id: "1",
    title: "One",
    type: "folder",
    children: [],
  },
  "2": {
    id: "2",
    title: "Two",
    type: "folder",
    children: [],
  },
};

export const getItem = (itemId: string, items: Items): Item => {
  const item = items[itemId];
  if (!item) {
    console.error(items);
    throw new Error(
      `Can't find item with id '${itemId}' in ItemsStore. See all items in console logs.`
    );
  } else return item;
};

export const getChildrenFor = (itemId: string, items: Items): Item[] => {
  const item = getItem(itemId, items);
  if ("children" in item) return item.children.map((id) => getItem(id, items));
  else return [];
};