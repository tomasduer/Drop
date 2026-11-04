export type CommunityReview = {
  id: string;
  user_id: string;
  author_name: string;
  subject_type: "album" | "artist" | "show";
  subject_id: string;
  subject_title: string;
  subject_artist: string;
  subject_image: string | null;
  rating: number;
  text: string;
  created_at: string;
};

export type ShowEvent = {
  id: string;
  title: string;
  artist: string;
  event_date: string | null;
  city: string;
  venue: string;
  image_url: string | null;
  url?: string;
};

export type DropCard = {
  id: string;
  artist: string;
  title: string;
  cover: string;
  status: "active" | "upcoming" | "finished";
};

export type SavedDropStatus = "guardado" | "en_curso" | "completado" | "finalizado";

export type SavedDrop = {
  campaign_id: string;
  artist: string;
  title: string;
  saved_at: string;
  status: SavedDropStatus;
};

export type ExploreData = {
  reviews: CommunityReview[];
  shows: ShowEvent[];
  mySavedDropIds: string[];
  myShowIds: string[];
};

export type ProfileExtras = {
  savedDrops: SavedDrop[];
  reviews: CommunityReview[];
  shows: ShowEvent[];
  followers: number;
  following: number;
};

export const emptyExploreData: ExploreData = { reviews: [], shows: [], mySavedDropIds: [], myShowIds: [] };
export const emptyProfileExtras: ProfileExtras = { savedDrops: [], reviews: [], shows: [], followers: 0, following: 0 };
